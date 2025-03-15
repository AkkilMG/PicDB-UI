"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import Cookies from "@/components/pop/cookies";
import React, { useEffect } from "react";

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
  useEffect(() => {
    const gtagScript = document.createElement("script");
    gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-1CEQM9SZSN";
    gtagScript.async = true;
    document.head.appendChild(gtagScript);

    const inlineScript = document.createElement("script");
    inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-1CEQM9SZSN');
    `;
    document.head.appendChild(inlineScript);
  }, []);

  return (
    <html lang="en">
      <head>
        <title>PicDB - Free Picture Storage</title>
        <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />

        <meta name="title" content="PicDB - Free Picture Storage" />
        <meta name="description" content="PicDB is a free, anonymously and fast picture storage web application built by AvianInTek. Store, organize, and access your images easily from any device." />
        <meta name="keywords" content="AvianInTek, AvianInTek website, Akkil M G, Srujan Rai, Saiesh Savant, Aman Shetty, Mangalore, Mangaluru, Karnataka, India, Indian tech, PicDB, PicDB by AvianInTek, PicDB website, PicDB app, PicDB image storage, PicDB picture storage, PicDB photo storage, PicDB secure photo storage, PicDB free picture storage, PicDB free image storage, PicDB free photo storage, akkil, akkilmg, free, image, storage, freemium, anonymous, picture storage, image storage, photo storage, secure photo storage, Next.js, PicDB, AvianInTek" />
        <meta name="author" content="AvianInTek" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://picdb.avianintek.com/" />
        <meta property="og:title" content="PicDB - Free Picture Storage" />
        <meta property="og:description" content="Store your images anonymously with PicDB, a fast and easy-to-use picture storage service built with Next.js." />
        <meta property="og:image" content="/assets/seo/website.png" />

        <link rel="icon" href="/assets/logo/PicDB.png" />
        <link rel="apple-touch-icon" href="/assets/logo/PicDB.png" />

        {/* Google AdSense */}
        <meta name="google-adsense-account" content="ca-pub-3201703650411352" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3201703650411352" crossOrigin="anonymous"></script>
      </head>
      
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased scrollbar`}>
        <Cookies />
        {children}
        <SpeedInsights />
        <Analytics mode="production" />
      </body>
    </html>
  );
}
