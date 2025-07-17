"use client";


import React, { useEffect, useState } from 'react';
import { enReport, esReport, hiReport, ruReport } from '@/config/text/report.text';
import Sidenav from '@/components/dashboard/sidenav';
import FolderManagementPage from '@/components/dashboard/folder/main';


export default function Report() {
  const [policy, setPolicy] = useState<boolean>(true);
  const [data, setData] = useState(enReport);
  useEffect(() => {
    const checkLanguage = () => {
      const lang = localStorage.getItem("lang");
      if (lang === "es") {
        setData(esReport);
      } else if (lang === "ru") {
        setData(ruReport);
      } else if (lang === "hi") {
        setData(hiReport);
      } else {
        setData(enReport);
      }
    };

    checkLanguage();
    const intervalId = setInterval(checkLanguage, 2000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
      const policyAccepted = localStorage.getItem("policyAccepted") === "true";
      if (!policyAccepted) {
          setPolicy(false);
      } else setPolicy(true)
  }, []);
  
  return (
    <>
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      <Sidenav />
      <main className="flex-1 p-4 md:p-8">
        <FolderManagementPage />
      </main>
    </div>
    </>
  );
}