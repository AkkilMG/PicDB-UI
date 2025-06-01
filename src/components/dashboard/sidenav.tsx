"use client";

import { useEffect, useState } from "react";
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
import { enSideNav, esSideNav, hiSideNav, ruSideNav } from "@/config/text/sidenav.text";



export default function Sidenav() {
  const [isOpen, setIsOpen] = useState(false);

  const [data, setData] = useState(enSideNav);
  useEffect(() => {
      const checkLanguage = () => {
      const lang = localStorage.getItem("lang");
        if (lang === "es") {
            setData(esSideNav);
        } else if (lang === "ru") {
            setData(ruSideNav);
        } else if (lang === "hi") {
            setData(hiSideNav);
        } else {
            setData(enSideNav);
        }
      };

      checkLanguage();
      const intervalId = setInterval(checkLanguage, 2000);

      return () => clearInterval(intervalId);
  }, []);
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
                {data.upload}
              </a>
            </li>
            <li>
              <a draggable={false} href="/dashboard" className="flex items-center rounded-lg px-4 py-2 text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-white">
                <DashboardIcon className="h-5 w-5 mr-2" />
                {data.dashboard}
              </a>
            </li>
            <li>
              <a draggable={false} href="/dashboard/favorite" className="flex items-center rounded-lg px-4 py-2 text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-white">
                <StarIcon className="h-5 w-5 mr-2" />
                {data.favorite}
              </a>
            </li>
            <li>
              <a draggable={false} href="/dashboard/notification" className="flex items-center rounded-lg px-4 py-2 text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-white">
                <BellIcon className="h-5 w-5 mr-2" />
                {data.notification}
              </a>
            </li>
            <li>
              <a draggable={false} href="/dashboard/report" className="flex items-center rounded-lg px-4 py-2 text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-white">
                <MdReportProblem className="h-5 w-5 mr-2" />
                {data.report}
              </a>
            </li>
            <li>
              <a draggable={false} href="/dashboard/trash" className="flex items-center rounded-lg px-4 py-2 text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-white">
                <TrashIcon className="h-5 w-5 mr-2" />
                {data.trash}
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
                {data.termsOfService}
              </a>
            </li>
            <li>
              <a draggable={false} href="/policy/privacy" className="flex items-center rounded-lg px-4 py-2 text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-white">
                <MdOutlinePrivacyTip className="h-5 w-5 mr-2" />
                {data.privacyPolicy}
              </a>
            </li>
            <li>
              <a draggable={false} href="/policy/cookies" className="flex items-center rounded-lg px-4 py-2 text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-white">
                <LiaCookieSolid className="h-5 w-5 mr-2" />
                {data.cookiesPolicy}
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
