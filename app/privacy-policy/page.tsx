import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy - Penaxis",
  description: "How Penaxis collects, uses, and protects information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-36 pb-24 px-6 max-w-3xl mx-auto">
        <h1 className="font-display font-bold text-3xl md:text-4xl text-ink mb-2">Privacy Policy</h1>
        <p className="text-sm text-ink/50 mb-10">Last updated: 7 August 2026</p>

        <div className="space-y-8 text-ink/75 leading-relaxed text-sm">
          <section>
            <p>
              Penaxis (Private) Limited ("Penaxis," "we," "us," or "our") respects your privacy
              and is committed to handling personal information responsibly, transparently and
              securely.
            </p>
            <p className="mt-3">
              This Privacy Policy explains how we collect, use, disclose and protect personal
              information when you visit penaxis.com, contact us, book a consultation, submit an
              enquiry, apply for an opportunity with us, engage our services, or otherwise
              interact with Penaxis.
            </p>
            <p className="mt-3">
              It also explains the choices and rights that may be available to you under
              applicable data-protection laws.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">1. Who We Are</h2>
            <p>
              Penaxis is a technology and business growth company providing services including
              software and product development, AI and business automation, CRM solutions,
              technology consulting, business development, lead generation, marketing and
              related professional services.
            </p>
            <p className="mt-3">
              For personal information collected directly by Penaxis for our own business
              purposes, Penaxis generally acts as the data controller or equivalent responsible
              party.
            </p>
            <p className="mt-3">
              Where we process personal information on behalf of a client-for example, while
              operating a CRM, developing or maintaining a platform, supporting an outreach
              campaign or providing another managed service-we may act as a data processor or
              service provider. In those circumstances, the relevant client determines how and
              why that information is processed, and their privacy notice may apply.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">2. Information We May Collect</h2>
            <p>The information we collect depends on how you interact with us.</p>

            <h3 className="font-display font-semibold text-ink mt-4 mb-2">Information you provide to us</h3>
            <p>We may collect information such as:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Your name, email address, telephone number and other contact details</li>
              <li>Company name, job title and professional information</li>
              <li>Information submitted through contact, enquiry or consultation forms</li>
              <li>Information you provide when discussing a project or requesting a proposal</li>
              <li>Communications exchanged with us by email, telephone, messaging platforms, social media or other channels</li>
              <li>Billing, invoicing and transaction-related information</li>
              <li>Information contained in documents or files that you voluntarily provide to us</li>
              <li>Recruitment information, such as CVs, portfolios, employment history and other information submitted when applying to work with Penaxis</li>
            </ul>
            <p className="mt-3">
              We ask that you do not provide sensitive personal information unless it is
              genuinely necessary for a particular interaction or service.
            </p>

            <h3 className="font-display font-semibold text-ink mt-4 mb-2">Information collected automatically</h3>
            <p>
              When you visit our website, certain information may be collected automatically,
              including:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>IP address</li>
              <li>Browser and device information</li>
              <li>Operating system</li>
              <li>Pages visited</li>
              <li>Referring pages or websites</li>
              <li>Approximate geographic location</li>
              <li>Date, time and duration of visits</li>
              <li>Website interactions and performance information</li>
              <li>Cookie and similar technology identifiers</li>
            </ul>
            <p className="mt-3">
              This information helps us operate, secure and improve our website and understand
              how visitors interact with it.
            </p>

            <h3 className="font-display font-semibold text-ink mt-4 mb-2">Business information obtained from other sources</h3>
            <p>
              As part of our B2B operations, we may also obtain professional or business contact
              information from sources such as:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Publicly available company websites</li>
              <li>Professional networks and business directories</li>
              <li>Public business records</li>
              <li>Referrals and business partners</li>
              <li>Reputable third-party business information providers</li>
            </ul>
            <p className="mt-3">
              Such information may include a person&rsquo;s name, professional role, company,
              business email address, professional profile or other information relevant to a
              legitimate business relationship.
            </p>
            <p className="mt-3">We use this information only where permitted under applicable law.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">3. How We Use Personal Information</h2>
            <p>We may use personal information to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Respond to enquiries and consultation requests</li>
              <li>Understand your business requirements</li>
              <li>Prepare proposals, estimates and statements of work</li>
              <li>Provide and manage our services</li>
              <li>Communicate with clients and prospective clients</li>
              <li>Manage contracts, invoices, payments and business records</li>
              <li>Develop, maintain and support software, digital products and technology solutions</li>
              <li>Provide CRM, automation, marketing, lead-generation and business-development services</li>
              <li>Personalize and improve our website and services</li>
              <li>Measure website performance and understand visitor behaviour</li>
              <li>Conduct legitimate B2B sales and business-development activities</li>
              <li>Send marketing or business communications where permitted</li>
              <li>Manage recruitment and employment applications</li>
              <li>Protect our systems, employees, clients and business from fraud, abuse or security threats</li>
              <li>Establish, exercise or defend legal claims</li>
              <li>Comply with applicable legal, regulatory, tax and accounting obligations</li>
              <li>Maintain records necessary for our business operations</li>
            </ul>
            <p className="mt-3">
              We will not use personal information for purposes that are materially incompatible
              with the purposes for which it was collected unless permitted by law or we provide
              appropriate notice.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">4. Legal Bases for Processing</h2>
            <p>
              Where applicable data-protection law requires us to identify a legal basis for
              processing personal information, we may rely on one or more of the following:
            </p>
            <p className="mt-3">
              <strong className="text-ink">Contractual necessity</strong> - where processing is
              necessary to provide services you have requested or to take steps before entering
              into a contract.
            </p>
            <p className="mt-3">
              <strong className="text-ink">Legitimate interests</strong> - where processing is
              reasonably necessary for legitimate business purposes, such as responding to
              business enquiries, managing client relationships, improving our services,
              maintaining security and conducting appropriate B2B business development, provided
              those interests are not overridden by your rights.
            </p>
            <p className="mt-3">
              <strong className="text-ink">Consent</strong> - where you have given us permission
              for a particular activity, such as certain marketing communications or
              non-essential cookies where consent is required.
            </p>
            <p className="mt-3">
              <strong className="text-ink">Legal obligations</strong> - where we need to process
              information to comply with applicable laws, regulatory requirements, court orders,
              taxation requirements or other legal obligations.
            </p>
            <p className="mt-3">
              Where we rely on consent, you may withdraw that consent at any time, subject to
              applicable law.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">5. Business Development and Marketing Communications</h2>
            <p>Penaxis works primarily in a business-to-business environment.</p>
            <p className="mt-3">
              We may contact individuals in their professional capacity where we reasonably
              believe our services may be relevant to their organisation and where such
              communication is permitted by applicable law.
            </p>
            <p className="mt-3">
              Business-development information may come from information provided directly to
              us, professional networks, company websites, business directories, referrals or
              reputable third-party sources.
            </p>
            <p className="mt-3">
              You may ask us to stop sending marketing or business-development communications at
              any time by using an unsubscribe mechanism where provided or by contacting us
              directly.
            </p>
            <p className="mt-3">
              We will honour valid marketing opt-out requests and may retain limited information
              necessary to ensure that your preference continues to be respected.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">6. Cookies and Similar Technologies</h2>
            <p>
              Our website may use cookies and similar technologies to operate correctly,
              remember preferences, understand website usage, improve performance and, where
              applicable, support marketing activities.
            </p>
            <p className="mt-3">Cookies may include:</p>
            <p className="mt-3">
              <strong className="text-ink">Essential cookies</strong> required for the website to
              operate or provide requested functionality.
            </p>
            <p className="mt-3">
              <strong className="text-ink">Analytics cookies</strong> that help us understand how
              visitors use the website and identify opportunities for improvement.
            </p>
            <p className="mt-3">
              <strong className="text-ink">Functional cookies</strong> that remember choices or
              provide enhanced functionality.
            </p>
            <p className="mt-3">
              <strong className="text-ink">Marketing cookies</strong>, where used, that may help
              measure campaigns or deliver more relevant marketing.
            </p>
            <p className="mt-3">
              Where required by law, non-essential cookies will only be activated after obtaining
              the appropriate consent.
            </p>
            <p className="mt-3">
              You can manage cookies through the consent controls provided on our website, where
              available, or through your browser settings.
            </p>
            <p className="mt-3">
              UK privacy guidance specifically requires website visitors to be informed about
              cookies and generally requires agreement before non-essential cookies are used.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">7. How We Share Personal Information</h2>
            <p>We do not sell personal information as a business model.</p>
            <p className="mt-3">
              We may disclose personal information where reasonably necessary to the following
              categories of recipients:
            </p>

            <h3 className="font-display font-semibold text-ink mt-4 mb-2">Service providers</h3>
            <p>We may use trusted third-party providers for services such as:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Website and cloud hosting</li>
              <li>Email and business communications</li>
              <li>CRM and sales-management systems</li>
              <li>Analytics</li>
              <li>Project management</li>
              <li>Scheduling</li>
              <li>Payment and invoicing</li>
              <li>Cybersecurity</li>
              <li>Data storage and backup</li>
              <li>Marketing and communications</li>
              <li>Professional and technical services</li>
            </ul>
            <p className="mt-3">
              These providers may process information only as necessary to perform services for
              us and subject to appropriate contractual or legal requirements.
            </p>

            <h3 className="font-display font-semibold text-ink mt-4 mb-2">Professional advisers</h3>
            <p>
              We may share information with lawyers, accountants, auditors, insurers,
              consultants and other professional advisers where reasonably necessary.
            </p>

            <h3 className="font-display font-semibold text-ink mt-4 mb-2">Clients</h3>
            <p>
              Where Penaxis provides services on behalf of a client, information may be
              processed or shared according to that client&rsquo;s documented instructions and
              our contractual obligations to them.
            </p>

            <h3 className="font-display font-semibold text-ink mt-4 mb-2">Legal and regulatory authorities</h3>
            <p>
              We may disclose information where reasonably necessary to comply with applicable
              law, regulation, legal process or lawful governmental request, or to protect our
              legal rights, users, employees or others.
            </p>

            <h3 className="font-display font-semibold text-ink mt-4 mb-2">Corporate transactions</h3>
            <p>
              If Penaxis is involved in a merger, acquisition, restructuring, financing, sale of
              assets or similar corporate transaction, information may be disclosed to relevant
              parties subject to appropriate confidentiality and legal safeguards.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">8. Client Data and Services Provided on Behalf of Clients</h2>
            <p>This distinction is particularly important for our services.</p>
            <p className="mt-3">
              Clients may provide Penaxis with access to personal information as part of
              software development, CRM implementation, automation, marketing, lead generation,
              business-development or other services.
            </p>
            <p className="mt-3">
              When Penaxis processes such information solely on behalf of a client, the client
              generally remains responsible for determining the purpose and means of processing.
            </p>
            <p className="mt-3">In these circumstances:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>We process personal information according to the client&rsquo;s instructions and our contractual obligations.</li>
              <li>The client&rsquo;s privacy policy normally governs its relationship with the individuals concerned.</li>
              <li>Requests concerning that data may need to be directed to the relevant client.</li>
              <li>Where appropriate, Penaxis will assist clients in responding to legitimate privacy requests.</li>
            </ul>
            <p className="mt-3">
              Our client agreements or data-processing agreements may contain additional privacy
              and security requirements.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">9. International Data Transfers</h2>
            <p>
              Penaxis operates with clients, service providers and business partners in
              different countries.
            </p>
            <p className="mt-3">
              As a result, personal information may be processed in a country other than the
              country in which it was originally collected.
            </p>
            <p className="mt-3">
              Where applicable law restricts international transfers of personal information, we
              take reasonable steps to use appropriate legal and contractual safeguards, which
              may include contractual protections, approved transfer mechanisms or other
              safeguards permitted under applicable law.
            </p>
            <p className="mt-3">
              The UAE Personal Data Protection Law, for example, specifically establishes
              requirements for cross-border transfer and sharing of personal information.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">10. Data Security</h2>
            <p>
              We take reasonable administrative, organisational and technical measures designed
              to protect personal information against:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Unauthorised access</li>
              <li>Loss</li>
              <li>Misuse</li>
              <li>Alteration</li>
              <li>Disclosure</li>
              <li>Destruction</li>
            </ul>
            <p className="mt-3">
              Our safeguards may include access controls, authentication measures, secure
              infrastructure, restricted permissions, backup procedures and other security
              controls appropriate to the nature of the information involved.
            </p>
            <p className="mt-3">
              However, no internet transmission, electronic storage system or security measure
              can guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">11. Data Retention</h2>
            <p>
              We retain personal information only for as long as reasonably necessary for the
              purpose for which it was collected, including to:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Deliver and support our services</li>
              <li>Maintain client and business relationships</li>
              <li>Maintain appropriate business and financial records</li>
              <li>Comply with legal, accounting, taxation and regulatory obligations</li>
              <li>Resolve disputes</li>
              <li>Enforce agreements</li>
              <li>Maintain security and prevent abuse</li>
            </ul>
            <p className="mt-3">Different categories of information may therefore be retained for different periods.</p>
            <p className="mt-3">
              When information is no longer reasonably required, we may delete, anonymise or
              securely archive it in accordance with applicable legal and operational
              requirements.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">12. Your Privacy Rights</h2>
            <p>
              Depending on where you live and the laws applicable to the processing of your
              information, you may have rights to:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Request access to personal information we hold about you</li>
              <li>Request correction of inaccurate or incomplete information</li>
              <li>Request deletion of your personal information</li>
              <li>Request restriction of certain processing</li>
              <li>Object to certain processing</li>
              <li>Receive certain information in a portable format</li>
              <li>Withdraw consent where processing is based on consent</li>
              <li>Object to or opt out of direct marketing</li>
              <li>Ask for information about how your data is collected, used or shared</li>
              <li>Lodge a complaint with an appropriate data-protection or regulatory authority</li>
            </ul>
            <p className="mt-3">These rights are subject to applicable legal requirements and exceptions.</p>
            <p className="mt-3">
              GDPR and UK GDPR frameworks provide rights including access, rectification,
              erasure, restriction, portability, objection and withdrawal of consent. UAE law
              similarly provides rights relating to correction and stopping certain processing,
              including direct marketing.
            </p>
            <p className="mt-3">To exercise a privacy right, contact us using the details below.</p>
            <p className="mt-3">We may need to verify your identity before completing certain requests.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">13. California and Other U.S. Privacy Rights</h2>
            <p>
              Residents of certain U.S. states may have additional privacy rights where the
              relevant law applies to Penaxis or a particular processing activity.
            </p>
            <p className="mt-3">
              These may include rights to know or access personal information, request deletion
              or correction, obtain a copy of information and opt out of certain forms of sale,
              sharing, targeted advertising or profiling.
            </p>
            <p className="mt-3">Penaxis does not sell personal information for monetary consideration.</p>
            <p className="mt-3">
              Where an applicable law provides additional rights, we will process valid requests
              in accordance with that law.
            </p>
            <p className="mt-3">
              California law, for businesses to which it applies, provides rights including
              access/knowledge, deletion, correction, opt-out of sale or sharing and protection
              from discrimination for exercising privacy rights.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">14. Artificial Intelligence and Automated Tools</h2>
            <p>
              Because some of our services and business processes may involve AI-enabled
              technologies, we may use automated or AI-assisted tools to support activities such
              as analysis, workflow automation, software development, communications or service
              delivery.
            </p>
            <p className="mt-3">
              Where personal information is processed using such technologies, we aim to apply
              appropriate privacy, confidentiality and security safeguards.
            </p>
            <p className="mt-3">
              Unless specifically disclosed otherwise, we do not use personal information
              collected through our website to make solely automated decisions that produce
              legal or similarly significant effects on individuals.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">15. Third-Party Websites and Services</h2>
            <p>
              Our website may contain links to websites, platforms or services operated by third
              parties.
            </p>
            <p className="mt-3">
              Penaxis is not responsible for the privacy practices, security or content of those
              third parties. We encourage you to review their privacy policies before providing
              personal information to them.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">16. Children&rsquo;s Privacy</h2>
            <p>
              Our website and services are intended primarily for businesses and professionals
              and are not directed toward children.
            </p>
            <p className="mt-3">
              We do not knowingly collect personal information from children through our website
              for marketing or commercial purposes.
            </p>
            <p className="mt-3">
              If you believe that a child has provided personal information to us
              inappropriately, please contact us so that we can review and, where appropriate,
              delete the information.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">17. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy periodically to reflect changes in our services,
              technology, business practices or legal obligations.
            </p>
            <p className="mt-3">
              When we make changes, we will update the &ldquo;Last updated&rdquo; date at the top
              of this page.
            </p>
            <p className="mt-3">
              Where changes materially affect how we use personal information, we may provide
              additional notice where required by applicable law.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">18. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, how Penaxis handles personal
              information, or wish to exercise a privacy right, you can contact us at:
            </p>
            <p className="mt-3">
              Penaxis (Private) Limited
              <br />
              2nd Floor, Building #3, P Block, Phase 11
              <br />
              DHA Rahbar, Lahore, Pakistan
              <br />
              Email:{" "}
              <a href="mailto:info@penaxis.com" className="text-violet-600 font-semibold">
                info@penaxis.com
              </a>
              <br />
              Phone: +92 317 4731492
              <br />
              Website: penaxis.com
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
