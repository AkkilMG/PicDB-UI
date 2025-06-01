// "use client";

// import Image from 'next/image';
// import {
//     ChartBarSquareIcon as DashboardIcon, 
//     CloudArrowUpIcon,
//     StarIcon,
//     BellIcon,
//     TrashIcon,
//   } from '@heroicons/react/24/outline';
// import { LiaCookieSolid } from "react-icons/lia";
// import { MdOutlinePrivacyTip, MdOutlinePolicy, MdReportProblem } from "react-icons/md";



// export default function Sidenav() {
//     return (
//       <aside className="w-64 bg-gray-50 p-4 border-r-2 border-gray-200 shadow-md">
//         {/* Logo */}
//         <div className="-mt-4 ml-3 flex items-center">
//             <Image draggable={false} src="/assets/images/letter-dark.png" alt="Logo" width={100} height={40} />
//         </div>

//         {/* Main Navigation */}
//         <nav>
//           <ul className="space-y-2">
//             <li>
//               <a draggable={false}href="/upload" className="flex items-center rounded-lg px-4 py-2 text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-gray-50">
//                 <CloudArrowUpIcon className="h-5 w-5 mr-2" />
//                 Upload
//               </a>
//             </li>
//             <li>
//               <a draggable={false}href="/dashboard" className="flex items-center rounded-lg px-4 py-2 text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-gray-50">
//                 <DashboardIcon className="h-5 w-5 mr-2" />
//                 Dashboard
//               </a>
//             </li>
//             <li>
//               <a draggable={false}href="/dashboard/favorite" className="flex items-center rounded-lg px-4 py-2 text-base font-medium text-gray-700 hover:text-gray-50 hover:bg-[#7DAE78]">
//                 <StarIcon className="h-5 w-5 mr-2" />
//                 Favorites
//               </a>
//             </li>
//             <li>
//               <a draggable={false}href="/dashboard/notification" className="flex items-center rounded-lg px-4 py-2 text-base font-medium text-gray-700 hover:text-gray-50 hover:bg-[#7DAE78] relative">
//                 <BellIcon className="h-5 w-5 mr-2" />
//                 Notifications
//                 {/* <span className="absolute top-1 right-1 bg-[#FFCF47] text-gray-800 text-xs rounded-full px-2 py-0.5">
//                   3
//                 </span> */}
//               </a>
//             </li>
//             <li>
//               <a draggable={false}href="/dashboard/report" className="flex items-center rounded-lg px-4 py-2 text-base font-medium text-gray-700 hover:text-gray-50 hover:bg-[#7DAE78]">
//                 <MdReportProblem className="h-5 w-5 mr-2" />
//                 Report
//               </a>
//             </li>
//             <li>
//               <a draggable={false}href="/dashboard/trash" className="flex items-center rounded-lg px-4 py-2 text-base font-medium text-gray-700 hover:text-gray-50 hover:bg-[#7DAE78]">
//                 <TrashIcon className="h-5 w-5 mr-2" />
//                 Trash
//               </a>
//             </li>
//           </ul>
//         </nav>

//         <hr className="my-4 border-gray-300" />
//         <h1 className="ml-4 text-lg font-semibold text-gray-800 mb-4">Policies</h1>

//         {/* Sub Navigation */}
//         <nav>
//           <ul className="space-y-2">
//             <li>
//               <a draggable={false}href="/policy/terms-of-service" className="flex items-center rounded-lg px-4 py-2 text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-gray-50">
//                 <MdOutlinePolicy className="h-5 w-5 mr-2" />
//                 Terms of Service
//               </a>
//             </li>
//             <li>
//               <a draggable={false}href="/policy/privacy" className="flex items-center rounded-lg px-4 py-2 text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-gray-50">
//                 <MdOutlinePrivacyTip className="h-5 w-5 mr-2" />
//                 Privacy Policy
//               </a>
//             </li>
//             <li>
//               <a draggable={false}href="/policy/cookies" className="flex items-center rounded-lg px-4 py-2 text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-gray-50">
//                 <LiaCookieSolid className="h-5 w-5 mr-2" />
//                 Cookies Policy
//               </a>
//             </li>
//           </ul>
//         </nav>

//       </aside>
//     );
// }


"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChartBarSquareIcon as DashboardIcon,
  CloudArrowUpIcon,
  StarIcon,
  BellIcon,
  TrashIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  LiaCookieSolid
} from "react-icons/lia";
import {
  MdOutlinePrivacyTip,
  MdOutlinePolicy,
  MdReportProblem
} from "react-icons/md";

export default function Sidenav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger for mobile */}
      <div className="md:hidden p-4 flex justify-between items-center bg-white border-b shadow-sm">
        <Image draggable={false} src="/assets/images/letter-dark.png" alt="Logo" width={100} height={40} />
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
          {isOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidenav */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-gray-50 p-4 border-r-2 border-gray-200 shadow-md
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:block
        `}
      >
        {/* Logo */}
        <div className="-mt-4 ml-3 flex items-center">
          <Image draggable={false} src="/assets/images/letter-dark.png" alt="Logo" width={100} height={40} />
        </div>

        {/* Navigation */}
        <nav className="mt-6">
          <ul className="space-y-2">
            <li>
              <a draggable={false} href="/upload" className="flex items-center rounded-lg px-4 py-2 text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-white">
                <CloudArrowUpIcon className="h-5 w-5 mr-2" />
                Upload
              </a>
            </li>
            <li>
              <a draggable={false} href="/dashboard" className="flex items-center rounded-lg px-4 py-2 text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-white">
                <DashboardIcon className="h-5 w-5 mr-2" />
                Dashboard
              </a>
            </li>
            <li>
              <a draggable={false} href="/dashboard/favorite" className="flex items-center rounded-lg px-4 py-2 text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-white">
                <StarIcon className="h-5 w-5 mr-2" />
                Favorites
              </a>
            </li>
            <li>
              <a draggable={false} href="/dashboard/notification" className="flex items-center rounded-lg px-4 py-2 text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-white">
                <BellIcon className="h-5 w-5 mr-2" />
                Notifications
              </a>
            </li>
            <li>
              <a draggable={false} href="/dashboard/report" className="flex items-center rounded-lg px-4 py-2 text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-white">
                <MdReportProblem className="h-5 w-5 mr-2" />
                Report
              </a>
            </li>
            <li>
              <a draggable={false} href="/dashboard/trash" className="flex items-center rounded-lg px-4 py-2 text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-white">
                <TrashIcon className="h-5 w-5 mr-2" />
                Trash
              </a>
            </li>
          </ul>
        </nav>

        <hr className="my-4 border-gray-300" />
        <h1 className="ml-4 text-lg font-semibold text-gray-800 mb-4">Policies</h1>

        <nav>
          <ul className="space-y-2">
            <li>
              <a draggable={false} href="/policy/terms-of-service" className="flex items-center rounded-lg px-4 py-2 text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-white">
                <MdOutlinePolicy className="h-5 w-5 mr-2" />
                Terms of Service
              </a>
            </li>
            <li>
              <a draggable={false} href="/policy/privacy" className="flex items-center rounded-lg px-4 py-2 text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-white">
                <MdOutlinePrivacyTip className="h-5 w-5 mr-2" />
                Privacy Policy
              </a>
            </li>
            <li>
              <a draggable={false} href="/policy/cookies" className="flex items-center rounded-lg px-4 py-2 text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-white">
                <LiaCookieSolid className="h-5 w-5 mr-2" />
                Cookies Policy
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
