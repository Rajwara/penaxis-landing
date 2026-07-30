import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Penaxis",
  description: "How Penaxis collects, uses, and protects information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-36 pb-24 px-6 max-w-3xl mx-auto">
        <div className="mb-10 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          <strong>Placeholder content.</strong> This is generic boilerplate, not
          reviewed legal copy. Replace with a policy reviewed by a lawyer before
          relying on it, especially regarding specific data practices, cookie
          categories, and any regulations (e.g. GDPR, CCPA) that apply to your
          actual users.
        </div>

        <h1 className="font-display font-bold text-3xl md:text-4xl text-ink mb-2">Privacy Policy</h1>
        <p className="text-sm text-ink/50 mb-10">Last updated: [date]</p>

        <div className="space-y-8 text-ink/75 leading-relaxed text-sm">
          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">1. Introduction</h2>
            <p>
              This Privacy Policy explains how Penaxis ("we," "us," or "our") collects, uses,
              and protects information when you visit penaxis.com or use our services.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">2. Information We Collect</h2>
            <p>
              We may collect information you provide directly (such as your name, email
              address, and message contents when you fill out a form), along with information
              collected automatically through cookies and similar technologies (such as pages
              visited, browser type, and general location).
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">3. How We Use Information</h2>
            <p>
              We use the information we collect to respond to inquiries, provide and improve
              our services, understand how our site is used, and communicate with you about
              projects or updates you've requested.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">4. Cookies</h2>
            <p>
              We use cookies to personalize content, provide certain features, and analyze
              traffic. You can control cookie preferences through your browser settings or the
              cookie banner shown when you first visit the site.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">5. Third-Party Services</h2>
            <p>
              We may use third-party tools (such as analytics or hosting providers) that
              process data on our behalf. We do not sell personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">6. Data Security</h2>
            <p>
              We take reasonable measures to protect information from unauthorized access,
              loss, or misuse, though no method of transmission or storage is completely secure.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">7. Your Rights</h2>
            <p>
              Depending on your location, you may have rights to access, correct, or delete
              your personal information. To make a request, contact us using the details below.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">8. Changes to This Policy</h2>
            <p>
              We may update this policy from time to time. Changes will be posted on this page
              with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">9. Contact Us</h2>
            <p>
              Questions about this policy can be sent to{" "}
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
