import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout, LSection, LP, LUL } from "@/components/legal/Legal";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Acceptable Use Policy · Kovasite",
  description: "What you may and may not do with a Kovasite website.",
};

export default function AcceptableUsePage() {
  return (
    <LegalLayout title="Acceptable Use Policy" intro="What you may and may not do with a Kovasite website.">
      <LSection heading="Purpose">
        <LP>
          This policy applies to every website and account on {LEGAL.brand}. It exists to keep the service safe and
          lawful for everyone. It forms part of our{" "}
          <Link href="/terms" className="text-accent/90 underline-offset-4 hover:underline">Terms &amp; Conditions</Link>.
        </LP>
      </LSection>

      <LSection heading="You must not use the service to">
        <LUL>
          <li>break any law or regulation, or infringe anyone&rsquo;s intellectual property or privacy rights;</li>
          <li>publish content that is defamatory, obscene, hateful, harassing or discriminatory;</li>
          <li>publish sexual content involving minors, or any unlawful adult content;</li>
          <li>sell illegal goods or services, or run scams, phishing or fraudulent schemes;</li>
          <li>distribute malware, or attempt to disrupt, probe or gain unauthorised access to our systems or others&rsquo;;</li>
          <li>send spam or unlawful marketing, or harvest data without consent;</li>
          <li>impersonate another person or business, or misrepresent your affiliation;</li>
          <li>resell or white-label the platform without our written agreement.</li>
        </LUL>
      </LSection>

      <LSection heading="Content responsibility">
        <LP>
          You are responsible for the content on your site and for collecting any consents needed for data you gather
          through it (for example booking and enquiry details). Your own customers&rsquo; data is yours to control as
          the data controller.
        </LP>
      </LSection>

      <LSection heading="Enforcement">
        <LP>
          If content or activity breaches this policy we may remove it, suspend the site, or close the account, with or
          without notice depending on severity, and we may report unlawful activity to the authorities.
        </LP>
      </LSection>

      <LSection heading="Reporting">
        <LP>
          To report a site or content that breaches this policy, email{" "}
          <a href={`mailto:${LEGAL.email}`} className="text-accent/90 underline-offset-4 hover:underline">{LEGAL.email}</a>.
        </LP>
      </LSection>
    </LegalLayout>
  );
}
