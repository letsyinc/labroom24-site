import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  // Primary SEO Tags
  title: "LABROOM24: AI Accountability Score | Stop Paying the Governance Tax",
  description: "Get your AI Accountability Score for outsourced LLM governance and code quality. LABROOM24 provides auditable, 24/7 security and compliance metrics.",
  
  // Canonical URL (optional but recommended)
  // metadataBase: new URL('https://www.yourdomain.com'),
  
  // Keywords (optional, but can help structure content)
  keywords: ["AI Governance", "LLM Accountability", "Code Quality", "MLOps", "Technical Debt", "SEO"],

  // Open Graph (for social media sharing like Facebook, LinkedIn)
  openGraph: {
    title: "LABROOM24: AI Accountability Score",
    description: "We enforce the 24/7 accountability standard for LLM governance and outsourced code quality.",
    url: '/', // or 'https://www.yourdomain.com'
    siteName: 'LABROOM24',
    images: [
      {
        url: '', // Replace with your actual logo/preview image
        width: 1200,
        height: 630,
        alt: 'LABROOM24 AI Accountability Score Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
