import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-slate-700">
      <section className="hero-backdrop border-b border-slate-200 px-4 sm:px-6 py-14">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#98753f] hover:text-[#0a2540] inline-flex items-center gap-1 mb-5 transition-colors"
          >
            <ChevronLeft className="h-3 w-3" />
            Back to Home
          </Link>
          <p className="academic-label mb-3">Legal</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#0a2540] tracking-tight leading-tight">
            Terms of Service.
          </h1>
          <p className="text-sm text-slate-500 mt-3 italic">
            Last revised: 21 February 2026
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-14">

        <div className="prose-school space-y-10 text-[15.5px] leading-[1.75]">
          <section>
            <h2 className="font-serif text-2xl font-bold text-[#0a2540] mb-4 tracking-tight">
              1. Acceptance of terms
            </h2>
            <p className="text-slate-700">
              By accessing and using SkillMint (&quot;the Platform&quot;), you accept and agree to be bound
              by these Terms. If you do not agree, please do not use the Platform.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-[#0a2540] mb-4 tracking-tight">
              2. Use license
            </h2>
            <p className="text-slate-700 mb-3">
              Upon purchase, you are granted a personal, non-exclusive, non-transferable license
              to access course content for your own use. This license does not include:
            </p>
            <ul className="list-disc list-outside space-y-1.5 text-slate-700 ml-6">
              <li>Sharing your account credentials with others</li>
              <li>Downloading or recording course content (unless explicitly allowed)</li>
              <li>Reselling, redistributing, or publicly displaying course materials</li>
              <li>Using course content for commercial purposes without permission</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-[#0a2540] mb-4 tracking-tight">
              3. User accounts
            </h2>
            <p className="text-slate-700 mb-3">You agree to:</p>
            <ul className="list-disc list-outside space-y-1.5 text-slate-700 ml-6">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your password</li>
              <li>Notify us immediately of any unauthorized use</li>
              <li>Be responsible for all activities under your account</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-[#0a2540] mb-4 tracking-tight">
              4. Payments & refunds
            </h2>
            <p className="text-slate-700 mb-3">
              <strong className="text-[#0a2540]">Methods:</strong> PayPal, major credit/debit cards, and Bitcoin. All prices in USD.
            </p>
            <p className="text-slate-700 mb-3">
              <strong className="text-[#0a2540]">Refunds:</strong> We offer a 30-day money-back guarantee. If you haven't
              completed more than 30% of a course and it's within 30 days of purchase, contact support for a full refund.
            </p>
            <p className="text-slate-700">
              <strong className="text-[#0a2540]">Bitcoin payments:</strong> Crypto payments are final and non-reversible.
              Ensure you send the correct amount to the provided address.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-[#0a2540] mb-4 tracking-tight">
              5. Intellectual property
            </h2>
            <p className="text-slate-700">
              All course content — including text, videos, graphics, logos, and software — is the
              property of SkillMint or its content creators and is protected by copyright and
              intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-[#0a2540] mb-4 tracking-tight">
              6. Prohibited activities
            </h2>
            <p className="text-slate-700 mb-3">You agree NOT to:</p>
            <ul className="list-disc list-outside space-y-1.5 text-slate-700 ml-6">
              <li>Violate any laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Transmit malware or harmful code</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Scrape or data-mine the Platform</li>
              <li>Attempt to gain unauthorized access to systems</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-[#0a2540] mb-4 tracking-tight">
              7. Educational disclaimer
            </h2>
            <p className="text-rose-800 bg-rose-50 border border-rose-200 rounded-md px-4 py-3 text-sm mb-3">
              <strong className="uppercase tracking-wide text-[10px] font-bold">
                Important:
              </strong>{" "}
              Course content is provided for educational purposes only and does not
              constitute financial, legal, or professional advice.
            </p>
            <p className="text-slate-700 mb-3">
              <strong className="text-[#0a2540]">Trading courses:</strong> Trading and investing
              involve substantial risk of loss. Past performance does not guarantee future results.
            </p>
            <p className="text-slate-700">
              <strong className="text-[#0a2540]">Cryptocurrency courses:</strong> Crypto markets
              are highly volatile. Do your own research and consult qualified advisors before
              making investment decisions.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-[#0a2540] mb-4 tracking-tight">
              8. Limitation of liability
            </h2>
            <p className="text-slate-700">
              To the maximum extent permitted by law, SkillMint and its instructors shall not be
              liable for any indirect, incidental, special, consequential, or punitive damages
              arising from your use of the Platform or course content.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-[#0a2540] mb-4 tracking-tight">
              9. Account termination
            </h2>
            <p className="text-slate-700">
              We reserve the right to suspend or terminate your account for conduct that violates
              these Terms or is harmful to users, the Platform, or third parties.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-[#0a2540] mb-4 tracking-tight">
              10. Changes to terms
            </h2>
            <p className="text-slate-700">
              We may update these Terms from time to time. We will notify you of significant
              changes via email or Platform notice.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-[#0a2540] mb-4 tracking-tight">
              11. Contact
            </h2>
            <p className="text-slate-700">
              Questions about these Terms? Email us at{" "}
              <a
                href="mailto:legal@skillmint.online"
                className="text-[#0a2540] hover:text-[#98753f] font-semibold underline decoration-[#b08d57]/50 hover:decoration-[#b08d57] underline-offset-2"
              >
                legal@skillmint.online
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-12 p-6 bg-[#fafaf9] border border-slate-200 rounded-lg border-t-2 border-t-[#b08d57]">
          <p className="text-sm text-slate-700 leading-relaxed">
            By using SkillMint, you acknowledge that you have read, understood, and
            agree to be bound by these Terms of Service and the{" "}
            <Link
              href="/privacy"
              className="text-[#0a2540] hover:text-[#98753f] font-semibold underline decoration-[#b08d57]/50 hover:decoration-[#b08d57] underline-offset-2"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
