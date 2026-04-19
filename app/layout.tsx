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
    "SkillMint.Courses is a modern online academy offering structured, career-focused programs in Web3, AI, trading, and digital business. Expert instruction. Verifiable credentials.",
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
      "A modern online academy delivering structured, career-focused programs and verifiable credentials.",
    url: "https://skillmint.courses",
    siteName: "SkillMint",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillMint — Online Academy for Professional Education",
    description:
      "Structured, career-focused programs taught by expert practitioners.",
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
