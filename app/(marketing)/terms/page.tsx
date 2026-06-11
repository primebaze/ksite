import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout, LSection, LP, LUL } from "@/components/legal/Legal";
import { LEGAL, LEGAL_NAME } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions · Kovasite",
  description: "The terms that govern your use of Kovasite.",
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms & Conditions" intro="The agreement between you and us when you use Kovasite.">
      <LSection heading="1. About these terms">
        <LP>
          These terms govern your use of the {LEGAL.brand} service provided by {LEGAL_NAME}. By creating an account or
          using the service you agree to them. If you do not agree, please do not use the service.
        </LP>
      </LSection>

      <LSection heading="2. The service">
        <LP>
          {LEGAL.brand} lets you create, host and manage a website for your business, including design templates,
          hosting, SSL, a custom domain and built-in booking/contact forms. We may add, change or remove features to
          improve the service.
        </LP>
      </LSection>

      <LSection heading="3. Your account">
        <LUL>
          <li>You must provide accurate details and keep your login secure.</li>
          <li>You are responsible for activity under your account.</li>
          <li>You must be authorised to act for the business you represent.</li>
        </LUL>
      </LSection>

      <LSection heading="4. Acceptable use">
        <LP>
          You must use the service lawfully and follow our <Link href="/acceptable-use" className="text-accent/90 underline-offset-4 hover:underline">Acceptable Use Policy</Link>.
          We may suspend or remove content or accounts that breach it.
        </LP>
      </LSection>

      <LSection heading="5. Fees, billing & cancellation">
        <LUL>
          <li>Subscriptions are billed in advance on a recurring basis at the plan price shown at sign-up.</li>
          <li>Payments are processed by our third-party payment processor; you authorise us to charge your chosen payment method each period.</li>
          <li>You can cancel at any time; cancellation takes effect at the end of the current billing period.</li>
          <li>Except where the law requires, fees already paid are non-refundable.</li>
          <li>We may change pricing on reasonable notice; changes apply from your next billing period.</li>
        </LUL>
      </LSection>

      <LSection heading="6. Domains">
        <LP>
          Where your plan includes a custom domain, you authorise us to register and manage it on your behalf through
          our registrar. Domain availability is not guaranteed and is subject to the registry&rsquo;s terms. If you
          leave the service, transfer rights to a registered domain are handled in line with those registry rules and
          may be subject to a fee.
        </LP>
      </LSection>

      <LSection heading="7. Your content">
        <LP>
          You keep ownership of the content you add (text, images, logos, menus). You grant us a licence to host,
          display and process it solely to provide the service. You confirm you have the rights to use any content you
          upload and that it does not infringe anyone else&rsquo;s rights.
        </LP>
      </LSection>

      <LSection heading="8. Our intellectual property">
        <LP>
          The {LEGAL.brand} platform, software, templates and branding remain our property or our licensors&rsquo;. You
          may not copy, resell or reverse-engineer the platform.
        </LP>
      </LSection>

      <LSection heading="9. Availability">
        <LP>
          We work to keep the service available but do not guarantee uninterrupted or error-free operation. We may carry
          out maintenance and may rely on third-party providers whose availability we do not control.
        </LP>
      </LSection>

      <LSection heading="10. Liability">
        <LP>
          Nothing in these terms limits liability that cannot be limited by law (such as for death or personal injury
          caused by negligence, or fraud). Subject to that, we are not liable for loss of profits, revenue, data or
          goodwill, or for indirect or consequential loss; and our total liability in any 12-month period is limited to
          the fees you paid us in that period.
        </LP>
      </LSection>

      <LSection heading="11. Indemnity">
        <LP>
          You agree to indemnify us against claims arising from your content or your breach of these terms or the
          Acceptable Use Policy.
        </LP>
      </LSection>

      <LSection heading="12. Suspension & termination">
        <LP>
          We may suspend or end your access for a material or repeated breach, non-payment, or where required by law.
          You may stop using the service at any time by cancelling your subscription.
        </LP>
      </LSection>

      <LSection heading="13. Changes to these terms">
        <LP>
          We may update these terms; the &ldquo;last updated&rdquo; date above shows the latest version. Continued use
          after a change means you accept the updated terms.
        </LP>
      </LSection>

      <LSection heading="14. Governing law">
        <LP>
          These terms are governed by the laws of {LEGAL.governingLaw}, and the courts of {LEGAL.governingLaw} have
          exclusive jurisdiction. Questions? Contact <a href={`mailto:${LEGAL.email}`} className="text-accent/90 underline-offset-4 hover:underline">{LEGAL.email}</a>.
        </LP>
      </LSection>
    </LegalLayout>
  );
}
