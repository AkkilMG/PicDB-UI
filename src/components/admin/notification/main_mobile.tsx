"use client";


import React, { useEffect, useState } from 'react';
import { enDashboard, esDashboard, hiDashboard, ruDashboard } from '@/config/text/dashboard.text';
import ReportForm from './form';
import AdminSidenav from '../sidenav';


export default function MobileReport() {
  const [policy, setPolicy] = useState<boolean>(true);
  const [data, setData] = useState(enDashboard);
  useEffect(() => {
    const checkLanguage = () => {
      const lang = localStorage.getItem("lang");
      if (lang === "es") {
        setData(esDashboard);
      } else if (lang === "ru") {
        setData(ruDashboard);
      } else if (lang === "hi") {
        setData(hiDashboard);
      } else {
        setData(enDashboard);
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
  
  const [id, setId] = useState<string>('');
 
  return (
    <>
    {!id && <></> }
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      <AdminSidenav />
      <main className="flex-1 p-4 md:p-8">
        <ReportForm />
      </main>
    </div>
    </>
  );
}