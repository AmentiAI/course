import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://skillmint.online"),
  title: {
    default: "SkillMint — Online Courses for Web2, Web3, AI & More",
    template: "%s · SkillMint",
  },
  description:
    "SkillMint sells self-paced online courses across Web2 and Web3 — AI, trading, e-commerce, marketing, development, finance, and digital business. Learn practical, job-ready skills from working practitioners.",
  keywords: [
    "online courses",
    "SkillMint",
    "Web3 courses",
    "AI courses",
    "trading courses",
    "online learning",
    "self-paced courses",
    "skill building",
  ],
  authors: [{ name: "SkillMint" }],
  creator: "SkillMint",
  openGraph: {
    title: "SkillMint — Online Courses for Web2, Web3, AI & More",
    description:
      "Self-paced online courses across Web2 and Web3 — AI, trading, e-commerce, marketing, development, finance, and more. Taught by working practitioners.",
    url: "https://skillmint.online",
    siteName: "SkillMint",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillMint — Online Courses for Web2, Web3, AI & More",
    description:
      "Self-paced online courses taught by working practitioners — Web2, Web3, AI, trading, e-commerce, marketing, and more.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen bg-white text-[#0b1727] antialiased">
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
