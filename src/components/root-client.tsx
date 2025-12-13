"use client";

import React, { useEffect } from 'react';
import Cookies from '@/components/pop/cookies';
import { Toaster } from '@/components/ui/toaster';
import { Analytics } from '@vercel/analytics/next';

export default function RootClient() {
  useEffect(() => {
    const gtagScript = document.createElement('script');
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-3V7FC6JL7R';
    gtagScript.async = true;
    document.head.appendChild(gtagScript);

    const inlineScript = document.createElement('script');
    inlineScript.innerHTML = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-3V7FC6JL7R');`;
    document.head.appendChild(inlineScript);

    // Load Google AdSense on client only to avoid head mutations before hydration
    const adsScript = document.createElement('script');
    adsScript.async = true;
    adsScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3201703650411352';
    adsScript.crossOrigin = 'anonymous';
    document.head.appendChild(adsScript);

    return () => {
      if (gtagScript.parentNode) gtagScript.parentNode.removeChild(gtagScript);
      if (inlineScript.parentNode) inlineScript.parentNode.removeChild(inlineScript);
      if (adsScript.parentNode) adsScript.parentNode.removeChild(adsScript);
    };
  }, []);

  useEffect(() => {
    const disableContextMenu = (e: MouseEvent) => e.preventDefault();
    const disableSelect = (e: Event) => e.preventDefault();

    document.addEventListener('contextmenu', disableContextMenu);
    document.addEventListener('selectstart', disableSelect);

    return () => {
      document.removeEventListener('contextmenu', disableContextMenu);
      document.removeEventListener('selectstart', disableSelect);
    };
  }, []);

  return (
    <>
      <Cookies />
      <Toaster />
      <Analytics mode="production" />
    </>
  );
}
