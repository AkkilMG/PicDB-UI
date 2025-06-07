"use client";

import { enHome, esHome, hiHome, ruHome } from '@/config/text/home.text';
import React, { useEffect, useState } from 'react';

export default function AboutSection () {
  const [data, setData] = useState(enHome.sections);
  
    useEffect(() => {
      const checkLanguage = () => {
        const lang = localStorage.getItem("lang");
        if (lang === "es") {
          setData(esHome.sections);
        } else if (lang === "ru") {
          setData(ruHome.sections);
        } else if (lang === "hi") {
          setData(hiHome.sections);
        } else {
          setData(enHome.sections);
        }
      };
  
      checkLanguage();
      const intervalId = setInterval(checkLanguage, 2000);
  
      return () => clearInterval(intervalId);
    }, []);
    return (
      <div className="relative min-h-screen my-4 bg-white">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16">
             <div className="relative lg:col-start-1">
               <h2 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-8 leading-tight">
                {data[0]['title'][0]}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600"> {data[0]['title'][1]}</span>
                <br />
                <span className="text-gray-900"> {data[0]['title'][2]}</span>
              </h2>
               <p className="mt-6 text-xl text-gray-600 leading-relaxed">
               {data[0]['description']}
              </p>
            </div>
            <div className="mt-12 pt-12 relative lg:mt-0 lg:col-start-2">
              <div className="shadow-2xl rounded-2xl overflow-hidden ">
                <img src="/dashboard.png" alt="Dashboard" className="object-cover object-center w-full h-250" />
              </div>
            </div>
          </div>
          <div className="hidden sm:block lg:grid lg:grid-cols-2 lg:gap-16">
            <div className="pt-2 relative lg:mt-0 lg:col-start-1">
                <div className="shadow-2xl rounded-xl overflow-hidden w-48 h-98 mx-auto">
                  <img src="/dashboard-mobile.png" alt="Dashboard" className="object-cover object-center w-full h-full"/>
                </div>
            </div>
            <div className="relative lg:col-start-2">
               <h2 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-8 leading-tight">
                {data[1]['title'][0]}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-600"> {data[1]['title'][1]}</span>
                <br />
                <span className="text-gray-900"> {data[1]['title'][2]}</span>
              </h2>
               <p className="mt-6 text-xl text-gray-600 leading-relaxed">
               {data[1]['description']}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
};
