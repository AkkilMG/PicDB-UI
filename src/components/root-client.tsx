"use client";

import React from "react";
import Cookies from "@/components/pop/cookies";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";

export default function RootClient() {
  return (
    <>
      <Cookies />
      <Toaster />
      <Analytics mode="production" />
    </>
  );
}
