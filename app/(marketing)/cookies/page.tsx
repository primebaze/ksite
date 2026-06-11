import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout, LSection, LP, LUL } from "@/components/legal/Legal";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Cookie Policy · Kovasite",
  description: "How Kovasite uses cookies and similar technologies.",
};

export default function CookiesPage() {
  return (
    <LegalLayout title="Cookie Policy" intro="How we use cookies and similar technologies.">
      <LSection heading="What cookies are">
        <LP>
          Cookies are small text files stored on your device when you visit a website. They help the site work, keep you
          signed in, and help us understand how the service is used.
        </LP>
      </LSection>

      <LSection heading="The cookies we use">
        <LUL>
          <li><strong>Essential</strong> — sign-in/session cookies that keep you authenticated and secure your dashboard. The service will not work without these.</li>
          <li><strong>Security</strong> — Cloudflare Turnstile uses a token to tell humans from bots at sign-up.</li>
          <li><strong>Preferences</strong> — remember choices such as which sample category you were viewing.</li>
          <li><strong>Analytics</strong> — if enabled, aggregate, privacy-respecting usage data to help us improve the service.</li>
        </LUL>
      </LSection>

      <LSection heading="Managing cookies">
        <LP>
          You can control or delete cookies through your browser settings. Blocking essential cookies will stop you from
          signing in and using the dashboard.
        </LP>
      </LSection>

      <LSection heading="More information">
        <LP>
          For how we handle the data behind these cookies, see our{" "}
          <Link href="/privacy" className="text-emerald-400/90 underline-offset-4 hover:underline">Privacy Policy</Link>.
          Questions? Email <a href={`mailto:${LEGAL.email}`} className="text-emerald-400/90 underline-offset-4 hover:underline">{LEGAL.email}</a>.
        </LP>
      </LSection>
    </LegalLayout>
  );
}
