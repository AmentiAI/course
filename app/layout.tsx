import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "SkillMint — Where Skills Become Income",
  description:
    "Learn Web3, crypto trading, AI automation, and online business skills from real practitioners. Turn your skills into income with SkillMint.",
  keywords: "crypto courses, web3 learning, DeFi, NFT, AI automation, online business",
  openGraph: {
    title: "SkillMint — Where Skills Become Income",
    description: "Premium courses on Web3, crypto, AI, and digital income.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-[#09090b] text-zinc-100 antialiased">
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
