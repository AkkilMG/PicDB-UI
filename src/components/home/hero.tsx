"use client";

import React, { useEffect, useState } from 'react';
import Header from '../main/header';
import { enHome, esHome, ruHome, hiHome } from '../../config/text/home.text';

const HeroSection = () => {

  const [device, setDevice] = useState("assets/images/computer.png");
  const [windowWidth, setWindowWidth] = useState(0);
  const [data, setData] = useState(enHome);

  useEffect(() => {
    const checkLanguage = () => {
      const lang = localStorage.getItem("lang");
      if (lang === "es") {
        setData(esHome);
      } else if (lang === "ru") {
        setData(ruHome);
      } else if (lang === "hi") {
        setData(hiHome);
      } else {
        setData(enHome);
      }
    };

    checkLanguage();
    const intervalId = setInterval(checkLanguage, 2000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    device == "" && window.innerWidth < 600 ? setDevice("assets/images/computer.png") : setDevice("assets/images/mobile.png");
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setDevice("assets/images/computer.png");
      } else {
        setDevice("assets/images/mobile.png");
      }
    };
    
    const size = () => setWindowWidth(window.innerWidth);

    size();
    window.addEventListener("resize", size);

    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener("resize", size);
    };

  });

  return (
    <section className="relative bg-black text-white min-h-screen">
      {/* <Header /> */}
      <div className="py-4">
        <div className="container mx-auto text-center ">
          <h1 className="text-3xl lg:text-5xl font-bold mb-4 leading-tight pt-2 lg:pt-0 xl:pt-0">
            {data['main'][0]}<br /> {data['main'][1]}
          </h1>
          <p className="text-gray-300 mb-8">{data['sub']}</p>

          {/* <div className="flex justify-center space-x-4 mb-12">
            <button className="bg-white text-black font-medium py-1 px-6 rounded-md flex items-center space-x-2">
              <img draggable={false} src="assets/images/apple_app_store.png" width={26} height={26} alt="apple logo" />
              <span>App store</span>
            </button>
            <button className="bg-white text-black font-medium py-1 px-6 rounded-md flex items-center space-x-2">
              <img draggable={false} src="assets/images/google_play.png" width={26} height={26} alt="google play logo" />
              <span>Google play</span>
            </button>
          </div> */}
          <div className="flex justify-center space-x-4 mb-12">
            <button onClick={() => window.location.href = "/upload"} className="bg-white text-black font-medium py-2 px-6 rounded-md flex items-center space-x-2">
              <img draggable={false} src="assets/icons/image.png" width={26} height={26} alt="Upload logo" />
              <span className='text-base'>{data['upload']}</span>
            </button>
            <button onClick={() => window.location.href = "/dashboard"} className="bg-white text-black font-medium py-2 px-6 rounded-md flex items-center space-x-2">
              <img draggable={false} src="assets/icons/dashboard.svg" width={26} height={26} alt="Dashboard" />
              <span className='text-base'>{data['dashboard']}</span>
            </button>
          </div>
        </div>


        <div className="absolute hidden lg:block xl:block bottom-1/2 lg:left-8 xl:left-28 z-10 bg-gray-800 rounded-xl p-4 shadow-lg">
          <h2 className="text-lg font-medium mb-3 text-white">Translation</h2>
          <div className="grid grid-cols-2 gap-y-4 gap-x-3">
            <div className="flex items-center space-x-3">
              <div className="rounded-full overflow-hidden w-8 h-8">
          <img draggable={false} src="assets/images/english.png" alt="English" className="w-8 h-8 object-cover" />
              </div>
              <span className="text-white text-md">English</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="rounded-full overflow-hidden w-8 h-8">
          <img draggable={false} src="assets/images/hindi.png" alt="Hindi" className="w-8 h-8 object-cover" />
              </div>
              <span className="text-white text-md">हिन्दी</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="rounded-full overflow-hidden w-8 h-8">
          <img draggable={false} src="assets/images/spanish.png" alt="Spanish" className="w-8 h-8 object-cover" />
              </div>
              <span className="text-white text-md">Español</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="rounded-full overflow-hidden w-8 h-8">
          <img draggable={false} src="assets/images/russian.png" alt="Russian" className="w-8 h-8 object-cover" />
              </div>
              <span className="text-white text-md">русский</span>
            </div>
          </div>
        </div>

        {/* Etherea chat box */}
        <div className="absolute bottom-[12%] hidden lg:block xl:block bottom-1/2 lg:left-14 xl:left-28 z-10">
          <div className="relative bg-blue-500 rounded-md py-2 px-4 flex items-center">
            <div className="h-16 w-16 rounded-full overflow-hidden flex items-center justify-center">
              <img draggable={false} src="/assets/icons/Etherea.webp" width={32} height={32} alt="Etherea" />
            </div>
            <div className="ml-4">
              <p className="text-lg font-semibold">Etherea</p>
              <p className="text-base">{data['etherea']}</p>
            </div>
          </div>
        </div>

        {/* Lucy chat box */}
        <div className="absolute top-1/3 hidden lg:block xl:block bottom-1/2 lg:right-8 xl:right-28 z-10">
          <div className="relative bg-purple-500 rounded-md py-2 px-5 flex items-center">
            <div className="h-12 w-12 rounded-full overflow-hidden">
              <img draggable={false} src="/assets/icons/lucy.svg" width={56} height={56} alt="" />
            </div>
            <div className="ml-3">
              <p className="text-lg px-3 font-semibold">Lucy: Agent</p>
            </div>
            <div className="ml-3 bg-black w-9 h-9 rounded-full flex items-center justify-center">
              <span className="text-white">7</span>
            </div>
          </div>
        </div>

        {/* Akkil chat box */}
        <div className="absolute bottom-1/4 hidden lg:block xl:block bottom-1/2 lg:right-6 xl:right-20 z-10">
          <div className="relative bg-purple-500 rounded-md py-4 px-6 flex items-center">
            <div className="h-16 w-16 rounded-full overflow-hidden">
              <img draggable={false} src="/assets/icons/lucy.svg" width={64} height={64} alt="Akkil" />
            </div>
            <div className="ml-4">
              <p className="text-lg font-semibold">Lucy</p>
              <p className="text-base">{data['lucy']}</p>
            </div>
          </div>
        </div>


        {/* Device Image */}
        <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 z-0 ${windowWidth < 600 ? "w-[400px] lg:w-[420px] xl:w-[440px]" : "w-[338px] lg:w-[350px] xl:w-[380px]"}`}>
          <img draggable={false} alt="Device" width={6000} height={10000} src={device} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
