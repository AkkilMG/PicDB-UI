"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";

const Language = [
  { id: "en" as const, name: "English", icon: "/assets/images/english.png" },
  { id: "es" as const, name: "Español", icon: "/assets/images/spanish.png" },
  { id: "ru" as const, name: "русский", icon: "/assets/images/russian.png" },
  { id: "hi" as const, name: "हिन्दी", icon: "/assets/images/hindi.png" },
];

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { lang, setLanguage } = useLanguage();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const langIndex = Language.findIndex((l) => l.id === lang);
  const currentLang = langIndex !== -1 ? langIndex : 0;

  const changeLanguage = (c: number) => {
    let newLang: number;
    if (c === 0) {
      newLang = currentLang === Language.length - 1 ? 0 : currentLang + 1;
    } else {
      newLang = currentLang === 0 ? Language.length - 1 : currentLang - 1;
    }
    setLanguage(Language[newLang].id);
  };

  const navHref = pathname === "/dashboard" ? "/upload" : "/dashboard";
  const navLabel = pathname === "/dashboard" ? "Upload" : "Dashboard";

  return (
    <>
      <nav className="sticky top-0 bg-black z-20">
        <div className="container mx-auto flex justify-between items-center">
          <div className="ml-8">
            <Link href="/">
              <Image
                draggable={false}
                src="/assets/images/letter.png"
                alt="PikDB logo"
                width={100}
                height={40}
                priority
              />
            </Link>
          </div>
          <div className="mr-8 flex items-center space-x-4">
            <Link
              href={navHref}
              className="border-2 text-white rounded-md py-1 px-4"
            >
              {navLabel}
            </Link>
            <button
              className="ml-2 text-white inline-flex"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              type="button"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="3" cy="3" r="2.5" fill="currentColor" />
                <circle cx="10" cy="3" r="2.5" fill="currentColor" />
                <circle cx="17" cy="3" r="2.5" fill="currentColor" />
                <circle cx="3" cy="10" r="2.5" fill="currentColor" />
                <circle cx="10" cy="10" r="2.5" fill="currentColor" />
                <circle cx="17" cy="10" r="2.5" fill="currentColor" />
                <circle cx="3" cy="17" r="2.5" fill="currentColor" />
                <circle cx="10" cy="17" r="2.5" fill="currentColor" />
                <circle cx="17" cy="17" r="2.5" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <div
        className={`fixed right-0 top-12 mt-9 md:mt-14 mr-9 md:mr-24 z-20 divide-y divide-gray-100 rounded-lg shadow-sm w-44 bg-gray-700 ${
          dropdownOpen ? "" : "hidden"
        }`}
      >
        <ul className="py-2 text-sm text-gray-200">
          <li>
            <div className="flex justify-between items-center px-2 py-2">
              <button
                onClick={() => changeLanguage(1)}
                className="text-gray-200 hover:bg-gray-600 hover:text-white"
              >
                <Image
                  src="/assets/icons/left_arrow.svg"
                  alt="Previous language"
                  width={24}
                  height={24}
                />
              </button>
              <span className="flex items-center font-semibold">
                <Image
                  src="/assets/icons/translation.svg"
                  alt="Language"
                  width={16}
                  height={16}
                  className="mr-2"
                />{" "}
                {Language[currentLang].name}{" "}
                <Image
                  src={Language[currentLang].icon}
                  alt={Language[currentLang].name}
                  width={24}
                  height={24}
                  className="ml-2"
                />
              </span>
              <button
                onClick={() => changeLanguage(0)}
                className="text-gray-200 hover:bg-gray-600 hover:text-white"
              >
                <Image
                  src="/assets/icons/right_arrow.svg"
                  alt="Next language"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
