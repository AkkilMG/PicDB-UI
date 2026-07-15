"use client";


import React, { useEffect, useState } from 'react';
import { enReport, esReport, hiReport, ruReport } from '@/config/text/report.text';
import Sidenav from '@/components/dashboard/sidenav';
import FolderManagementPage from '@/components/dashboard/folder/main';
import { useLanguage } from '@/contexts/language-context';

const langTextMap = { en: enReport, es: esReport, ru: ruReport, hi: hiReport } as const;


export default function Report() {
  const [policy, setPolicy] = useState<boolean>(true);
  const { lang } = useLanguage();
  const data = langTextMap[lang] ?? enReport;

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