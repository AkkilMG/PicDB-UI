"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { enHome, esHome, ruHome, hiHome } from "../../config/text/home.text";
import { HeroStarRating } from "../testimonials/star";
import { useLanguage } from "@/contexts/language-context";

const langTextMap = { en: enHome, es: esHome, ru: ruHome, hi: hiHome } as const;

export default function HeroSection({
  testimonialsData,
}: {
  testimonialsData: any;
}) {
  const [device, setDevice] = useState("/assets/images/computer.png");
  const [windowWidth, setWindowWidth] = useState(0);
  const { lang } = useLanguage();
  const data = langTextMap[lang] ?? enHome;

  useEffect(() => {
    const handleResize = () => {
      setDevice(
        window.innerWidth < 600
          ? "/assets/images/computer.png"
          : "/assets/images/mobile.png"
      );
      setWindowWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="relative bg-black text-white min-h-screen overflow-hidden">
      <div className="py-4">
        <div className="container mx-auto text-center ">
          <h1 className="text-3xl lg:text-5xl font-bold mb-4 leading-tight pt-2 lg:pt-0 xl:pt-0">
            {data["main"][0]}
            <br /> {data["main"][1]}
          </h1>
          <p className="text-gray-300 mb-8">{data["sub"]}</p>

          <div className="flex justify-center space-x-4 mb-12">
            <Link
              href="/upload"
              className="bg-white text-black font-medium py-2 px-6 rounded-md flex items-center space-x-2"
            >
              <Image
                draggable={false}
                src="/assets/icons/image.png"
                width={26}
                height={26}
                alt="Upload logo"
              />
              <span className="text-base">{data["upload"]}</span>
            </Link>
            <Link
              href="/dashboard"
              className="bg-white text-black font-medium py-2 px-6 rounded-md flex items-center space-x-2"
            >
              <Image
                draggable={false}
                src="/assets/icons/dashboard.svg"
                width={26}
                height={26}
                alt="Dashboard"
              />
              <span className="text-base">{data["dashboard"]}</span>
            </Link>
          </div>
        </div>

        <div className="absolute hidden lg:block xl:block bottom-1/2 lg:left-8 xl:left-28 z-10 bg-gray-800 rounded-xl p-4 shadow-lg">
          <h2 className="text-lg font-medium mb-3 text-white">Translation</h2>
          <div className="grid grid-cols-2 gap-y-4 gap-x-3">
            <div
              className={`flex items-center p-2 space-x-3 ${
                lang === "en" && "bg-gray-700 rounded-xl"
              }`}
            >
              <div className="rounded-full overflow-hidden w-8 h-8">
                <Image
                  draggable={false}
                  src="/assets/images/english.png"
                  alt="English"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-cover"
                />
              </div>
              <span className="text-white text-md">English</span>
            </div>
            <div
              className={`flex items-center p-2 space-x-3 ${
                lang === "es" && "bg-gray-700 rounded-xl"
              }`}
            >
              <div className="rounded-full overflow-hidden w-8 h-8">
                <Image
                  draggable={false}
                  src="/assets/images/spanish.png"
                  alt="Spanish"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-cover"
                />
              </div>
              <span className="text-white text-md">Español</span>
            </div>
            <div
              className={`flex items-center p-2 space-x-3 ${
                lang === "ru" && "bg-gray-700 rounded-xl"
              }`}
            >
              <div className="rounded-full overflow-hidden w-8 h-8">
                <Image
                  draggable={false}
                  src="/assets/images/russian.png"
                  alt="Russian"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-cover"
                />
              </div>
              <span className="text-white text-md">русский</span>
            </div>
            <div
              className={`flex items-center p-2 space-x-3 ${
                lang === "hi" && "bg-gray-700 rounded-xl"
              }`}
            >
              <div className="rounded-full overflow-hidden w-8 h-8">
                <Image
                  draggable={false}
                  src="/assets/images/hindi.png"
                  alt="Hindi"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-cover"
                />
              </div>
              <span className="text-white text-md">हिन्दी</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-[12%] hidden lg:block xl:block lg:left-14 xl:left-28 z-10">
          <div className="relative bg-blue-500 rounded-md py-2 px-4 flex items-center">
            <div className="h-16 w-16 rounded-full overflow-hidden flex items-center justify-center">
              <Image
                draggable={false}
                src="/assets/icons/Etherea.webp"
                width={32}
                height={32}
                alt="Etherea"
              />
            </div>
            <div className="ml-4">
              <p className="text-lg font-semibold">Etherea</p>
              <p className="text-base">{data["etherea"]}</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-1/4 hidden lg:block xl:block lg:right-6 xl:right-20 z-10">
          <div className="min-w-[300px] max-w-xs flex-shrink-0 -p-2">
            <HeroTestimonialCard testimonial={testimonialsData[1]} />
          </div>
        </div>

        {/* Device Image */}
        <div
          className={`absolute -mt-[62vh] bottom-0 left-1/2 transform -translate-x-1/2 z-0 ${
            windowWidth < 600
              ? "w-[400px] lg:w-[420px] xl:w-[440px]"
              : "w-[338px] lg:w-[350px] xl:w-[380px]"
          }`}
        >
          <Image
            draggable={false}
            alt="Device"
            width={500}
            height={278}
            src={device}
            priority
          />
        </div>
      </div>
    </section>
  );
}

function HeroTestimonialCard({ testimonial }: { testimonial: any }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:-rotate-1 transition-all duration-300 ease-out cursor-pointer group z-50 relative">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center">
          <span className="text-black text-lg font-semibold">
            {testimonial.name}
          </span>
        </div>
      </div>
      <div className="mb-1 flex justify-start">
        <HeroStarRating rating={testimonial.rating} />
      </div>

      <blockquote className="text-gray-700 text-sm leading-relaxed mb-1 group-hover:text-gray-800 transition-colors duration-200">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
    </div>
  );
}
