import type { Metadata } from "next";
import { LegalLayout, LSection, LP, LUL } from "@/components/legal/Legal";
import { LEGAL, LEGAL_NAME } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy · Kovasite",
  description: "How we collect, use, store and share personal information.",
};

const mail = (
  <a href={`mailto:${LEGAL.email}`} className="text-emerald-400/90 underline-offset-4 hover:underline">{LEGAL.email}</a>
);

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      intro={`This policy explains how ${LEGAL_NAME}${LEGAL.entity ? `, trading as ${LEGAL.brand},` : ""} collects, uses, stores and shares personal information when you use our website, dashboard, services, hosted websites, domain services, contact forms, billing flows and support channels.`}
    >
      <LSection heading="1. Who we are">
        <LUL>
          <li>Controller: {LEGAL_NAME}</li>
          {LEGAL.entity && <li>Trading name: {LEGAL.brand}</li>}
          {LEGAL.companyNumber && <li>Company number: {LEGAL.companyNumber}</li>}
          {LEGAL.address && <li>Address: {LEGAL.address}</li>}
          <li>Email: {mail}</li>
          {LEGAL.website && <li>Website: {LEGAL.website}</li>}
        </LUL>
        <LP>
          For most data collected through our own website, onboarding flow, billing system, dashboard and support
          channels, we are the data controller.
        </LP>
        <LP>
          Where we host a website for one of our customers and collect enquiries from that customer&rsquo;s site
          visitors, the customer may be the controller for that enquiry data and we may act as their processor.
        </LP>
      </LSection>

      <LSection heading="2. Information we collect">
        <LP>We may collect the following types of personal information:</LP>
        <LUL>
          <li><strong>Account and onboarding details:</strong> name, business name, email address, phone number, login information, business type, website preferences and setup answers.</li>
          <li><strong>Business and website content:</strong> address, opening hours, service details, menus, images, team details, booking links, contact details and other content you provide for your website.</li>
          <li><strong>Domain registration and management details:</strong> business name, contact name, address, email, phone number, country, postcode, domain name choices, domain status, DNS information and registrar-related records.</li>
          <li><strong>Billing information:</strong> plan, subscription status, payment status, invoices, billing email and payment identifiers. We do not store full card numbers.</li>
          <li><strong>Messages and support data:</strong> emails, form submissions, support requests, feedback and communications with us.</li>
          <li><strong>Website visitor data:</strong> IP address, device/browser information, pages visited, referral URLs, timestamps and analytics events.</li>
          <li><strong>Security and technical data:</strong> logs, authentication events, error reports, fraud prevention signals and usage data.</li>
          <li><strong>Customer site enquiries:</strong> where a visitor submits a form on a hosted customer website, we may process their name, email, phone number, message and related metadata.</li>
        </LUL>
      </LSection>

      <LSection heading="3. How we use personal information">
        <LP>We use personal information to:</LP>
        <LUL>
          <li>create and manage user accounts;</li>
          <li>build, host and maintain customer websites;</li>
          <li>provide website editing, dashboard and publishing features;</li>
          <li>register, configure, renew, verify, connect and manage domains;</li>
          <li>provide SSL, DNS, routing and domain status checks;</li>
          <li>process subscriptions, payments and invoices;</li>
          <li>send service messages, account notices and important updates;</li>
          <li>respond to enquiries and provide support;</li>
          <li>prevent fraud, abuse, spam and unauthorised access;</li>
          <li>improve our website, product and customer experience;</li>
          <li>comply with legal, tax, accounting, registrar and regulatory obligations;</li>
          <li>send marketing communications where permitted by law or with consent.</li>
        </LUL>
      </LSection>

      <LSection heading="4. Domain registration and managed domains">
        <LP>
          If your plan includes a managed domain, we may register, configure and renew the domain on your behalf.
        </LP>
        <LP>
          Depending on the setup, the domain may be registered using our business details as the legal registrant, or
          using details you provide. If we are listed as the registrant, we manage the domain operationally for the
          purpose of providing your website service.
        </LP>
        <LP>
          You may request transfer of a managed domain, subject to applicable registrar rules, verification
          requirements, unpaid fees, fraud prevention checks, and transfer restrictions such as registrar lock periods.
        </LP>
        <LP>
          Domain-related information may be shared with domain registrars, DNS providers, hosting providers, registry
          operators, ICANN-related systems, abuse prevention services and other parties required to register, maintain,
          renew, secure or transfer a domain.
        </LP>
      </LSection>

      <LSection heading="5. Lawful bases for processing">
        <LP>We rely on different lawful bases depending on the activity:</LP>
        <LUL>
          <li><strong>Contract:</strong> to provide our services, create your website, manage your account, process payments, register or connect domains, provide support and deliver your subscription.</li>
          <li><strong>Legitimate interests:</strong> to improve our service, secure our systems, prevent abuse, monitor performance, manage business operations and communicate about relevant service updates.</li>
          <li><strong>Consent:</strong> for optional marketing, certain cookies or where we ask for specific permission.</li>
          <li><strong>Legal obligation:</strong> for tax, accounting, fraud prevention, regulatory, domain registrar or legal compliance requirements.</li>
        </LUL>
        <LP>Where we rely on legitimate interests, we balance our interests against your rights and freedoms.</LP>
      </LSection>

      <LSection heading="6. Who we share information with">
        <LP>
          We may share personal information with trusted third parties where needed to operate our service, including:
        </LP>
        <LUL>
          <li>hosting and deployment providers;</li>
          <li>database, storage and authentication providers;</li>
          <li>payment processors and billing platforms;</li>
          <li>email and notification providers;</li>
          <li>analytics, logging and security providers;</li>
          <li>domain registrars, DNS providers and SSL/certificate providers;</li>
          <li>professional advisers such as accountants, lawyers and insurers;</li>
          <li>law enforcement, regulators, courts or authorities where required;</li>
          <li>customers, where a website visitor submits an enquiry through that customer&rsquo;s hosted site.</li>
        </LUL>
        <LP>
          We only share information where necessary and require service providers to protect it appropriately. A list of
          the specific processors we use is available on request by emailing {mail}.
        </LP>
      </LSection>

      <LSection heading="7. International transfers">
        <LP>
          Some providers we use may process personal information outside the UK or EEA. Where this happens, we use
          appropriate safeguards where required, such as adequacy regulations, standard contractual clauses, data
          processing agreements, or equivalent transfer protections.
        </LP>
      </LSection>

      <LSection heading="8. How long we keep information">
        <LP>We keep personal information only for as long as necessary for the purposes described in this policy.</LP>
        <LP>Typical retention periods include:</LP>
        <LUL>
          <li>account data: while your account is active and for a reasonable period afterwards;</li>
          <li>billing and invoice records: usually up to 6 years for tax and accounting purposes;</li>
          <li>domain records: for the life of the domain management relationship and as required by registrar/registry rules;</li>
          <li>support messages: for as long as needed to handle the issue and maintain business records;</li>
          <li>website enquiry data: according to the customer&rsquo;s instructions or our default retention settings;</li>
          <li>technical logs: for a limited period unless needed for security, fraud prevention or legal reasons.</li>
        </LUL>
        <LP>
          We may retain limited records where necessary to resolve disputes, enforce agreements, prevent abuse or comply
          with legal obligations.
        </LP>
      </LSection>

      <LSection heading="9. Cookies and similar technologies">
        <LP>We may use cookies and similar technologies to:</LP>
        <LUL>
          <li>keep users signed in;</li>
          <li>remember preferences;</li>
          <li>secure the service;</li>
          <li>measure website performance;</li>
          <li>understand how people use our website;</li>
          <li>support marketing or analytics where permitted.</li>
        </LUL>
        <LP>
          Where required, we will ask for consent before setting non-essential cookies. You can control cookies through
          your browser settings.
        </LP>
      </LSection>

      <LSection heading="10. Marketing">
        <LP>
          We may send marketing emails if you have opted in, requested information, or where otherwise permitted by law.
        </LP>
        <LP>You can unsubscribe at any time using the link in the email or by contacting us at {mail}.</LP>
        <LP>
          We will still send service messages where necessary, such as billing, security, domain, account or website
          status updates.
        </LP>
      </LSection>

      <LSection heading="11. Security">
        <LP>
          We use appropriate technical and organisational measures to protect personal information, including access
          controls, secure hosting, encryption where appropriate, monitoring, backups and restricted access to sensitive
          systems.
        </LP>
        <LP>
          No system is completely secure, but we take reasonable steps to protect information against unauthorised
          access, loss, misuse or disclosure.
        </LP>
      </LSection>

      <LSection heading="12. Your rights">
        <LP>Depending on your location and the applicable law, you may have rights to:</LP>
        <LUL>
          <li>access your personal information;</li>
          <li>correct inaccurate information;</li>
          <li>request deletion;</li>
          <li>restrict processing;</li>
          <li>object to certain processing;</li>
          <li>request data portability;</li>
          <li>withdraw consent where processing is based on consent;</li>
          <li>complain to a supervisory authority.</li>
        </LUL>
        <LP>To exercise your rights, contact us at {mail}. We may need to verify your identity before responding.</LP>
      </LSection>

      <LSection heading="13. Complaints">
        <LP>
          If you are unhappy with how we handle your personal information, please contact us at {mail} and we will work
          to resolve your concern.
        </LP>
      </LSection>

      <LSection heading="14. Children">
        <LP>
          Our services are intended for businesses and are not directed at children. We do not knowingly collect
          personal information from children.
        </LP>
      </LSection>

      <LSection heading="15. Changes to this policy">
        <LP>
          We may update this Privacy Policy from time to time. If we make significant changes, we may notify users by
          email, dashboard notice or website notice.
        </LP>
      </LSection>

      <LSection heading="16. Contact us">
        <LP>For privacy questions or requests, contact:</LP>
        <LUL>
          <li>{LEGAL_NAME}</li>
          <li>Email: {mail}</li>
          {LEGAL.address && <li>Address: {LEGAL.address}</li>}
        </LUL>
      </LSection>
    </LegalLayout>
  );
}
