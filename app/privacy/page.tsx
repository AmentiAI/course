import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function PrivacyPage() {
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
            Privacy Policy.
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
              1. Information we collect
            </h2>
            <h3 className="font-serif text-lg font-bold text-[#0a2540] tracking-tight mt-4 mb-2">Personal information</h3>
            <p className="mb-3 text-slate-700">When you create an account, we collect:</p>
            <ul className="list-disc list-outside space-y-1.5 text-slate-700 ml-6">
              <li>Name and email address</li>
              <li>Password (encrypted)</li>
              <li>Profile information (optional)</li>
            </ul>

            <h3 className="font-serif text-lg font-bold text-[#0a2540] tracking-tight mt-5 mb-2">Payment information</h3>
            <p className="mb-3 text-slate-700">For course purchases:</p>
            <ul className="list-disc list-outside space-y-1.5 text-slate-700 ml-6">
              <li><strong className="text-[#0a2540]">PayPal & cards:</strong> Processed by PayPal. We do not store full card details.</li>
              <li><strong className="text-[#0a2540]">Bitcoin:</strong> We store wallet addresses and transaction IDs for verification only.</li>
            </ul>

            <h3 className="font-serif text-lg font-bold text-[#0a2540] tracking-tight mt-5 mb-2">Usage data</h3>
            <p className="mb-3 text-slate-700">We automatically collect:</p>
            <ul className="list-disc list-outside space-y-1.5 text-slate-700 ml-6">
              <li>IP address and device information</li>
              <li>Browser type and version</li>
              <li>Pages visited and time spent</li>
              <li>Course progress and lesson completion</li>
              <li>Quiz scores and certificate achievements</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-[#0a2540] mb-4 tracking-tight">
              2. How we use your information
            </h2>
            <ul className="list-disc list-outside space-y-1.5 text-slate-700 ml-6">
              <li>Provide and maintain the platform</li>
              <li>Process payments and enrollments</li>
              <li>Track your course progress</li>
              <li>Send important account notifications</li>
              <li>Improve our courses and user experience</li>
              <li>Prevent fraud and abuse</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-[#0a2540] mb-4 tracking-tight">
              3. Marketing communications
            </h2>
            <p className="text-slate-700">
              With your consent, we may send course announcements, offers, educational content,
              and product updates. You can unsubscribe anytime via the link in any email or in
              your account settings.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-[#0a2540] mb-4 tracking-tight">
              4. Information sharing
            </h2>
            <p className="text-slate-700 mb-3">
              We do <strong>not</strong> sell your personal information. We may share data with
              service providers (payment processing, email delivery, analytics, hosting) and as
              required by law.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-[#0a2540] mb-4 tracking-tight">
              5. Data security
            </h2>
            <ul className="list-disc list-outside space-y-1.5 text-slate-700 ml-6">
              <li>HTTPS encryption for all data transmission</li>
              <li>Secure password hashing (bcrypt)</li>
              <li>Access controls and authentication</li>
              <li>Database encryption at rest</li>
            </ul>
            <p className="mt-3 text-[#98753f] bg-[#f5ecd7]/60 border border-[#e7d7b0] rounded-md px-4 py-3 text-sm">
              <strong className="uppercase tracking-wide text-[10px] font-bold">
                Advisory:
              </strong>{" "}
              No system is entirely secure. Maintain a strong password and enable
              two-factor authentication where available.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-[#0a2540] mb-4 tracking-tight">
              6. Your rights
            </h2>
            <p className="text-slate-700 mb-3">Depending on your location, you may have rights to:</p>
            <ul className="list-disc list-outside space-y-1.5 text-slate-700 ml-6">
              <li><strong className="text-[#0a2540]">Access:</strong> Request a copy of your personal data</li>
              <li><strong className="text-[#0a2540]">Correction:</strong> Update inaccurate information</li>
              <li><strong className="text-[#0a2540]">Deletion:</strong> Request account and data deletion</li>
              <li><strong className="text-[#0a2540]">Portability:</strong> Export your data</li>
              <li><strong className="text-[#0a2540]">Opt-out:</strong> Unsubscribe from marketing emails</li>
            </ul>
            <p className="mt-3 text-slate-700">
              To exercise these rights, contact us at{" "}
              <a
                href="mailto:privacy@skillmint.online"
                className="text-[#0a2540] hover:text-[#98753f] font-semibold underline decoration-[#b08d57]/50 hover:decoration-[#b08d57] underline-offset-2"
              >
                privacy@skillmint.online
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-[#0a2540] mb-4 tracking-tight">
              7. Children's privacy
            </h2>
            <p className="text-slate-700">
              Our platform is not intended for users under 13. We do not knowingly collect
              personal information from children.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-[#0a2540] mb-4 tracking-tight">
              8. Changes to this policy
            </h2>
            <p className="text-slate-700">
              We may update this Privacy Policy from time to time. We will notify you of
              significant changes via email or a prominent notice on the platform.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-[#0a2540] mb-4 tracking-tight">
              9. Contact
            </h2>
            <div className="rounded-md bg-[#fafaf9] border border-slate-200 p-4">
              <p className="text-slate-700">
                <strong className="text-[#0a2540]">Email:</strong>{" "}
                <a
                  href="mailto:privacy@skillmint.online"
                  className="text-[#0a2540] hover:text-[#98753f] font-semibold underline decoration-[#b08d57]/50 hover:decoration-[#b08d57] underline-offset-2"
                >
                  privacy@skillmint.online
                </a>
              </p>
            </div>
          </section>
        </div>

        <div className="mt-12 p-6 bg-[#fafaf9] border border-slate-200 rounded-lg border-t-2 border-t-[#b08d57]">
          <p className="text-sm text-slate-700 leading-relaxed">
            This Privacy Policy is part of the{" "}
            <Link
              href="/terms"
              className="text-[#0a2540] hover:text-[#98753f] font-semibold underline decoration-[#b08d57]/50 hover:decoration-[#b08d57] underline-offset-2"
            >
              Terms of Service
            </Link>
            . By using SkillMint, you consent to the collection and use of information as described.
          </p>
        </div>
      </div>
    </div>
  );
}
