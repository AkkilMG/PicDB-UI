"use client";


import Favorite from "@/components/dashboard/favorite/main";
import NotificationButtons from "@/components/dashboard/notification";
import Policy from "@/components/pop/policy";
// import dynamic from "next/dynamic";

// const Loading = dynamic(() => import("@/components/main/loading"), { ssr: false });

export default function FavoritePage() {
    return (
        <div className="h-screen">
            <Policy />
            <NotificationButtons />
            <Favorite />
        </div>
    );
}
