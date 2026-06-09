import "server-only";
import { Resend } from "resend";

const FROM = process.env.EMAIL_FROM ?? "Kovasite <onboarding@resend.dev>";
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

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: FROM,
    to: [to],
    subject,
    html: render({ subject, link, cta: CTA[type] ?? "Continue" }),
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
    subject,
    html,
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
