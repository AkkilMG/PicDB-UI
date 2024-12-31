"use client";

import Dashboard from "@/components/dashboard/links";
import Footer from "@/components/main/footer";
import Header from "@/components/main/header";
import Policy from "@/components/pop/policy";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Loading = dynamic(() => import("@/components/main/loading"), { ssr: false });

export default function DashboardPage() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="h-screen">
            {loading && <Loading />}
            <Policy />
            <Header />
            <Dashboard />
            <Footer />
        </div>
    );
}
