import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-zinc-300">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-purple-400 hover:text-purple-300 mb-8"
        >
          ← Back to Home
        </Link>

        <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-sm text-zinc-500 mb-8">Last updated: February 21, 2026</p>

        <div className="prose prose-invert prose-zinc max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
            
            <h3 className="text-xl font-medium text-white mt-4 mb-2">Personal Information</h3>
            <p className="leading-relaxed mb-3">When you create an account, we collect:</p>
            <ul className="list-disc list-inside space-y-2 text-zinc-400">
              <li>Name and email address</li>
              <li>Password (encrypted)</li>
              <li>Profile information (optional)</li>
            </ul>

            <h3 className="text-xl font-medium text-white mt-4 mb-2">Payment Information</h3>
            <p className="leading-relaxed mb-3">For course purchases:</p>
            <ul className="list-disc list-inside space-y-2 text-zinc-400">
              <li><strong>Credit/Debit Cards:</strong> Processed by third-party payment processors. We do not store full card details.</li>
              <li><strong>Cryptocurrency:</strong> We store wallet addresses and transaction IDs for verification purposes only.</li>
            </ul>

            <h3 className="text-xl font-medium text-white mt-4 mb-2">Usage Data</h3>
            <p className="leading-relaxed mb-3">We automatically collect:</p>
            <ul className="list-disc list-inside space-y-2 text-zinc-400">
              <li>IP address and device information</li>
              <li>Browser type and version</li>
              <li>Pages visited and time spent</li>
              <li>Course progress and lesson completion</li>
              <li>Quiz scores and certificate achievements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
            <p className="leading-relaxed mb-3">We use your data to:</p>
            <ul className="list-disc list-inside space-y-2 text-zinc-400">
              <li>Provide and maintain the Platform</li>
              <li>Process payments and enrollments</li>
              <li>Track your course progress</li>
              <li>Send important account notifications</li>
              <li>Improve our courses and user experience</li>
              <li>Prevent fraud and abuse</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Marketing Communications</h2>
            <p className="leading-relaxed mb-3">
              With your consent, we may send you:
            </p>
            <ul className="list-disc list-inside space-y-2 text-zinc-400">
              <li>New course announcements</li>
              <li>Special offers and promotions</li>
              <li>Educational content and tips</li>
              <li>Product updates and newsletters</li>
            </ul>
            <p className="leading-relaxed mt-3">
              You can unsubscribe anytime by clicking the unsubscribe link in emails or updating your preferences in your account settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Information Sharing</h2>
            <p className="leading-relaxed mb-3">
              We do NOT sell your personal information. We may share data with:
            </p>

            <h3 className="text-xl font-medium text-white mt-4 mb-2">Service Providers</h3>
            <ul className="list-disc list-inside space-y-2 text-zinc-400">
              <li>Payment processors (Stripe, crypto payment gateways)</li>
              <li>Email service providers</li>
              <li>Analytics services (Google Analytics)</li>
              <li>Hosting providers (Vercel, Neon)</li>
            </ul>

            <h3 className="text-xl font-medium text-white mt-4 mb-2">Legal Requirements</h3>
            <p className="leading-relaxed">
              We may disclose your information if required by law, court order, or to protect our rights, property, or safety.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Data Security</h2>
            <p className="leading-relaxed mb-3">
              We implement industry-standard security measures:
            </p>
            <ul className="list-disc list-inside space-y-2 text-zinc-400">
              <li>HTTPS encryption for all data transmission</li>
              <li>Secure password hashing (bcrypt)</li>
              <li>Regular security audits</li>
              <li>Access controls and authentication</li>
              <li>Database encryption at rest</li>
            </ul>
            <p className="leading-relaxed mt-3 text-yellow-400">
              However, no system is 100% secure. Use strong passwords and enable two-factor authentication when available.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Cookies & Tracking</h2>
            <p className="leading-relaxed mb-3">
              We use cookies and similar technologies to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-zinc-400">
              <li>Keep you logged in</li>
              <li>Remember your preferences</li>
              <li>Analyze site traffic and usage</li>
              <li>Personalize your experience</li>
            </ul>
            <p className="leading-relaxed mt-3">
              You can control cookies through your browser settings, but some features may not work properly if cookies are disabled.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Your Rights</h2>
            <p className="leading-relaxed mb-3">
              Depending on your location, you may have rights to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-zinc-400">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Update inaccurate information</li>
              <li><strong>Deletion:</strong> Request account and data deletion</li>
              <li><strong>Portability:</strong> Export your data in a structured format</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing emails</li>
              <li><strong>Object:</strong> Object to certain data processing</li>
            </ul>
            <p className="leading-relaxed mt-3">
              To exercise these rights, contact us at <a href="mailto:privacy@skillmint.com" className="text-purple-400 hover:text-purple-300 underline">privacy@skillmint.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Data Retention</h2>
            <p className="leading-relaxed mb-3">
              We retain your data for as long as:
            </p>
            <ul className="list-disc list-inside space-y-2 text-zinc-400">
              <li>Your account is active</li>
              <li>Needed to provide services</li>
              <li>Required by law (tax records, etc.)</li>
              <li>Necessary to resolve disputes</li>
            </ul>
            <p className="leading-relaxed mt-3">
              After account deletion, we may retain anonymized data for analytics and improvement purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. Children's Privacy</h2>
            <p className="leading-relaxed">
              Our Platform is not intended for users under 13 years old. We do not knowingly collect personal information from children. If we discover we have collected data from a child, we will delete it immediately. If you believe your child has provided us information, contact us at <a href="mailto:privacy@skillmint.com" className="text-purple-400 hover:text-purple-300 underline">privacy@skillmint.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">10. International Data Transfers</h2>
            <p className="leading-relaxed">
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with this Privacy Policy and applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">11. Third-Party Links</h2>
            <p className="leading-relaxed">
              Our Platform may contain links to third-party websites. We are not responsible for their privacy practices. We encourage you to read their privacy policies before providing any information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">12. Changes to This Policy</h2>
            <p className="leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of significant changes via email or a prominent notice on the Platform. Your continued use after changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">13. Contact Us</h2>
            <p className="leading-relaxed">
              For questions about this Privacy Policy or to exercise your rights, contact us at:
            </p>
            <div className="mt-3 p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
              <p className="leading-relaxed">
                <strong className="text-white">Email:</strong> <a href="mailto:privacy@skillmint.com" className="text-purple-400 hover:text-purple-300 underline">privacy@skillmint.com</a>
              </p>
            </div>
          </section>
        </div>

        <div className="mt-12 p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
          <p className="text-sm text-zinc-500">
            This Privacy Policy is part of our{" "}
            <Link href="/terms" className="text-purple-400 hover:text-purple-300 underline">
              Terms of Service
            </Link>
            . By using SkillMint, you consent to the collection and use of information as described in this policy.
          </p>
        </div>
      </div>
    </div>
  );
}
