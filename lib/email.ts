import "server-only";
import { Resend } from "resend";

// `||` (not `??`) so a blank EMAIL_FROM also falls back. Default to our
// verified Resend domain — the resend.dev sandbox only delivers to the account
// owner, so it can never reach tenants. We also strip surrounding quotes /
// whitespace, because pasting `"Name <a@b.com>"` (with quotes) into an env var
// makes Resend reject every send with a 422.
const FALLBACK_FROM = "Kovasite <hello@kovasite.com>";
const FROM = (process.env.EMAIL_FROM || "").trim().replace(/^['"]|['"]$/g, "").trim() || FALLBACK_FROM;
// A real reply-to + a plain-text alternative materially improve inbox placement.
const REPLY_TO = (process.env.EMAIL_REPLY_TO || "hello@kovasite.com").trim().replace(/^['"]|['"]$/g, "").trim();

function htmlToText(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<\/(p|div|tr|h1|h2|li)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s+/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
export interface SupabaseEmailData {
  token: string;
  token_hash: string;
  redirect_to: string;
  email_action_type: string;
  site_url: string;
}

const SUBJECTS: Record<string, string> = {
  signup: "Confirm your email",
  recovery: "Reset your password",
  magiclink: "Your sign-in link",
  email_change: "Confirm your new email",
  invite: "You've been invited to Kovasite",
};

const CTA: Record<string, string> = {
  signup: "Confirm email",
  recovery: "Reset password",
  magiclink: "Sign in",
  email_change: "Confirm email",
  invite: "Accept invite",
};

// Build + send an auth email entirely through Resend. Called by the Supabase
// Send Email Hook, so Resend owns delivery and we own the content.
export async function sendAuthEmail({ to, data }: { to: string; data: SupabaseEmailData }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set");

  const type = data.email_action_type;
  // Always point the link at OUR app, not the payload's site_url (Supabase
  // fills that with its own API base). NEXT_PUBLIC_SITE_URL is set in prod.
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://kovasite.com").replace(/\/$/, "");
  const link = `${base}/auth/confirm?token_hash=${encodeURIComponent(data.token_hash)}&type=${encodeURIComponent(type)}`;
  const subject = SUBJECTS[type] ?? "Kovasite";

  const html = render({ subject, link, cta: CTA[type] ?? "Continue" });
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: FROM,
    to: [to],
    replyTo: REPLY_TO,
    subject,
    html,
    text: `${subject}\n\nOpen this link to continue:\n${link}\n\nThis link expires shortly. If you didn't request this, ignore this email.\n\n— Kovasite`,
  });
  if (error) throw new Error(typeof error === "string" ? error : error.message);
}

export async function sendPaymentLiveEmail({
  to,
  businessName,
  siteUrl,
  plan,
}: {
  to: string;
  businessName: string;
  siteUrl: string;
  plan?: string | null;
}) {
  const safeBusinessName = escapeHtml(businessName);
  const safePlan = plan ? escapeHtml(plan) : null;
  await sendTransactionalEmail({
    to: [to],
    subject: `${businessName} is live`,
    html: renderNotice({
      eyebrow: "Payment confirmed",
      title: "Your website is live.",
      body: `Your ${safePlan ? `${safePlan} plan` : "subscription"} is active and your Kovasite website is now online.`,
      cta: "Visit your site",
      link: siteUrl,
      secondary: `You can manage content, design and domains for ${safeBusinessName} from your Kovasite dashboard.`,
    }),
  });
}

// Sent to the client once their custom/main domain has finished propagating
// and is serving over SSL — the second email in the launch sequence (the first
// goes out at payment, when the kovasite.com subdomain is already live).
export async function sendDomainLiveEmail({
  to,
  businessName,
  domain,
}: {
  to: string;
  businessName: string;
  domain: string;
}) {
  const safeBusinessName = escapeHtml(businessName);
  const safeDomain = escapeHtml(domain);
  await sendTransactionalEmail({
    to: [to],
    subject: `${businessName} is now live on ${domain}`,
    html: renderNotice({
      eyebrow: "Custom domain connected",
      title: "Your domain is live.",
      body: `${safeBusinessName} is now live on <strong>${safeDomain}</strong>, with hosting and SSL fully set up.`,
      cta: "Visit your site",
      link: `https://${domain}`,
      secondary: "Your free kovasite.com address keeps working too, so links you've already shared stay valid.",
    }),
  });
}

export async function sendAdminDomainLiveNotification({
  businessName,
  domain,
  customerEmail,
}: {
  businessName: string;
  domain: string;
  customerEmail?: string | null;
}) {
  const recipients = notificationRecipients();
  if (recipients.length === 0) return;
  const safeBusinessName = escapeHtml(businessName);
  await sendTransactionalEmail({
    to: recipients,
    subject: `Domain live: ${domain}`,
    html: renderNotice({
      eyebrow: "Custom domain live",
      title: `${safeBusinessName} is live on its custom domain.`,
      body: [
        `Domain: ${escapeHtml(domain)}`,
        customerEmail ? `Customer: ${escapeHtml(customerEmail)}` : null,
      ].filter(Boolean).join("<br/>"),
      cta: "Open site",
      link: `https://${domain}`,
      secondary: "DNS has propagated and SSL is active.",
    }),
  });
}

// A domain purchase was placed for a tenant. Goes to the operator (you) so a
// no-payment-method situation surfaces immediately, since the registrar accepts
// the order (returns an orderId) but can't fulfil it without a card on file.
export async function sendAdminDomainOrderEmail({
  businessName,
  domain,
  orderId,
  orderStatus,
  failed,
}: {
  businessName: string;
  domain: string;
  orderId: string;
  orderStatus?: string | null;
  failed?: boolean;
}) {
  const recipients = notificationRecipients();
  if (recipients.length === 0) return;
  await sendTransactionalEmail({
    to: recipients,
    subject: `${failed ? "Domain order FAILED" : "Domain order placed"}: ${domain}`,
    html: renderNotice({
      eyebrow: "Domain purchase",
      title: `${escapeHtml(businessName)} ${failed ? "tried to register" : "ordered"} ${escapeHtml(domain)}.`,
      body: [
        `Domain: ${escapeHtml(domain)}`,
        `Order: ${escapeHtml(orderId)}`,
        orderStatus ? `Status: ${escapeHtml(orderStatus)}` : null,
      ].filter(Boolean).join("<br/>"),
      cta: "Open Vercel domains",
      link: "https://vercel.com/dashboard/domains",
      secondary: "Confirm it registered and that the Vercel account has a payment method on file.",
    }),
  });
}

// A booking/contact submission from a tenant's built-in form, emailed to the
// business owner. `lines` are the already-sanitised field label/value pairs.
export async function sendFormSubmission({
  to,
  businessName,
  kind,
  lines,
  replyTo,
}: {
  to: string;
  businessName: string;
  kind: "booking" | "contact";
  lines: { label: string; value: string }[];
  replyTo?: string | null;
}) {
  const title = kind === "booking" ? "New booking request" : "New message";
  const body = lines.map((l) => `<strong>${escapeHtml(l.label)}:</strong> ${escapeHtml(l.value)}`).join("<br/>");
  await sendTransactionalEmail({
    to: [to],
    subject: `${title} — ${businessName}`,
    html: renderNotice({
      eyebrow: kind === "booking" ? "Booking request" : "Contact form",
      title: `${title}.`,
      body,
      cta: replyTo ? "Reply to customer" : "Open dashboard",
      link: replyTo ? `mailto:${replyTo}` : "https://kovasite.com/dashboard",
      secondary: "Sent from your Kovasite website.",
    }),
  });
}

export async function sendAdminPaymentNotification({
  businessName,
  siteUrl,
  dashboardUrl,
  plan,
  customerEmail,
}: {
  businessName: string;
  siteUrl: string;
  dashboardUrl: string;
  plan?: string | null;
  customerEmail?: string | null;
}) {
  const recipients = notificationRecipients();
  if (recipients.length === 0) return;
  const safeBusinessName = escapeHtml(businessName);

  await sendTransactionalEmail({
    to: recipients,
    subject: `Payment received: ${businessName}`,
    html: renderNotice({
      eyebrow: "New paid site",
      title: `${safeBusinessName} is live.`,
      body: [
        `Plan: ${escapeHtml(plan ?? "unknown")}`,
        customerEmail ? `Customer: ${escapeHtml(customerEmail)}` : null,
        `Live URL: ${escapeHtml(siteUrl)}`,
      ].filter(Boolean).join("<br/>"),
      cta: "Open admin",
      link: dashboardUrl,
      secondary: "The tenant has been marked active and published.",
    }),
  });
}

// Notify staff that a client opened or replied to a support ticket.
export async function sendSupportStaffNotification({
  businessName,
  subject,
  body,
  ticketId,
}: {
  businessName: string;
  subject: string;
  body: string;
  ticketId: string;
}) {
  const recipients = notificationRecipients();
  if (recipients.length === 0) return;
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://kovasite.com").replace(/\/$/, "");
  await sendTransactionalEmail({
    to: recipients,
    subject: `Support: ${subject} — ${businessName}`,
    html: renderNotice({
      eyebrow: "Support ticket",
      title: escapeHtml(subject),
      body: `${escapeHtml(businessName)} wrote:<br/><br/>${escapeHtml(body)}`,
      cta: "Open in admin",
      link: `${base}/kmanageradmin/support/${ticketId}`,
    }),
  });
}

// Notify a client that staff replied to their ticket.
export async function sendSupportClientReply({
  to,
  subject,
  body,
  ticketId,
}: {
  to: string;
  subject: string;
  body: string;
  ticketId: string;
}) {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://kovasite.com").replace(/\/$/, "");
  await sendTransactionalEmail({
    to: [to],
    subject: `Re: ${subject}`,
    html: renderNotice({
      eyebrow: "Kovasite support",
      title: "We've replied to your ticket",
      body: escapeHtml(body),
      cta: "View conversation",
      link: `${base}/dashboard/support/${ticketId}`,
    }),
  });
}

// Free-form message from an operator to a client (admin → user).
export async function sendOperatorEmail({ to, subject, body }: { to: string; subject: string; body: string }) {
  await sendTransactionalEmail({
    to: [to],
    subject,
    html: renderNotice({
      eyebrow: "Message from Kovasite",
      title: escapeHtml(subject),
      body: escapeHtml(body).replace(/\n/g, "<br/>"),
      cta: "Open your dashboard",
      link: (process.env.NEXT_PUBLIC_SITE_URL || "https://kovasite.com").replace(/\/$/, "") + "/dashboard",
    }),
  });
}

// Sent to a brand-new client account created by staff from the admin. Carries a
// one-time set-password link (we never email a password). The link routes
// through /auth/confirm like every other auth email.
export async function sendOwnerWelcomeEmail({ to, businessName, link }: { to: string; businessName: string; link: string }) {
  await sendTransactionalEmail({
    to: [to],
    subject: "Welcome to Kovasite — set your password",
    html: renderNotice({
      eyebrow: "Welcome",
      title: "Your account is ready",
      body: `We've set up ${escapeHtml(businessName)} on Kovasite for you. Set a password to sign in and manage your site.`,
      cta: "Set your password",
      link,
      secondary: "This link expires shortly for your security. If you weren't expecting this email, you can safely ignore it.",
    }),
  });
}

// Ask a client to complete identity / business verification.
export async function sendKycRequestEmail({ to, businessName }: { to: string; businessName: string }) {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://kovasite.com").replace(/\/$/, "");
  await sendTransactionalEmail({
    to: [to],
    subject: "Action needed: verify your business",
    html: renderNotice({
      eyebrow: "Verification",
      title: "Please verify your business",
      body: `To keep ${escapeHtml(businessName)} active we need a few business details. It only takes a minute.`,
      cta: "Complete verification",
      link: `${base}/dashboard/verify`,
    }),
  });
}

// --- account & billing lifecycle ------------------------------------------
const appUrl = () => (process.env.NEXT_PUBLIC_SITE_URL || "https://kovasite.com").replace(/\/$/, "");

export async function sendAccountSuspendedEmail({ to, businessName }: { to: string; businessName: string }) {
  await sendTransactionalEmail({
    to: [to],
    subject: "Your Kovasite account is on hold",
    html: renderNotice({
      eyebrow: "Account on hold",
      title: "Your account is on hold",
      body: `Access to your dashboard is paused and ${escapeHtml(businessName)} is temporarily offline. This is usually about billing or verification.`,
      cta: "Email support",
      link: "mailto:hello@kovasite.com",
      secondary: "Reply to this email or contact hello@kovasite.com and we'll get you back online quickly.",
    }),
  });
}

export async function sendAccountReactivatedEmail({ to, businessName }: { to: string; businessName: string }) {
  await sendTransactionalEmail({
    to: [to],
    subject: "Your Kovasite account is active again",
    html: renderNotice({
      eyebrow: "Account restored",
      title: "You're back online",
      body: `${escapeHtml(businessName)} has been reactivated. You can sign in and manage your site as normal.`,
      cta: "Open your dashboard",
      link: `${appUrl()}/dashboard`,
    }),
  });
}

export async function sendCancellationScheduledEmail({ to, businessName, endDate }: { to: string; businessName: string; endDate?: string | null }) {
  await sendTransactionalEmail({
    to: [to],
    subject: "Your subscription is set to cancel",
    html: renderNotice({
      eyebrow: "Subscription",
      title: "Your subscription will end",
      body: `${escapeHtml(businessName)} will stay live until ${endDate ? escapeHtml(endDate) : "the end of your current billing period"}, then revert to a draft. You won't be charged again.`,
      cta: "Keep my subscription",
      link: `${appUrl()}/dashboard/billing`,
      secondary: "Changed your mind? You can resume any time before it ends from your billing page.",
    }),
  });
}

export async function sendSubscriptionEndedEmail({ to, businessName }: { to: string; businessName: string }) {
  await sendTransactionalEmail({
    to: [to],
    subject: "Your subscription has ended",
    html: renderNotice({
      eyebrow: "Subscription ended",
      title: "Your site is now offline",
      body: `Your subscription for ${escapeHtml(businessName)} has ended, so the site is no longer published. Your content is saved.`,
      cta: "Re-subscribe",
      link: `${appUrl()}/dashboard/publish`,
      secondary: "Re-subscribe any time to take it back online instantly.",
    }),
  });
}

export async function sendRefundEmail({ to, businessName }: { to: string; businessName: string }) {
  await sendTransactionalEmail({
    to: [to],
    subject: "Your refund has been processed",
    html: renderNotice({
      eyebrow: "Refund",
      title: "Your payment was refunded",
      body: `We've refunded your payment for ${escapeHtml(businessName)}. The site has been taken offline. Refunds usually appear within 5–10 business days.`,
      cta: "Contact support",
      link: "mailto:hello@kovasite.com",
    }),
  });
}

export async function sendPastDueEmail({ to, businessName }: { to: string; businessName: string }) {
  await sendTransactionalEmail({
    to: [to],
    subject: "Payment failed — please update your card",
    html: renderNotice({
      eyebrow: "Payment issue",
      title: "We couldn't take your payment",
      body: `Your latest payment for ${escapeHtml(businessName)} didn't go through. Please update your payment details to keep your site online.`,
      cta: "Update payment",
      link: `${appUrl()}/dashboard/billing`,
    }),
  });
}

export async function sendKycDecisionEmail({ to, businessName, approved, note }: { to: string; businessName: string; approved: boolean; note?: string | null }) {
  await sendTransactionalEmail({
    to: [to],
    subject: approved ? "You're verified" : "Verification needs an update",
    html: renderNotice({
      eyebrow: "Verification",
      title: approved ? "You're verified ✓" : "We need a quick change",
      body: approved
        ? `Thanks — verification for ${escapeHtml(businessName)} is complete. No further action needed.`
        : `We couldn't verify ${escapeHtml(businessName)} yet${note ? `: ${escapeHtml(note)}` : "."} Please review and resubmit.`,
      cta: approved ? "Open your dashboard" : "Update details",
      link: approved ? `${appUrl()}/dashboard` : `${appUrl()}/dashboard/verify`,
    }),
  });
}

// Operator alert for any account/billing lifecycle event.
export async function sendAdminLifecycleAlert({ subject, businessName, detail, tenantId }: { subject: string; businessName: string; detail: string; tenantId?: string }) {
  const recipients = notificationRecipients();
  if (recipients.length === 0) return;
  await sendTransactionalEmail({
    to: recipients,
    subject: `${subject}: ${businessName}`,
    html: renderNotice({
      eyebrow: "Account event",
      title: escapeHtml(`${subject} — ${businessName}`),
      body: escapeHtml(detail),
      cta: "Open in admin",
      link: tenantId ? `${appUrl()}/kmanageradmin/${tenantId}` : `${appUrl()}/kmanageradmin`,
    }),
  });
}

async function sendTransactionalEmail({
  to,
  subject,
  html,
}: {
  to: string[];
  subject: string;
  html: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set");

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: FROM,
    to,
    replyTo: REPLY_TO,
    subject,
    html,
    text: htmlToText(html),
  });
  if (error) throw new Error(typeof error === "string" ? error : error.message);
}

function notificationRecipients() {
  return (process.env.PAYMENT_NOTIFY_EMAILS || process.env.STAFF_EMAILS || "")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}

function renderNotice({
  eyebrow,
  title,
  body,
  cta,
  link,
  secondary,
}: {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  link: string;
  secondary?: string;
}) {
  const safeEyebrow = escapeHtml(eyebrow);
  const safeTitle = escapeHtml(title);
  const safeCta = escapeHtml(cta);
  const safeSecondary = secondary ? escapeHtml(secondary) : null;
  const safeLink = escapeHtml(link);
  return `<!doctype html>
<html>
  <body style="margin:0;background:#000;color:#fff;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#000;padding:40px 16px;">
      <tr><td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#0a0a0a;border:1px solid rgba(16,185,129,0.35);border-radius:20px;padding:32px;">
          <tr><td>
            <div style="font-weight:700;font-size:16px;color:#fff;">Kovasite</div>
            <p style="margin:28px 0 0;color:#34d399;font-size:11px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;">${safeEyebrow}</p>
            <h1 style="font-size:28px;line-height:1.15;font-weight:650;margin:12px 0 12px;color:#fff;">${safeTitle}</h1>
            <p style="font-size:14px;line-height:1.65;color:rgba(255,255,255,0.62);margin:0 0 24px;">${body}</p>
            <a href="${safeLink}" style="display:inline-block;background:#fff;color:#000;text-decoration:none;font-weight:700;font-size:14px;padding:13px 22px;border-radius:12px;">${safeCta}</a>
            ${safeSecondary ? `<p style="font-size:13px;line-height:1.6;color:rgba(255,255,255,0.38);margin:26px 0 0;">${safeSecondary}</p>` : ""}
          </td></tr>
        </table>
        <p style="font-size:11px;color:rgba(255,255,255,0.25);margin:20px 0 0;">© Kovasite</p>
      </td></tr>
    </table>
  </body>
</html>`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function render({ subject, link, cta }: { subject: string; link: string; cta: string }) {
  return `<!doctype html>
<html>
  <body style="margin:0;background:#000;color:#fff;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#000;padding:40px 16px;">
      <tr><td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:460px;background:#0a0a0a;border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:32px;">
          <tr><td>
            <div style="font-weight:700;font-size:16px;color:#fff;">Kovasite</div>
            <h1 style="font-size:22px;font-weight:600;margin:24px 0 8px;color:#fff;">${subject}</h1>
            <p style="font-size:14px;line-height:1.6;color:rgba(255,255,255,0.55);margin:0 0 24px;">
              Click the button below to continue. This link will expire shortly for your security.
            </p>
            <a href="${link}" style="display:inline-block;background:#fff;color:#000;text-decoration:none;font-weight:600;font-size:14px;padding:12px 22px;border-radius:10px;">${cta}</a>
            <p style="font-size:12px;line-height:1.6;color:rgba(255,255,255,0.3);margin:28px 0 0;word-break:break-all;">
              Or paste this link into your browser:<br/>${link}
            </p>
            <p style="font-size:12px;color:rgba(255,255,255,0.3);margin:20px 0 0;">
              If you didn't request this, you can ignore this email.
            </p>
          </td></tr>
        </table>
        <p style="font-size:11px;color:rgba(255,255,255,0.25);margin:20px 0 0;">© Kovasite</p>
      </td></tr>
    </table>
  </body>
</html>`;
}
