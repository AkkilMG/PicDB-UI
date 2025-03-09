"use client";

import { enHome, esHome, hiHome, ruHome } from '@/config/text/home.text';
import React, { useEffect, useState } from 'react';

export default function AboutSection () {
  const [data, setData] = useState(enHome.sections[0]);
  
    useEffect(() => {
      const checkLanguage = () => {
        const lang = localStorage.getItem("lang");
        if (lang === "es") {
          setData(esHome.sections[0]);
        } else if (lang === "ru") {
          setData(ruHome.sections[0]);
        } else if (lang === "hi") {
          setData(hiHome.sections[0]);
        } else {
          setData(enHome.sections[0]);
        }
      };
  
      checkLanguage();
      const intervalId = setInterval(checkLanguage, 2000);
  
      return () => clearInterval(intervalId);
    }, []);
    return (
      <div className="relative bg-white">
        <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16">
             <div className="relative lg:col-start-1">
               <h2 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-8 leading-tight">
                {data['title'][0]}
                <br />
                <span className="text-gray-900"> {data['title'][1]}</span>
                <br />
                <span className="text-gray-900"> {data['title'][2]}</span>
              </h2>
               <p className="mt-6 text-xl text-gray-600 leading-relaxed">
               {data['description']}
              </p>
  
            </div>
            <div className="mt-12 relative lg:mt-0 lg:col-start-2">
                <div className="shadow-2xl rounded-2xl overflow-hidden ">
                  <img
                    src="/dashboard.png"
                    alt="Dashboard"
                    className="object-cover object-center w-full h-full"
                  />
                </div>
              {/* <div className="absolute top-1/2 right-0 transform -translate-y-1/2 mt-16 z-10  max-w-md">
               <div className="grid grid-cols-1 bg-white shadow-lg rounded-xl">
                  <div className="flex items-center bg-opacity-90 p-4">
                      <div className="mr-3 p-2 bg-blue-50 rounded-full w-11 h-11 flex justify-center items-center">
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#1E88E5" className="w-7 h-7">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75l-6-3.75v-4.5z" />
                          </svg>
                        </div>
                       <span className="text-gray-900 font-medium text-2xl">High quality traffic</span>
                    </div>
                     <div className="flex items-center bg-opacity-90 p-4">
                      <div className="mr-3 p-2 bg-blue-50 rounded-full w-11 h-11 flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#1E88E5" className="w-7 h-7">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5L18 9m-7.5 7.5l3 3m-6.75-6l-1.5-1.5m11.4-1.35a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-gray-900 font-medium text-2xl">Advanced API tools</span>
                    </div>
                     <div className="flex items-center bg-opacity-90 p-4">
                       <div className="mr-3 p-2 bg-blue-50 rounded-full w-11 h-11 flex justify-center items-center">
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#1E88E5" className="w-7 h-7">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                         <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5l-7.5 4.5m0 0l3 3m-3-3l3-3m-1.5-1.5l-1.5 1.5m6-6L15 8.5m-7.5 7.5l1.5 1.5" />
                      </svg>
                    </div>
                    <span className="text-gray-900 font-medium text-2xl">Worldwide coverage</span>
                  </div>
                </div>
               </div> */}
            </div>
          </div>
        </div>
        </div>
    );
};
