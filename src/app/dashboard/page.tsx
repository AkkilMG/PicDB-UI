"use client";

import Dashboard from "@/components/dashboard/links";
import Footer from "@/components/main/footer";
import Header from "@/components/main/header";
import Policy from "@/components/pop/policy";

export default function DashboardPage() {
    return (
        <div>
            <Policy />
            <Header />
            <Dashboard />
            <Footer />
        </div>
    )
}