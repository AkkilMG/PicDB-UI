"use client";

import Image from 'next/image';
import {
  ChartBarIcon,
  FlagIcon,
  PaperAirplaneIcon,
  } from '@heroicons/react/24/outline';
import { MdNotifications } from 'react-icons/md';
import { User2Icon } from 'lucide-react';



export default function AdminSidenav() {
    return (
      <aside className="w-64 bg-gray-50 p-4 border-r-2 border-gray-200 shadow-md">
        {/* Logo */}
        <div>
          <div className="-mt-4 ml-3 flex items-center">
            <Image src="/assets/images/letter-dark.png" alt="Logo" width={100} height={40} />
          </div>
            <p className="relative -mt-8 ml-4 mb-6 text-lg font-semibold text-gray-800">Admin Panel</p>
        </div>

        {/* Main Navigation */}
        <nav>
          <ul className="space-y-2">
            <li>
              <a href="/admin/analysis" className="flex items-center rounded-lg px-4 py-2 text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-gray-50">
                <ChartBarIcon className="h-5 w-5 mr-2" />
                Analysis
              </a>
            </li>
            <li>
              <a href="/admin/reports" className="flex items-center rounded-lg px-4 py-2 text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-gray-50">
                <FlagIcon className="h-5 w-5 mr-2" />
                Report
              </a>
            </li>
            <li>
              <a href="/admin/analysis" className="flex items-center rounded-lg px-4 py-2 text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-gray-50">
                <PaperAirplaneIcon className="h-5 w-5 mr-2" />
                Send Notification
              </a>
            </li>
            
            <li>
              <a href="/admin/analysis" className="flex items-center rounded-lg px-4 py-2 text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-gray-50">
                <MdNotifications className="h-5 w-5 mr-2" />
                Notifications
              </a>
            </li>
            <li>
              <a href="/admin/signup" className="flex items-center rounded-lg px-4 py-2 text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-gray-50">
                <User2Icon className="h-5 w-5 mr-2" />
                Register Admin
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    );
}