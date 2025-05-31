"use client";

import Image from 'next/image';
import {
    CloudIcon,
    ChartBarSquareIcon as DashboardIcon, // Renamed to ChartBarSquareIcon
    LockClosedIcon,
    CloudArrowUpIcon,
    UsersIcon,
    StarIcon,
    BellIcon,
    TrashIcon,
  } from '@heroicons/react/24/outline';
import { LiaCookieSolid } from "react-icons/lia";
import { MdOutlinePrivacyTip, MdOutlinePolicy, MdReportProblem } from "react-icons/md";



export default function Sidenav() {
    return (
      <aside className="w-64 bg-gray-50 p-4 border-r-2 border-gray-200 shadow-md">
        {/* Logo */}
        <div className="-mt-4 ml-3 flex items-center">
            <Image src="/assets/images/letter-dark.png" alt="Logo" width={100} height={40} />
        </div>

        {/* Main Navigation */}
        <nav>
          <ul className="space-y-2">
            <li>
              <a href="/upload" className="flex items-center rounded-lg px-4 py-2 text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-gray-50">
                <CloudArrowUpIcon className="h-5 w-5 mr-2" />
                Upload
              </a>
            </li>
            <li>
              <a href="/dashboard" className="flex items-center rounded-lg px-4 py-2 text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-gray-50">
                <DashboardIcon className="h-5 w-5 mr-2" />
                Dashboard
              </a>
            </li>
            {/* <li>
              <a href="#" className="flex items-center rounded-lg px-4 py-2 text-base font-medium text-gray-700 hover:text-gray-50 hover:bg-[#7DAE78]">
                <LockClosedIcon className="h-5 w-5 mr-2" />
                Private Files
              </a>
            </li> */}
            <li>
              <a href="/dashboard/favorite" className="flex items-center rounded-lg px-4 py-2 text-base font-medium text-gray-700 hover:text-gray-50 hover:bg-[#7DAE78]">
                <StarIcon className="h-5 w-5 mr-2" />
                Favorites
              </a>
            </li>
            <li>
              <a href="/dashboard/notification" className="flex items-center rounded-lg px-4 py-2 text-base font-medium text-gray-700 hover:text-gray-50 hover:bg-[#7DAE78] relative">
                <BellIcon className="h-5 w-5 mr-2" />
                Notifications
                {/* <span className="absolute top-1 right-1 bg-[#FFCF47] text-gray-800 text-xs rounded-full px-2 py-0.5">
                  3
                </span> */}
              </a>
            </li>
            <li>
              <a href="/dashboard/report" className="flex items-center rounded-lg px-4 py-2 text-base font-medium text-gray-700 hover:text-gray-50 hover:bg-[#7DAE78]">
                <MdReportProblem className="h-5 w-5 mr-2" />
                Report
              </a>
            </li>
            <li>
              <a href="/dashboard/trash" className="flex items-center rounded-lg px-4 py-2 text-base font-medium text-gray-700 hover:text-gray-50 hover:bg-[#7DAE78]">
                <TrashIcon className="h-5 w-5 mr-2" />
                Trash
              </a>
            </li>
          </ul>
        </nav>

        <hr className="my-4 border-gray-300" />
        <h1 className="ml-4 text-lg font-semibold text-gray-800 mb-4">Policies</h1>

        {/* Sub Navigation */}
        <nav>
          <ul className="space-y-2">
            <li>
              <a href="/policy/terms-of-service" className="flex items-center rounded-lg px-4 py-2 text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-gray-50">
                <MdOutlinePolicy className="h-5 w-5 mr-2" />
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/policy/privacy" className="flex items-center rounded-lg px-4 py-2 text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-gray-50">
                <MdOutlinePrivacyTip className="h-5 w-5 mr-2" />
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/policy/cookies" className="flex items-center rounded-lg px-4 py-2 text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-gray-50">
                <LiaCookieSolid className="h-5 w-5 mr-2" />
                Cookies Policy
              </a>
            </li>
          </ul>
        </nav>

      </aside>
    );
}