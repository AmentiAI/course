import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-zinc-300">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-purple-400 hover:text-purple-300 mb-8"
        >
          ← Back to Home
        </Link>

        <h1 className="text-3xl font-bold text-white mb-2">Terms of Service</h1>
        <p className="text-sm text-zinc-500 mb-8">Last updated: February 21, 2026</p>

        <div className="prose prose-invert prose-zinc max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
            <p className="leading-relaxed">
              By accessing and using SkillMint (&quot;the Platform&quot;), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms of Service, please do not use our Platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Use License</h2>
            <p className="leading-relaxed mb-3">
              Upon enrollment in a course, you are granted a personal, non-exclusive, non-transferable license to access and view the course content for your personal, educational use. This license does not include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-zinc-400">
              <li>Sharing your account credentials with others</li>
              <li>Downloading or recording course content (unless explicitly allowed)</li>
              <li>Reselling, redistributing, or publicly displaying course materials</li>
              <li>Using course content for commercial purposes without permission</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. User Accounts</h2>
            <p className="leading-relaxed mb-3">
              To access certain features of the Platform, you must create an account. You agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-zinc-400">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your password</li>
              <li>Notify us immediately of any unauthorized use</li>
              <li>Be responsible for all activities under your account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Payments & Refunds</h2>
            <p className="leading-relaxed mb-3">
              <strong className="text-white">Payment Methods:</strong> We accept credit/debit cards, Bitcoin, and Solana. All prices are in USD.
            </p>
            <p className="leading-relaxed mb-3">
              <strong className="text-white">Refund Policy:</strong> Digital products are non-refundable once accessed. However, if you experience technical issues preventing access, contact support within 7 days of purchase.
            </p>
            <p className="leading-relaxed">
              <strong className="text-white">Cryptocurrency Payments:</strong> Crypto payments are final and non-reversible. Ensure you send the correct amount to the provided address.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Intellectual Property</h2>
            <p className="leading-relaxed mb-3">
              All course content, including text, videos, graphics, logos, and software, is the property of SkillMint or its content creators and is protected by copyright and intellectual property laws.
            </p>
            <p className="leading-relaxed">
              You may not reproduce, distribute, modify, or create derivative works from any content without explicit written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Prohibited Activities</h2>
            <p className="leading-relaxed mb-3">You agree NOT to:</p>
            <ul className="list-disc list-inside space-y-2 text-zinc-400">
              <li>Violate any laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Transmit malware or harmful code</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Scrape or data mine the Platform</li>
              <li>Attempt to gain unauthorized access to systems</li>
              <li>Use the Platform for any fraudulent purpose</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Educational Disclaimer</h2>
            <p className="leading-relaxed mb-3">
              <strong className="text-red-400">Important:</strong> Course content is for educational purposes only and does not constitute financial, legal, or professional advice.
            </p>
            <p className="leading-relaxed mb-3">
              <strong className="text-white">Trading & Investment Courses:</strong> Trading and investing involve substantial risk of loss. Past performance does not guarantee future results. Never invest more than you can afford to lose.
            </p>
            <p className="leading-relaxed">
              <strong className="text-white">Cryptocurrency Courses:</strong> Cryptocurrency markets are highly volatile. Do your own research and consult with qualified financial advisors before making investment decisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Content Accuracy</h2>
            <p className="leading-relaxed">
              While we strive to keep course content accurate and up-to-date, we make no guarantees about the completeness, reliability, or accuracy of information. Technology, markets, and regulations change rapidly—always verify information independently.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. Limitation of Liability</h2>
            <p className="leading-relaxed">
              To the maximum extent permitted by law, SkillMint and its instructors shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including lost profits, data, or business opportunities arising from your use of the Platform or course content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">10. Account Termination</h2>
            <p className="leading-relaxed">
              We reserve the right to suspend or terminate your account at our discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">11. Changes to Terms</h2>
            <p className="leading-relaxed">
              We may update these Terms from time to time. We will notify you of significant changes via email or Platform notice. Continued use after changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">12. Governing Law</h2>
            <p className="leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which SkillMint operates, without regard to conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">13. Contact Us</h2>
            <p className="leading-relaxed">
              If you have questions about these Terms, please contact us at: <a href="mailto:legal@skillmint.com" className="text-purple-400 hover:text-purple-300 underline">legal@skillmint.com</a>
            </p>
          </section>
        </div>

        <div className="mt-12 p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
          <p className="text-sm text-zinc-500">
            By using SkillMint, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our{" "}
            <Link href="/privacy" className="text-purple-400 hover:text-purple-300 underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
