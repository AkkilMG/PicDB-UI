"use client";

import Dashboard from "@/components/dashboard/links";
import Footer from "@/components/main/footer";
import Header from "@/components/main/header";
import Loading from "@/components/main/loading";
import Policy from "@/components/pop/policy";
import { useEffect, useState } from "react";

export default function DashboardPage() {
    const [loading, setLoading] = useState(true);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true); 
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="h-screen">
            {loading && isClient && <Loading />}
            <Policy />
            <Header />
            <Dashboard />
            <Footer />
        </div>
    );
}
