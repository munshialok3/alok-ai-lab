import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alok Munshi — Growth Strategist & Builder",
  description:
    "Senior Growth Analyst at Eternal (Zomato). Scaled new users 1.4M → 2.5M. $32M incremental revenue. IIT Kharagpur. Building AI-powered growth infrastructure from scratch — solo.",
  keywords: [
    "Alok Munshi", "Growth Strategy", "Product Growth", "Marketing Analytics",
    "IIT Kharagpur", "Zomato", "American Express", "WhatsApp Automation",
    "Builder", "Performance Marketing", "CRM", "Growth Analyst",
  ],
  authors: [{ name: "Alok Munshi", url: "https://linkedin.com/in/munshialok" }],
  openGraph: {
    type: "website",
    url: "https://portfolio-ai-site-five.vercel.app",
    title: "Alok Munshi — Growth Strategist & Builder",
    description: "Scaled 1.4M → 2.5M users. $32M revenue. Building AI infrastructure solo. IIT Kharagpur.",
    siteName: "Alok Munshi",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alok Munshi — Growth Strategist & Builder",
    description: "Scaled 1.4M → 2.5M users. $32M revenue. IIT Kharagpur.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
