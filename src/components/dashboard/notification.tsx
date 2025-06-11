"use client";

import { useEffect, useState } from "react";
import { IoIosNotifications } from "react-icons/io";


export default function NotificationButtons() {
    const [drawerOpen, setDrawerOpen] = useState(true);
    
    useEffect(() => {
        if (drawerOpen) {
            const timer = setTimeout(() => {
                setDrawerOpen(false);
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [drawerOpen]);
    
    return (
        <>
        {!drawerOpen && (
        <div className="fixed -mr-4 bottom-24 right-4 sm:bottom-24 sm:right-4 z-40 cursor-pointer group" onClick={() => setDrawerOpen(true)}>
            <div className="w-7 h-16 bg-green-500 rounded-l-full shadow-lg flex items-center justify-center hover:bg-green-600 transition-colors">
            <IoIosNotifications className="text-white w-8 h-8 pl-1 group-hover:animate-pulse" />
            </div>
        </div>
        )}

        <a href="/dashboard/notification" className={`fixed bottom-24 transition-all duration-500 ease-in-out z-40 ${ drawerOpen ? 'right-6 sm:right-10' : '-right-full'}`}>
            <button className="bg-green-500 border-green-500 text-white px-4 py-4 rounded-full shadow-xl shadow-green-400/60 flex items-center justify-between group">
                <IoIosNotifications  className="w-5 h-5 inline-block" />
                <span className="hidden sm:block ml-2 transition-opacity duration-200 font-semibold whitespace-nowrap">Notification</span>
            </button>
        </a>
        </>
    );
}