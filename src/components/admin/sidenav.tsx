"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChartBarIcon,
  FlagIcon,
  PaperAirplaneIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { MdNotifications } from "react-icons/md";
import { User2Icon } from "lucide-react";


export default function AdminSidenav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger for mobile */}
      <div className="md:hidden p-4 flex justify-between items-center bg-white border-b shadow-sm">
        <a draggable={false} href="/">
          <Image draggable={false} src="/assets/images/letter-dark.png" alt="Logo" width={100} height={40} />
        </a>
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
          {isOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Overlay for mobile when open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidenav */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full w-64 bg-gray-50 p-4 border-r-2 border-gray-200 shadow-md
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:block
        `}
      >
        {/* Logo & Title */}
        <div>
          <a draggable={false} href="/" className="ml-3 flex items-center">
            <Image draggable={false} src="/assets/images/letter-dark.png" alt="Logo" width={100} height={40} />
          </a>
          <p className="relative -mt-8 ml-4 mb-6 text-lg font-semibold text-gray-800">
            Admin Panel
          </p>
        </div>

        {/* Navigation */}
        <nav>
          <ul className="space-y-2">
            <li>
              <a draggable={false} href="/admin/analysis"
                className="flex items-center rounded-lg px-4 py-2 text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-white">
                <ChartBarIcon className="h-5 w-5 mr-2" />
                Analysis
              </a>
            </li>
            <li>
              <a draggable={false} href="/admin/reports"
                className="flex items-center rounded-lg px-4 py-2 text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-white">
                <FlagIcon className="h-5 w-5 mr-2" />
                Report
              </a>
            </li>
            <li>
              <a draggable={false} href="/admin/notification/new"
                className="flex items-center rounded-lg px-4 py-2 text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-white">
                <PaperAirplaneIcon className="h-5 w-5 mr-2" />
                Send Notification
              </a>
            </li>
            <li>
              <a draggable={false} href="/admin/notification"
                className="flex items-center rounded-lg px-4 py-2 text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-white">
                <MdNotifications className="h-5 w-5 mr-2" />
                Notifications
              </a>
            </li>
            <li>
              <a draggable={false} href="/admin/signup"
                className="flex items-center rounded-lg px-4 py-2 text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-white">
                <User2Icon className="h-5 w-5 mr-2" />
                Register Admin
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
