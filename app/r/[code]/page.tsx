import { redirect } from "next/navigation";

// Referral link handler - sets a cookie and redirects to homepage
// The cookie is read at checkout to credit the referrer
export default async function ReferralPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  // Redirect to homepage with referral code as query param
  // Client-side will store it in localStorage/cookie
  redirect(`/?ref=${encodeURIComponent(code)}`);
}
