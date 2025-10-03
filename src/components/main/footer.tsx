"use client";
import { enFooter, esFooter, hiFooter, ruFooter } from '@/config/text/footer.text';
import { useState, useEffect } from 'react';


import React from 'react';

const Footer = () => {
  const [data, setData] = useState(enFooter);
  useEffect(() => {
    const checkLanguage = () => {
      const lang = localStorage.getItem("lang");
      if (lang === "es") {
        setData(esFooter);
      } else if (lang === "ru") {
        setData(ruFooter);
      } else if (lang === "hi") {
        setData(hiFooter);
      } else {
        setData(enFooter);
      }
    };

    checkLanguage();
    const intervalId = setInterval(checkLanguage, 2000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between mb-10 gap-8 lg:gap-0">
          {/* Footer Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold mb-3 text-gray-100">{data.services.title}</h4>
              <ul>
                {data.services.available.map((service: any, index: number) => (
                  <li key={index} className="mb-1 text-gray-300 text-sm">
                    <a draggable={false} href={service.link}>{service.title} </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-gray-100">{data.insights.title}</h4>
              <ul>
                {data.insights.available.map((insight: any, index: number) => (
                  <li key={index} className="mb-1 text-gray-300 text-sm">
                    <a draggable={false} href={insight.link}>{insight.title}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-gray-100">{data.resources.title}</h4>
              <ul>
                {data.resources.available.map((resource: any, index: number) => (
                  <li key={index} className="mb-1 text-gray-300 text-sm">
                    <a draggable={false} href={resource.link}>{resource.title}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-gray-100">{data.legals.title}</h4>
              <ul>
                {data.legals.available.map((legal: any, index: number) => (
                  <li key={index} className="mb-1 text-gray-300 text-sm">
                    <a draggable={false} href={legal.link}>{legal.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tweet Box */}
          <div className="bg-gray-800 rounded-xl p-4 shadow-lg max-w-full lg:w-[300px]">
            <div className="flex space-x-3 mb-2">
              <div className="h-8 w-8 rounded-full overflow-hidden bg-white my-2">
                <img
                  src="/assets/logo/company.png"
                  alt="Arkynox profile"
                  className="w-full h-full p-2 object-cover"
                />
              </div>
              <div>
                <p className="font-medium">Arkynox</p>
                <p className="text-gray-300 text-xs">@Arkynox</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              We're excited to announce a new update that increases upload limits and improves the user experience of PicDB!
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 flex items-center">
            <img
              src="/assets/logo/PicDB.png"
              width={20}
              height={20}
              alt="logo"
              className="rounded-full overflow-hidden bg-white"
            />
            <span className="ml-2 text-sm">PicDB, A product of Arkynox - 2024-25.</span>
          </div>

          <div className="flex space-x-4">
            <a draggable={false} href='https://www.linkedin.com/company/Arkynox/' target='_blank' className="h-8 w-8 bg-gray-100 hover:bg-blue-300 rounded-full flex items-center justify-center">
              <img draggable={false} src="/assets/icons/linkedin.png" width={24} height={24} alt="instagram" />
            </a>
            <a draggable={false} href='https://github.com/Arkynox' target='_blank' className="h-8 w-8 bg-gray-100 hover:bg-teal-200 rounded-full flex items-center justify-center">
              <img draggable={false} src="/assets/icons/github.png" width={24} height={24} alt="facebook" />
            </a>
            <a draggable={false} href='https://www.instagram.com/heimancreation/' target='_blank' className="h-8 w-8 bg-gray-100 hover:bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-full flex items-center justify-center">
              <img draggable={false} src="/assets/icons/instagram.png" width={24} height={24} alt="twitter" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
