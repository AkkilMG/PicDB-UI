import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from '@vercel/speed-insights/next';
import RootClient from '@/components/root-client';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>PicDB - Free Picture Storage</title>
        <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />

        <meta name="title" content="PicDB - Free Picture Storage" />
        <meta name="description" content="PicDB is a free, anonymously and fast picture storage web application built by Arkynox. Store, organize, and access your images easily from any device." />
        <meta name="keywords" content="Arkynox, Arkynox website, Akkil M G, Srujan Rai, Saiesh Savant, Aman Shetty, Mangalore, Mangaluru, Karnataka, India, Indian tech, PicDB, PicDB by Arkynox, PicDB website, PicDB app, PicDB image storage, PicDB picture storage, PicDB photo storage, PicDB secure photo storage, PicDB free picture storage, PicDB free image storage, PicDB free photo storage, akkil, akkilmg, free, image, storage, freemium, anonymous, picture storage, image storage, photo storage, secure photo storage, Next.js, PicDB, Arkynox" />
        <meta name="author" content="Arkynox" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://picdb.arkynox.com/" />
        <meta property="og:title" content="PicDB - Free Picture Storage" />
        <meta property="og:description" content="Store your images anonymously with PicDB, a fast and easy-to-use picture storage service built with Next.js." />
        <meta property="og:image" content="/assets/seo/website.png" />

        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@ArkynoxTech" />
        <meta name="twitter:title" content="PicDB - Free Picture Storage" />
        <meta name="twitter:description" content="Store your images anonymously with PicDB, a fast and easy-to-use picture storage service built with Next.js." />
        <meta name="twitter:image" content="https://picdb.arkynox.com/assets/seo/website.png" />

        {/* JSON-LD Structured Data for Organization (server-rendered) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{"@context":"https://schema.org","@type":"Organization","name":"Arkynox","url":"https://picdb.arkynox.com","logo":"https://picdb.arkynox.com/assets/logo/PicDB.png"}`
          }}
        />

        <link rel="icon" href="/assets/logo/PicDB.png" />
        <link rel="apple-touch-icon" href="/assets/logo/PicDB.png" />

        {/* Google AdSense: loaded on client to avoid head mutations during hydration */}
        <meta name="google-adsense-account" content="ca-pub-3201703650411352" />
      </head>
      
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased scrollbar`}>
        <RootClient />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}

