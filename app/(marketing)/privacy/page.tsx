import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout, LSection, LP, LUL } from "@/components/legal/Legal";
import { LEGAL, LEGAL_NAME } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy · Kovasite",
  description: "How Kovasite collects, uses and protects personal data.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" intro="How we collect, use and protect your personal data.">
      <LSection heading="Who we are">
        <LP>
          {LEGAL_NAME} (&ldquo;{LEGAL.brand}&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) provides a website-building and
          hosting service for local businesses. We are the data controller for personal data we process about our
          customers and visitors to {LEGAL.brand}.com.
        </LP>
        {(LEGAL.entity || LEGAL.companyNumber || LEGAL.address) && (
          <LUL>
            {LEGAL.entity && <li>Registered name: {LEGAL.entity}</li>}
            {LEGAL.companyNumber && <li>Company number: {LEGAL.companyNumber}</li>}
            {LEGAL.address && <li>Registered office: {LEGAL.address}</li>}
          </LUL>
        )}
        <LP>
          Where we host a website for a business customer, that customer is the data controller for personal data
          submitted through their own site (for example booking and enquiry details), and we act as their data
          processor.
        </LP>
      </LSection>

      <LSection heading="The data we collect">
        <LUL>
          <li><strong>Account details</strong> — name, email, phone number and password (stored hashed) when you sign up.</li>
          <li><strong>Business content</strong> — the text, images, opening hours, menu/services and contact details you add to your site.</li>
          <li><strong>Payment data</strong> — handled by our payment processor (Stripe). We do not store card numbers.</li>
          <li><strong>Domain registrant data</strong> — where we register a domain on your behalf, the contact details required by the registry.</li>
          <li><strong>Form submissions</strong> — booking and contact enquiries sent through a customer&rsquo;s website.</li>
          <li><strong>Technical data</strong> — IP address, browser type, and cookies/usage data (see our <Link href="/cookies" className="text-emerald-400/90 underline-offset-4 hover:underline">Cookie Policy</Link>).</li>
        </LUL>
      </LSection>

      <LSection heading="How and why we use it">
        <LUL>
          <li>To create, host, secure and operate your website (performance of our contract with you).</li>
          <li>To take payment and manage your subscription (performance of our contract).</li>
          <li>To register and configure custom domains you request (performance of our contract).</li>
          <li>To send service emails such as confirmations, domain status and security notices (legitimate interests / contract).</li>
          <li>To prevent fraud and abuse, including bot checks (legitimate interests).</li>
          <li>To improve and support the service (legitimate interests).</li>
        </LUL>
        <LP>
          We rely on the lawful bases in the UK GDPR shown above. We do not sell your personal data.
        </LP>
      </LSection>

      <LSection heading="Service providers we share data with">
        <LP>We use trusted providers to run the service. Each only receives the data needed for their role:</LP>
        <LUL>
          <li><strong>Supabase</strong> — database, authentication and file storage.</li>
          <li><strong>Vercel</strong> — hosting, content delivery and domain registration/SSL.</li>
          <li><strong>Stripe</strong> — payment processing.</li>
          <li><strong>Resend</strong> — transactional and authentication emails.</li>
          <li><strong>Cloudflare Turnstile</strong> — bot/abuse protection on sign-up.</li>
        </LUL>
        <LP>
          We may also disclose data where required by law, or to establish, exercise or defend legal claims.
        </LP>
      </LSection>

      <LSection heading="International transfers">
        <LP>
          Some providers process data outside the UK/EEA. Where they do, we rely on appropriate safeguards such as the
          UK International Data Transfer Agreement or addendum, or an adequacy decision.
        </LP>
      </LSection>

      <LSection heading="How long we keep it">
        <LP>
          We keep account and site data for as long as your account is active, and for a reasonable period afterwards to
          meet legal, accounting and dispute-resolution requirements. Form submissions are retained so you can manage
          enquiries; you can delete them at any time from your dashboard.
        </LP>
      </LSection>

      <LSection heading="Your rights">
        <LP>Under UK data protection law you have the right to:</LP>
        <LUL>
          <li>access a copy of your personal data;</li>
          <li>have inaccurate data corrected;</li>
          <li>have your data erased in certain circumstances;</li>
          <li>restrict or object to processing;</li>
          <li>data portability; and</li>
          <li>withdraw consent where we rely on it.</li>
        </LUL>
        <LP>
          To exercise any of these, email <a href={`mailto:${LEGAL.email}`} className="text-emerald-400/90 underline-offset-4 hover:underline">{LEGAL.email}</a>.
          You also have the right to complain to the UK Information Commissioner&rsquo;s Office (ICO) at ico.org.uk.
        </LP>
      </LSection>

      <LSection heading="Security">
        <LP>
          We use industry-standard measures including encryption in transit, row-level access controls and hashed
          passwords. No method of transmission or storage is completely secure, but we work to protect your data and
          will notify you of a breach where the law requires.
        </LP>
      </LSection>

      <LSection heading="Children">
        <LP>The service is intended for businesses and is not directed at children under 16.</LP>
      </LSection>

      <LSection heading="Changes & contact">
        <LP>
          We may update this policy from time to time; the &ldquo;last updated&rdquo; date above shows the latest version.
          Questions about privacy? Contact us at <a href={`mailto:${LEGAL.email}`} className="text-emerald-400/90 underline-offset-4 hover:underline">{LEGAL.email}</a>.
        </LP>
      </LSection>
    </LegalLayout>
  );
}
