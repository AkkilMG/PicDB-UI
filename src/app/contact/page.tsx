"use client";

import { useEffect } from "react";

export default function ContactPage() {
    useEffect(() => {
        // Redirect to the contact form
        window.location.href = "https://desk.arkynox.com/";
    }, []);
    return (
        <div className="flex justify-center items-center h-screen text-2xl font-bold">
            <h1>Redirecting you to helpdesk...</h1>
        </div>
    );
}