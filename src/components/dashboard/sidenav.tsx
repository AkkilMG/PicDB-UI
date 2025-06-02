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
import { ChevronLeft, ChevronRight } from "lucide-react";



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
    
  const [lang, setLang] = useState(0);
  const Language = [
    { id: "en", name: "English", icon: "/assets/images/english.png" },
    { id: "es", name: "Español", icon: "/assets/images/spanish.png" },
    { id: "ru", name: "русский", icon: "/assets/images/russian.png" },
    { id: "hi", name: "हिन्दी", icon: "/assets/images/hindi.png" },
  ]

  useEffect(() => {
    const storedLang = localStorage.getItem('lang');
    if (storedLang){
      const langIndex = storedLang ? Language.findIndex(lang => lang.id === storedLang) : 0;
      setLang(langIndex !== -1 ? langIndex : 0);
    } else {
      localStorage.setItem('lang', Language[0].id);
      setLang(0);
    }
  }, []);
  

  const changeLanguage = async (c: number) => {
    let newLang;
    if (c===0) {
      newLang = lang===Language.length-1 ? 0 : lang + 1; 
    } else {
      newLang = lang===0 ? Language.length-1 : lang - 1;
    }
    setLang(newLang);
    localStorage.setItem('lang', Language[newLang].id);
  }

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
          fixed top-0 left-0 z-40 h-full w-64 bg-gray-50 p-4 border-r-2 border-gray-200 shadow-md
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:block
        `}
      >
        {/* Logo */}
        <div className="ml-3 flex items-center">
          <Image draggable={false} src="/assets/images/letter-dark.png" alt="Logo" width={100} height={40} />
        </div>

        {/* Navigation */}
        <nav className="mt-4">
          <ul className="space-y-2">
            <li>
              <div className="flex justify-center -ml-7">
                <div className="flex items-center rounded-lg px-3 py-2">
                  <button onClick={() => changeLanguage(1)} aria-label="Previous language"
                    className="p-1 black hover:text-gray-800 hover:bg-gray-200 rounded transition">
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <span className="flex items-center justify-center mr-3 font-medium text-gray-700">
                    <img src="/assets/icons/translation.svg" alt="Language" className="h-4 w-4 mr-2" />
                    {Language[lang].name}
                    <img src={Language[lang].icon} alt={Language[lang].name} className="h-6 w-6 ml-2" />
                  </span>
                  <button onClick={() => changeLanguage(0)} aria-label="Next language"
                    className="p-1 text-black hover:text-gray-800 hover:bg-gray-200 rounded transition">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </li>
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
