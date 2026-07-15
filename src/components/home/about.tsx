"use client";

import { enHome, esHome, hiHome, ruHome } from "@/config/text/home.text";
import React from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";

const langTextMap = { en: enHome, es: esHome, ru: ruHome, hi: hiHome } as const;

export default function AboutSection() {
  const { lang } = useLanguage();
  const data = (langTextMap[lang] ?? enHome).sections;
  return (
    <div className="relative min-h-screen my-4 bg-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          <div className="relative lg:col-start-1">
            <h2 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-8 leading-tight">
              {data[0]["title"][0]}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                {" "}
                {data[0]["title"][1]}
              </span>
              <br />
              <span className="text-gray-900"> {data[0]["title"][2]}</span>
            </h2>
            <p className="mt-6 text-xl text-gray-600 leading-relaxed">
              {data[0]["description"]}
            </p>
          </div>
          <div className="mt-12 pt-12 relative lg:mt-0 lg:col-start-2">
            <div className="shadow-2xl rounded-2xl overflow-hidden ">
              <Image
                src="/dashboard.png"
                alt="Dashboard"
                width={800}
                height={600}
                className="object-cover object-center w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
        <div className="hidden sm:block lg:grid lg:grid-cols-2 lg:gap-16">
          <div className="pt-2 relative lg:mt-0 lg:col-start-1">
            <div className="shadow-2xl rounded-xl overflow-hidden w-48 h-98 mx-auto">
              <Image
                src="/dashboard-mobile.png"
                alt="Dashboard Mobile"
                width={192}
                height={392}
                className="object-cover object-center w-full h-full"
                loading="lazy"
              />
            </div>
          </div>
          <div className="relative lg:col-start-2">
            <h2 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-8 leading-tight">
              {data[1]["title"][0]}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-600">
                {" "}
                {data[1]["title"][1]}
              </span>
              <br />
              <span className="text-gray-900"> {data[1]["title"][2]}</span>
            </h2>
            <p className="mt-6 text-xl text-gray-600 leading-relaxed">
              {data[1]["description"]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
