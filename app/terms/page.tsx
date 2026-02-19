export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#09090b] px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-white mb-2">Terms of Service</h1>
        <p className="text-zinc-500 text-sm mb-10">Last updated: February 2026</p>

        <div className="space-y-8 text-zinc-400">
          <section>
            <h2 className="text-xl font-bold text-white">1. Acceptance of Terms</h2>
            <p className="leading-relaxed">By creating an account or purchasing a course on SkillMint, you agree to these Terms of Service. If you do not agree, please do not use the platform.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">2. Course Access</h2>
            <p className="leading-relaxed">Upon purchasing a course, you receive lifetime access to that course content for personal, non-commercial educational use. You may not share, resell, or redistribute course materials.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">3. Refund Policy</h2>
            <p className="leading-relaxed">We offer a 7-day refund policy on all courses. If you are unsatisfied for any reason within 7 days of purchase, contact us for a full refund. Refunds are not available after 7 days or after 50% of the course content has been accessed.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">4. No Financial Advice</h2>
            <p className="leading-relaxed">All course content on SkillMint is for educational purposes only. Nothing on this platform constitutes financial, investment, or legal advice. Cryptocurrency and trading involve significant risk. Past results of instructors or students do not guarantee future performance.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">5. Intellectual Property</h2>
            <p className="leading-relaxed">All course content, including videos, text, and materials, is owned by the respective instructors and SkillMint. You may not copy, reproduce, or distribute any course content without explicit written permission.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">6. Account Termination</h2>
            <p className="leading-relaxed">We reserve the right to suspend or terminate accounts that violate these terms, engage in fraudulent activity, or attempt to circumvent payment systems.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">7. Limitation of Liability</h2>
            <p className="leading-relaxed">SkillMint is not liable for any financial losses incurred as a result of applying strategies taught in courses. All trading and investment activities carry risk.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">8. Governing Law</h2>
            <p className="leading-relaxed">These terms are governed by applicable law. Disputes will be resolved through binding arbitration.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
