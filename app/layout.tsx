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
  metadataBase: new URL("https://skillmint.courses"),
  title: {
    default: "SkillMint — Online Academy for Professional Education",
    template: "%s · SkillMint",
  },
  description:
    "SkillMint.Courses is a modern online academy with structured, career-focused programs across Web2 and Web3 — AI, trading, e-commerce, marketing, development, finance, and digital business. Expert instruction. Self-paced online learning.",
  keywords: [
    "online academy",
    "SkillMint",
    "professional education",
    "online programs",
    "career-focused learning",
    "Web3 program",
    "AI program",
    "online certificate",
    "admissions",
  ],
  authors: [{ name: "SkillMint" }],
  creator: "SkillMint",
  openGraph: {
    title: "SkillMint — Online Academy for Professional Education",
    description:
      "A modern online academy with structured, career-focused programs across Web2 and Web3 — AI, trading, e-commerce, marketing, development, and more.",
    url: "https://skillmint.courses",
    siteName: "SkillMint",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillMint — Online Academy for Professional Education",
    description:
      "Career-focused programs across Web2 and Web3 — AI, trading, e-commerce, marketing, and more — taught by expert practitioners.",
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
