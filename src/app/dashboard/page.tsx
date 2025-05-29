"use client";

import Dashboard from "@/components/dashboard/main/main";
import Footer from "@/components/main/footer";
import Header from "@/components/main/header";
import Policy from "@/components/pop/policy";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Loading = dynamic(() => import("@/components/main/loading"), { ssr: false });

export default function DashboardPage() {
    return (
        <div className="h-screen">
            <Policy />
            <Dashboard />
        </div>
    );
}
