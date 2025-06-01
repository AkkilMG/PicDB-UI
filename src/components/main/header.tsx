"use client";

import React, { useEffect, useState } from 'react';

const Header = () => {
    const [button, setButton] = useState(<button onClick={() => window.location.href = "/dashboard"} className="border-2 text-white rounded-md py-1 px-4">Dashboard</button>);
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
    
    useEffect(() => {
        if (window.location.pathname !== "/dashboard") {
            setButton(<button onClick={() => window.location.href = "/dashboard"} className="border-2 text-white rounded-md py-1 px-4">Dashboard</button>);
        } else {
            setButton(<button onClick={() => window.location.href = "/upload"} className="border-2 text-white rounded-md py-1 px-4">Upload</button>);
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
      <nav className="sticky top-0 bg-black z-20">
        <div className="container mx-auto flex justify-between items-center">
          <div className="ml-8">
            <img draggable={false} onClick={() => window.location.href = "/"} src='/assets/images/letter.png' alt='PicDB logo' width={100} height={40} />
          </div>
          <div className="mr-8 flex items-center space-x-4">
            {button}    
            <button className="ml-2 text-white inline-flex" id="dropdownHoverButton" onClick={() => document.getElementById('dropdownHover')?.classList.toggle('hidden')} type="button">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      <div id="dropdownHover" className="fixed right-0 top-12 mt-14 mr-6 z-20 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
        <ul className="py-2 text-sm text-gray-200" aria-labelledby="dropdownHoverButton">
          <li>
        <div className="flex justify-between items-center px-2 py-2">
          <button onClick={(e) => changeLanguage(1)} className="text-gray-200 hover:bg-gray-100 hover:bg-gray-600 hover:text-white">
            <img src="/assets/icons/left_arrow.svg" alt="English" className='h-6 w-6' />
          </button>
            <span className='flex items-center font-semibold'><img src="/assets/icons/translation.svg" alt="Language" className='h-4 w-4 mr-2' /> {Language[lang].name} <img src={Language[lang].icon} alt={Language[lang].name} className='h-6 w-6 ml-2' /></span>
          <button onClick={(e) => changeLanguage(0)} className="text-gray-200 hover:bg-gray-100 hover:bg-gray-600 hover:text-white">
            <img src="/assets/icons/right_arrow.svg" alt="English" className='h-6 w-6' />
          </button>
        </div>
          </li>
          {/* <li><a draggable={false}href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a></li> */}
        </ul>
      </div>
      </>
    );
};

export default Header;