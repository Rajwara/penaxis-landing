import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions — Penaxis",
  description: "The terms governing use of the Penaxis website and services.",
};

export default function TermsConditionsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-36 pb-24 px-6 max-w-3xl mx-auto">
        <h1 className="font-display font-bold text-3xl md:text-4xl text-ink mb-2">Terms &amp; Conditions</h1>
        <p className="text-sm text-ink/50 mb-10">Last updated: 7 August 2026</p>

        <div className="space-y-8 text-ink/75 leading-relaxed text-sm">
          <section>
            <p>Welcome to Penaxis.</p>
            <p className="mt-3">
              These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your access to and use of
              penaxis.com (the &ldquo;Website&rdquo;), operated by Penaxis (Private) Limited
              (&ldquo;Penaxis,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;).
            </p>
            <p className="mt-3">
              By accessing or using this Website, you agree to these Terms. If you do not agree
              with them, please do not use the Website.
            </p>
            <p className="mt-3">
              These Terms relate primarily to your use of our Website. Any services provided by
              Penaxis are subject to the applicable proposal, statement of work, service
              agreement, master services agreement or other written agreement between Penaxis
              and the client.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">1. About Penaxis</h2>
            <p>
              Penaxis is a technology and growth company providing services that may include
              software and product development, artificial intelligence solutions, business
              automation, CRM solutions, websites and digital platforms, technology consulting,
              marketing, lead generation, business development and related professional
              services.
            </p>
            <p className="mt-3">
              Information presented on this Website is intended to provide a general overview of
              Penaxis, our capabilities and the services we may offer.
            </p>
            <p className="mt-3">
              Nothing on this Website obligates Penaxis to accept a project, provide a particular
              service or enter into a commercial relationship.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">2. Use of the Website</h2>
            <p>
              You may use this Website only for lawful purposes and in accordance with these
              Terms.
            </p>
            <p className="mt-3">You agree not to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Use the Website in violation of any applicable law or regulation</li>
              <li>Attempt to gain unauthorised access to the Website, our systems or connected infrastructure</li>
              <li>Introduce viruses, malware, malicious code or other harmful material</li>
              <li>Interfere with the security, availability or proper operation of the Website</li>
              <li>Impersonate another person or misrepresent your identity or affiliation</li>
              <li>Use automated systems to excessively crawl, scrape or extract Website content without our permission</li>
              <li>Copy or commercially exploit Website content in violation of our intellectual-property rights</li>
              <li>Use the Website to transmit unlawful, fraudulent, abusive or infringing material</li>
              <li>Attempt to reverse engineer or circumvent security measures associated with the Website</li>
            </ul>
            <p className="mt-3">
              We may restrict or terminate access to the Website where we reasonably believe
              these Terms have been violated or where necessary to protect Penaxis, our users or
              our systems.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">3. Website Information</h2>
            <p>
              We make reasonable efforts to ensure that information presented on the Website is
              useful and accurate.
            </p>
            <p className="mt-3">
              However, technology, service offerings, availability, pricing, team composition,
              project timelines and other business information may change.
            </p>
            <p className="mt-3">
              Website content is therefore provided for general informational purposes and
              should not be treated as a binding quotation, contractual commitment, warranty or
              guarantee.
            </p>
            <p className="mt-3">
              If there is any conflict between information on this Website and a written
              agreement entered into between you and Penaxis, the written agreement will
              prevail.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">4. Enquiries, Consultations and Proposals</h2>
            <p>
              Submitting a contact form, booking a consultation, requesting a quotation or
              communicating with Penaxis through this Website does not by itself create a client
              relationship or contractual obligation.
            </p>
            <p className="mt-3">Any proposed:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Scope of work</li>
              <li>Deliverables</li>
              <li>Project timeline</li>
              <li>Pricing</li>
              <li>Payment terms</li>
              <li>Intellectual-property ownership</li>
              <li>Support obligations</li>
              <li>Performance requirements</li>
              <li>Service levels</li>
              <li>Confidentiality obligations</li>
            </ul>
            <p className="mt-3">
              will be governed by the relevant written proposal, statement of work, agreement or
              other contract accepted by Penaxis and the client.
            </p>
            <p className="mt-3">
              Quotes and proposals may also be subject to validity periods and other conditions
              stated in the relevant document.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">5. Services and Client Engagements</h2>
            <p>
              Penaxis may provide different services to different clients, and the nature of each
              engagement can vary significantly.
            </p>
            <p className="mt-3">
              For that reason, descriptions of services on this Website are illustrative and do
              not guarantee that every feature, technology, deliverable, timeline or commercial
              arrangement will apply to every project.
            </p>
            <p className="mt-3">
              Specific client engagements may be subject to separate terms concerning matters
              such as:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Scope and deliverables</li>
              <li>Development milestones</li>
              <li>Revisions and change requests</li>
              <li>Client responsibilities</li>
              <li>Third-party services</li>
              <li>Payment schedules</li>
              <li>Intellectual-property ownership</li>
              <li>Confidentiality</li>
              <li>Data processing</li>
              <li>Hosting and maintenance</li>
              <li>Acceptance testing</li>
              <li>Warranties</li>
              <li>Service levels</li>
              <li>Termination</li>
            </ul>
            <p className="mt-3">The applicable signed or otherwise validly accepted agreement will govern those matters.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">6. No Guarantee of Commercial Results</h2>
            <p>
              Some Penaxis services may relate to marketing, sales, lead generation, business
              development, market entry, automation or other activities intended to improve
              business performance.
            </p>
            <p className="mt-3">
              Business outcomes depend on numerous factors beyond Penaxis&rsquo;s control,
              including market conditions, pricing, competition, client responsiveness, product
              quality, sales processes and third-party platforms.
            </p>
            <p className="mt-3">
              Unless expressly stated in a written agreement, Penaxis does not guarantee any
              particular number of leads, customers, sales, revenue, conversions, market share or
              other commercial outcome.
            </p>
            <p className="mt-3">
              Similarly, examples, case studies, testimonials and previous project results
              displayed on the Website should not be interpreted as guarantees that another
              client will achieve the same results.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">7. Software, AI and Technology Information</h2>
            <p>
              Information on this Website relating to software, artificial intelligence,
              automation, integrations or other technologies is provided for general
              informational purposes.
            </p>
            <p className="mt-3">
              Actual functionality, system architecture, integrations, performance and technical
              requirements will depend on the individual project.
            </p>
            <p className="mt-3">
              AI-enabled systems can produce inaccurate, incomplete or unexpected outputs and may
              depend on third-party models, APIs, platforms or datasets.
            </p>
            <p className="mt-3">
              Unless otherwise agreed in writing, demonstrations, prototypes, mock-ups, concepts
              and examples displayed on the Website are illustrative and should not be relied
              upon as production systems or guarantees of future functionality.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">8. Intellectual Property</h2>
            <p>
              Unless otherwise stated, the Website and its original content—including its
              design, text, graphics, branding, logos, illustrations, videos, animations,
              software, layouts and other materials—are owned by or licensed to Penaxis and are
              protected by applicable intellectual-property laws.
            </p>
            <p className="mt-3">You may view and use the Website for legitimate personal or internal business purposes.</p>
            <p className="mt-3">You may not, without our prior written permission:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Reproduce substantial portions of the Website</li>
              <li>Republish Website content</li>
              <li>Modify or create derivative works from protected Website content</li>
              <li>Sell, sublicense or commercially exploit our content</li>
              <li>Use Penaxis trademarks, branding or logos in a way that implies endorsement or affiliation</li>
            </ul>
            <p className="mt-3">Nothing in these Terms transfers any intellectual-property rights to you.</p>

            <h3 className="font-display font-semibold text-ink mt-4 mb-2">Client intellectual property</h3>
            <p>
              These Website Terms do not determine ownership of intellectual property created
              for a client.
            </p>
            <p className="mt-3">
              Ownership and licensing of software, designs, source code, content, branding,
              datasets or other project deliverables will be governed by the relevant client
              agreement.
            </p>
            <p className="mt-3">
              Third-party trademarks, logos and materials displayed on the Website remain the
              property of their respective owners.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">9. Portfolio, Case Studies and Testimonials</h2>
            <p>
              The Website may contain examples of previous work, client logos, testimonials, case
              studies or descriptions of projects performed by Penaxis.
            </p>
            <p className="mt-3">Such material is provided to demonstrate our capabilities and experience.</p>
            <p className="mt-3">
              Project information may be simplified or presented at a high level to protect
              confidential or commercially sensitive information.
            </p>
            <p className="mt-3">
              Testimonials reflect the views or experiences of the individuals or organisations
              attributed to them and should not be interpreted as guarantees of identical results
              for other clients.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">10. Confidential Information Submitted Through the Website</h2>
            <p>
              Please do not submit passwords, credentials, highly sensitive information,
              proprietary source code or other confidential material through a general website
              form unless specifically requested by Penaxis.
            </p>
            <p className="mt-3">
              Submitting information through a general enquiry form does not, by itself, create a
              confidentiality or non-disclosure agreement.
            </p>
            <p className="mt-3">
              Where confidentiality obligations are required for a proposed project, they should
              be established through an appropriate written agreement or NDA.
            </p>
            <p className="mt-3">
              Information that is personal data will nevertheless be handled in accordance with
              our Privacy Policy and applicable law.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">11. Third-Party Services and Links</h2>
            <p>
              Our Website may contain links to or integrations with third-party websites,
              platforms, applications or services.
            </p>
            <p className="mt-3">
              These may include scheduling platforms, social networks, payment providers,
              analytics services, cloud platforms or other technology providers.
            </p>
            <p className="mt-3">
              Third-party services are controlled by their respective providers and may be
              subject to separate terms and privacy policies.
            </p>
            <p className="mt-3">
              Penaxis is not responsible for the availability, security, accuracy, content or
              practices of third-party websites or services that we do not control.
            </p>
            <p className="mt-3">
              The inclusion of a third-party link does not necessarily constitute an endorsement
              by Penaxis.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">12. Privacy</h2>
            <p>
              Your use of this Website is also subject to our{" "}
              <a href="/privacy-policy" className="text-violet-600 font-semibold">
                Privacy Policy
              </a>
              , which explains how we collect, use, disclose and protect personal information.
            </p>
            <p className="mt-3">
              Where appropriate, additional privacy or data-processing terms may apply to
              services Penaxis performs for clients.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">13. Electronic Communications</h2>
            <p>
              When you contact us electronically, submit a form, approve a proposal
              electronically or otherwise communicate with us through electronic means, you
              consent to receiving relevant communications electronically.
            </p>
            <p className="mt-3">
              Where permitted by applicable law, electronic records, approvals, communications
              and signatures may be used in connection with our business relationships.
            </p>
            <p className="mt-3">
              This provision does not replace any specific signing or approval requirements
              contained in a separate agreement.
            </p>
            <p className="mt-3">
              Pakistan&rsquo;s Electronic Transactions Ordinance establishes statutory
              recognition for electronic documents and communications.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">14. Website Availability and Security</h2>
            <p>
              We aim to keep the Website available and functioning properly but cannot guarantee
              uninterrupted or error-free access.
            </p>
            <p className="mt-3">
              We may modify, suspend, restrict or discontinue all or part of the Website for
              maintenance, security, upgrades or other operational reasons.
            </p>
            <p className="mt-3">
              While we take reasonable security measures, no website, network or internet
              transmission can be guaranteed to be completely secure.
            </p>
            <p className="mt-3">
              You are responsible for taking appropriate precautions when using the internet and
              accessing third-party content.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">15. Disclaimer of Warranties</h2>
            <p>
              To the maximum extent permitted by applicable law, this Website and its content are
              provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis.
            </p>
            <p className="mt-3">Penaxis does not make any representation or warranty that:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>The Website will always be available or uninterrupted</li>
              <li>All Website content will always be complete, accurate or current</li>
              <li>The Website will be free from errors or security vulnerabilities</li>
              <li>Information on the Website will meet your particular business or technical requirements</li>
              <li>Using information from the Website will produce any particular commercial result</li>
            </ul>
            <p className="mt-3">
              Nothing on the Website constitutes legal, financial, accounting, tax or other
              regulated professional advice.
            </p>
            <p className="mt-3">You should obtain appropriate professional advice where necessary.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">16. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, Penaxis and its directors,
              employees, contractors and representatives will not be liable for indirect,
              incidental, special, consequential or punitive losses arising solely from your use
              of, or inability to use, this Website.
            </p>
            <p className="mt-3">
              This may include loss of profits, revenue, business opportunities, goodwill or data
              where such loss results from reliance on Website content or use of the Website.
            </p>
            <p className="mt-3">
              Nothing in these Terms excludes or limits any liability that cannot lawfully be
              excluded or limited.
            </p>
            <p className="mt-3">
              Importantly, liability arising from services Penaxis performs for a client will be
              governed by the applicable client agreement rather than this Website provision.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">17. Indemnification</h2>
            <p>
              To the extent permitted by applicable law, you agree to be responsible for losses,
              claims or expenses reasonably incurred by Penaxis as a direct result of your
              unlawful use of the Website, infringement of another person&rsquo;s rights or
              material violation of these Terms.
            </p>
            <p className="mt-3">
              This section does not impose liability where the relevant loss was caused by
              Penaxis&rsquo;s own unlawful conduct.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">18. Changes to the Website</h2>
            <p>
              We may change, update, remove or discontinue Website content, features or services
              without prior notice.
            </p>
            <p className="mt-3">
              Descriptions of services, technologies and capabilities may therefore change as our
              business evolves.
            </p>
            <p className="mt-3">
              We are not obligated to continue offering any particular service solely because it
              was previously displayed on the Website.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">19. Changes to These Terms</h2>
            <p>
              We may update these Terms periodically to reflect changes in our Website, services,
              business practices or legal obligations.
            </p>
            <p className="mt-3">The date at the top of this page identifies the latest version.</p>
            <p className="mt-3">Changes become effective when the updated Terms are published unless otherwise stated.</p>
            <p className="mt-3">
              Your continued use of the Website after an update will constitute acceptance of the
              revised Terms to the extent permitted by applicable law.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">20. Governing Law and Jurisdiction</h2>
            <p>
              These Terms and any dispute arising specifically from your use of this Website will
              be governed by the laws of the Islamic Republic of Pakistan, without giving effect
              to principles that would require application of another jurisdiction&rsquo;s laws.
            </p>
            <p className="mt-3">
              Subject to applicable law, disputes relating specifically to these Website Terms
              will be subject to the jurisdiction of the courts of competent jurisdiction in
              Lahore, Punjab, Pakistan.
            </p>
            <p className="mt-3">
              If you have entered into a separate agreement with Penaxis containing different
              governing-law, jurisdiction or dispute-resolution provisions, the terms of that
              agreement will apply to matters arising from that engagement.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">21. Severability</h2>
            <p>
              If any provision of these Terms is determined by a court or competent authority to
              be invalid or unenforceable, the remaining provisions will continue in effect to
              the extent permitted by law.
            </p>
            <p className="mt-3">
              The invalid provision will be interpreted or modified only to the extent necessary
              to make it enforceable where legally possible.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">22. No Waiver</h2>
            <p>
              If Penaxis does not immediately enforce a provision of these Terms, that does not
              constitute a waiver of our right to enforce it later.
            </p>
            <p className="mt-3">
              A waiver of one provision or breach will not automatically constitute a waiver of
              another provision or subsequent breach.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">23. Entire Terms for Website Use</h2>
            <p>
              These Terms, together with our Privacy Policy and any other notices expressly
              incorporated into them, constitute the terms governing general use of this
              Website.
            </p>
            <p className="mt-3">
              They do not replace or amend any separate proposal, NDA, statement of work, service
              agreement, master services agreement, data-processing agreement or other contract
              entered into between Penaxis and a client.
            </p>
            <p className="mt-3">
              Where such an agreement conflicts with these Website Terms in relation to a client
              engagement, the separately agreed contract will prevail.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">24. Contact Us</h2>
            <p>If you have questions regarding these Terms &amp; Conditions, please contact:</p>
            <p className="mt-3">
              Penaxis (Private) Limited
              <br />
              Email:{" "}
              <a href="mailto:info@penaxis.com" className="text-violet-600 font-semibold">
                info@penaxis.com
              </a>
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
