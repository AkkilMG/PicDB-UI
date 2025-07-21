"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ChartBarSquareIcon as DashboardIcon,
  CloudArrowUpIcon,
  StarIcon,
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
import { ChevronLeft, ChevronRight, FolderIcon } from "lucide-react";
import { RiChatSmileAiLine } from "react-icons/ri";
import { FaUserGroup } from "react-icons/fa6";



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
      <div className="md:hidden p-3 sm:p-4 sticky flex justify-between items-center bg-white border-b shadow-sm">
        <a draggable={false} href="/">
          <Image draggable={false} src="/assets/images/letter-dark.png" alt="Logo" width={80} height={32} className="sm:w-[100px] sm:h-[40px]" />
        </a>
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none p-1">
          {isOpen ? (
            <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6" />
          ) : (
            <Bars3Icon className="h-5 w-5 sm:h-6 sm:w-6" />
          )}
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidenav */}
      <aside className={`fixed top-0 left-0 z-40 h-full w-56 sm:w-64 bg-gray-50 p-3 sm:p-4 border-r-2 border-gray-200 shadow-md transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:block`}>
        {/* Logo */}
        <a draggable={false} href="/" className="ml-2 sm:ml-3 flex items-center">
          <Image draggable={false} src="/assets/images/letter-dark.png" alt="Logo" width={80} height={32} className="sm:w-[100px] sm:h-[40px]" />
        </a>

        {/* Navigation */}
        <nav className="mt-3 sm:mt-4">
          <ul className="space-y-1 sm:space-y-2">
            <li>
              <div className="flex justify-center -ml-4 sm:-ml-7">
                <div className="flex items-center rounded-lg px-2 sm:px-3 py-1 sm:py-2">
                  <button onClick={() => changeLanguage(1)} aria-label="Previous language"
                    className="p-0.5 sm:p-1 black hover:text-gray-800 hover:bg-gray-200 rounded transition">
                    <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                  <span className="flex items-center justify-center mr-2 sm:mr-3 font-medium text-gray-700 text-xs sm:text-sm">
                    <img src="/assets/icons/translation.svg" alt="Language" className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    {/* <span className="hidden xs:inline">{Language[lang].name}</span> */}
                    {/* <span className="xs:hidden">{Language[lang].id.toUpperCase()}</span> */}
                    <span>{Language[lang].name}</span> 
                    <img src={Language[lang].icon} alt={Language[lang].name} className="h-4 w-4 sm:h-6 sm:w-6 ml-1 sm:ml-2" />
                  </span>
                  <button onClick={() => changeLanguage(0)} aria-label="Next language"
                    className="p-0.5 sm:p-1 text-black hover:text-gray-800 hover:bg-gray-200 rounded transition">
                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
              </div>
            </li>
            <li>
              <a draggable={false} href="/upload" className="flex items-center rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-white transition-colors duration-200">
                <CloudArrowUpIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2 flex-shrink-0" />
                <span className="truncate">{data.upload}</span>
              </a>
            </li>
            <li>
              <a draggable={false} href="/dashboard" className="flex items-center rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-white transition-colors duration-200">
                <DashboardIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2 flex-shrink-0" />
                <span className="truncate">{data.dashboard}</span>
              </a>
            </li>
            <li>
              <a draggable={false} href="/dashboard/favorite" className="flex items-center rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-white transition-colors duration-200">
                <StarIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2 flex-shrink-0" />
                <span className="truncate">{data.favorite}</span>
              </a>
            </li>
            {/* <li>
              <a draggable={false} href="/dashboard/folders" className="flex items-center rounded-lg px-4 py-2 text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-white">
                <FolderIcon className="h-5 w-5 mr-2" />
                Folder
              </a>
            </li> */}
            <li>
              <a draggable={false} href="/dashboard/group-room" className="flex items-center rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-white transition-colors duration-200">
                <FaUserGroup  className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2 flex-shrink-0" />
                <span className="truncate">{data.groupRoom}</span>
              </a>
            </li>
            <li>
              <a draggable={false} href="/dashboard/report" className="flex items-center rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-white transition-colors duration-200">
                <MdReportProblem className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2 flex-shrink-0" />
                <span className="truncate">{data.report}</span>
              </a>
            </li>
            <li>
              <a draggable={false} href="/dashboard/trash" className="flex items-center rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-white transition-colors duration-200">
                <TrashIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2 flex-shrink-0" />
                <span className="truncate">{data.trash}</span>
              </a>
            </li>
          </ul>
        </nav>

        <hr className="my-2 sm:my-3 border-gray-300" />
        
        <h1 className="ml-3 sm:ml-4 text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-4">Policies</h1>
        <nav>
          <ul className="space-y-1 sm:space-y-2">
            <li>
              <a draggable={false} href="/policy/terms-of-service" className="flex items-center rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-white transition-colors duration-200">
                <MdOutlinePolicy className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2 flex-shrink-0" />
                <span className="truncate">{data.termsOfService}</span>
              </a>
            </li>
            <li>
              <a draggable={false} href="/policy/privacy" className="flex items-center rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-white transition-colors duration-200">
                <MdOutlinePrivacyTip className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2 flex-shrink-0" />
                <span className="truncate">{data.privacyPolicy}</span>
              </a>
            </li>
            <li>
              <a draggable={false} href="/policy/cookies" className="flex items-center rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-white transition-colors duration-200">
                <LiaCookieSolid className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2 flex-shrink-0" />
                <span className="truncate">{data.cookiesPolicy}</span>
              </a>
            </li>
          </ul>
        </nav>
        
        <hr className="my-2 sm:my-3 border-gray-300" />
        
        <nav>
          <ul className="space-y-1 sm:space-y-2">
            <li>
              <a draggable={false} href="/testimonials"
                className="flex items-center rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base font-medium hover:bg-[#7DAE78] text-gray-700 hover:text-white transition-colors duration-200">
                <RiChatSmileAiLine className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2 flex-shrink-0" />
                <span className="truncate">Give Testimonial</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
