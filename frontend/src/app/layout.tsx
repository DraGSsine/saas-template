import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "TrendCraft AI | AI-Powered Content Generation Platform",
    template: "%s | TrendCraft AI",
  },
  description:
    "Transform your social media presence with AI-powered content generation. Get trending content ideas for Instagram, TikTok, YouTube, and Twitter based on real-time trends.",
  keywords: [
    "AI content generation",
    "social media content",
    "trending content",
    "content creation",
    "Instagram content",
    "TikTok content",
    "YouTube content",
    "Twitter content",
    "viral content ideas",
    "content strategy",
    "social media trends",
    "AI content creator",
    "content automation",
  ],
  authors: [{ name: "TrendCraft AI" }],
  creator: "TrendCraft AI",
  publisher: "TrendCraft AI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://trendcraft.pro",
    siteName: "TrendCraft AI",
    title: "TrendCraft AI - AI-Powered Content Generation Platform",
    description:
      "Generate trending social media content ideas instantly with AI. Perfect for Instagram, TikTok, YouTube, and Twitter creators.",
    images: [
      {
        url: "https://trendcraft.pro/_next/image?url=%2Fbg.png&w=3840&q=75",
        width: 1200,
        height: 630,
        alt: "TrendCraft AI Platform Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TrendCraft AI - AI-Powered Content Generation Platform",
    description:
      "Generate trending social media content ideas instantly with AI. Perfect for Instagram, TikTok, YouTube, and Twitter creators.",
    creator: "@yassin_ouchen",
    images: ["https://trendcraft.pro/_next/image?url=%2Fbg.png&w=3840&q=75"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  alternates: {
    canonical: "https://trendcraft.pro",
    languages: {
      "en-US": "https://trendcraft.pro",
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
