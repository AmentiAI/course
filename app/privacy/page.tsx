export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#09090b] px-4 py-16">
      <div className="mx-auto max-w-3xl prose prose-invert">
        <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-zinc-500 text-sm mb-10">Last updated: February 2026</p>

        <div className="space-y-8 text-zinc-400">
          <section>
            <h2 className="text-xl font-bold text-white">1. Information We Collect</h2>
            <p>When you register for SkillMint, we collect your name, email address, and password (hashed). If you pay with a credit card, payment information is processed by our payment provider and we do not store card numbers. If you pay with cryptocurrency, we record your wallet address and transaction hash.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">2. How We Use Your Information</h2>
            <p>We use your information to: provide access to purchased courses, send course completion certificates, send important service notifications, and improve the platform. We do not sell your data to third parties.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">3. Data Storage</h2>
            <p>Your data is stored on secure, encrypted servers. We use Neon PostgreSQL for database storage and Vercel for hosting. All data is encrypted at rest and in transit.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">4. Cookies</h2>
            <p>We use session cookies to keep you logged in and preferences cookies to remember your settings. We do not use tracking cookies for advertising purposes.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">5. Your Rights</h2>
            <p>You can request deletion of your account and all associated data at any time by contacting us. You can also export your course progress data upon request.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">6. Contact</h2>
            <p>For privacy-related inquiries, contact us through the platform. We typically respond within 48 hours.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
