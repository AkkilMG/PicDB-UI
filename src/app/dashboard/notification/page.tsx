"use client";

import type { Metadata } from "next";
import Notification from "@/components/dashboard/notification/main";
import Policy from "@/components/pop/policy";
// import dynamic from "next/dynamic";

// const Loading = dynamic(() => import("@/components/main/loading"), { ssr: false });

export default function NotificationPage() {
    return (
        <div className="h-screen">
            <Policy />
            <Notification />
        </div>
    );
}
