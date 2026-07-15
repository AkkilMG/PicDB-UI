import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import RootClient from "@/components/root-client";
import { LanguageProvider } from "@/contexts/language-context";
import { keywords } from "@/config/seo.config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "PikDB - Free Picture Storage",
    template: "%s | PikDB by Arkynox",
  },
  description:
    "PikDB is a free, anonymously and fast picture storage web application built by Arkynox. Store, organize, and access your images easily from any device.",
  keywords: keywords,
  authors: [{ name: "Arkynox" }],
  creator: "Arkynox",
  metadataBase: new URL("https://www.pikdb.com"),
  robots: {
    index: true,
    follow: true,
    googleBot:
      "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.pikdb.com",
    title: "PikDB - Free Picture Storage",
    description: "Store your images anonymously with PikDB",
    siteName: "PikDB",
    images: [
      {
        url: "https://www.pikdb.com/assets/seo/website.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ArkynoxTech",
    title: "PikDB - Free Picture Storage",
    description: "Store your images anonymously with PikDB",
    images: ["https://www.pikdb.com/assets/seo/website.png"],
  },
  alternates: {
    canonical: "https://www.pikdb.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/logo/PikDB-favicon.png" />
        <link rel="apple-touch-icon" href="/assets/logo/PikDB-apple.png" />
        <meta
          name="google-adsense-account"
          content="ca-pub-3201703650411352"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Arkynox",
              url: "https://www.pikdb.com",
              logo: "https://www.pikdb.com/assets/logo/PikDB.webp",
            }),
          }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased scrollbar`}
      >
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3V7FC6JL7R"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-3V7FC6JL7R');`}
        </Script>
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3201703650411352"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <LanguageProvider>
          <RootClient />
          {children}
        </LanguageProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}

