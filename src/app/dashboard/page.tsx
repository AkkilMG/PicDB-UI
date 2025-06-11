"use client";

import Dashboard from "@/components/dashboard/main/main";
import Policy from "@/components/pop/policy";
import dynamic from "next/dynamic";
import NotificationButtons from "@/components/dashboard/notification";

const Loading = dynamic(() => import("@/components/main/loading"), { ssr: false });

export default function DashboardPage() {
    return (
        <div className="h-screen">
            <Policy />
            <NotificationButtons />
            <Dashboard />
        </div>
    );
}
