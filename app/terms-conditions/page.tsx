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
        <div className="mb-10 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          <strong>Placeholder content.</strong> This is generic boilerplate, not
          reviewed legal copy. Replace with terms reviewed by a lawyer before
          relying on it, particularly the liability, governing-law, and
          service-specific sections.
        </div>

        <h1 className="font-display font-bold text-3xl md:text-4xl text-ink mb-2">Terms &amp; Conditions</h1>
        <p className="text-sm text-ink/50 mb-10">Last updated: [date]</p>

        <div className="space-y-8 text-ink/75 leading-relaxed text-sm">
          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing or using penaxis.com, you agree to be bound by these Terms &amp;
              Conditions. If you don't agree, please don't use the site.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">2. Use of the Website</h2>
            <p>
              You agree to use this website only for lawful purposes and in a way that doesn't
              infringe the rights of, or restrict or inhibit the use of, this site by anyone else.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">3. Intellectual Property</h2>
            <p>
              All content on this site — including text, graphics, logos, and code — is the
              property of Penaxis or its licensors and may not be reproduced without permission.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">4. Services &amp; Engagements</h2>
            <p>
              Any project work, pricing, or deliverables discussed through this site are subject
              to a separate written agreement between Penaxis and the client.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">5. Limitation of Liability</h2>
            <p>
              Penaxis provides this website "as is" and makes no warranties about its accuracy
              or availability. To the extent permitted by law, Penaxis is not liable for any
              indirect or consequential loss arising from use of this site.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">6. Third-Party Links</h2>
            <p>
              This site may link to third-party websites. We're not responsible for the content
              or practices of any linked sites.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">7. Changes to These Terms</h2>
            <p>
              We may update these terms from time to time. Continued use of the site after
              changes are posted constitutes acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">8. Governing Law</h2>
            <p>
              These terms are governed by the laws of the jurisdiction in which Penaxis is
              registered, without regard to conflict-of-law principles.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">9. Contact Us</h2>
            <p>
              Questions about these terms can be sent to{" "}
              <a href="mailto:info@penaxis.com" className="text-violet-600 font-semibold">
                info@penaxis.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
