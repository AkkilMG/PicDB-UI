"use client";

import Image from 'next/image';
import {
    CloudIcon,
    ChartBarSquareIcon as DashboardIcon, // Renamed to ChartBarSquareIcon
    LockClosedIcon,
    UsersIcon,
    StarIcon,
    BellIcon,
    TrashIcon,
  } from '@heroicons/react/24/outline';

export default function Sidenav() {
    return (
      <aside className="w-64 bg-gray-50 p-4 border-r-2 border-gray-200 shadow-md">
        {/* Logo */}
        <div className="-mt-4 ml-3 flex items-center">
            <Image src="/assets/images/letter-dark.png" alt="Logo" width={100} height={40} />
        </div>

        {/* Navigation */}
        <nav>
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-gray-50">
                <DashboardIcon className="h-5 w-5 mr-2" />
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-50 hover:bg-[#7DAE78]">
                <LockClosedIcon className="h-5 w-5 mr-2" />
                Private Files
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-50 hover:bg-[#7DAE78]">
                <UsersIcon className="h-5 w-5 mr-2" />
                Members
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-50 hover:bg-[#7DAE78]">
                <StarIcon className="h-5 w-5 mr-2" />
                Favorites
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-50 hover:bg-[#7DAE78] relative">
                <BellIcon className="h-5 w-5 mr-2" />
                Notifications
                <span className="absolute top-1 right-1 bg-[#FFCF47] text-gray-800 text-xs rounded-full px-2 py-0.5">
                  3
                </span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-50 hover:bg-[#7DAE78]">
                <TrashIcon className="h-5 w-5 mr-2" />
                Trash
              </a>
            </li>
          </ul>
        </nav>

        {/* User Info */}
        <div className="mt-auto flex flex-col items-center">
          <div className="w-20 h-20 rounded-full overflow-hidden mt-8 mb-2">
            <Image src="/profile.jpg" alt="Profile" width={80} height={80} />
          </div>
          <div className="text-center">
            <p className="font-medium text-gray-800">Akkil M G</p>
            <p className="text-sm text-gray-600">akkil@avianintek.com</p>
          </div>
        </div>
      </aside>
    );
}