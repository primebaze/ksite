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
