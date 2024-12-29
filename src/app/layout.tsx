import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata for SEO
export const metadata: Metadata = {
  title: "PicDB - Free Picture Storage",
  description: "PicDB is a free, anonymously and fast picture storage web application built by AvianInTek. Store, organize, and access your images easily from any device.",
  keywords: ["akkil", "akkilmg", "free", "image", "storage", "freemium", "anonymous", "picture storage", "image storage", "photo storage", "secure photo storage", "Next.js", "PicDB", "AvianInTek"],
  authors: [{ name: "AkkilMG" }],
  openGraph: {
    type: "website",
    url: "https://picdb.vercel.app/",
    title: "PicDB - Free Picture Storage",
    description: "Store your images anonymously with PicDB, a fast and easy-to-use picture storage service built with Next.js.",
    images: [
      {
        url: "/assets/logo/PicDB.png",
        alt: "PicDB logo",
        width: 1200,
        height: 630,
      },
    ],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  icons: {
    icon: "/assets/logo/PicDB.png", // Favicon path
    apple: "/assets/logo/PicDB.png", // Apple Touch icon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <SpeedInsights />
        <Analytics mode="production" />
      </body>
    </html>
  );
}
