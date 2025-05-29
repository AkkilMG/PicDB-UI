"use client";


import React, { useEffect, useState } from 'react';
import Sidenav from '../sidenav';
import UploadMobileResult from '../../upload/upload_result_mobile';
import UploadResult from '../../upload/upload_result';
import { enDashboard, esDashboard, hiDashboard, ruDashboard } from '@/config/text/dashboard.text';
import MainDashboardHeader from '../main/header';
import MainDashboardList from '../main/list';
import Statistics from '../main/statistics';
import MainNotifyList from './notify';



export default function Notification() {
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
  

  const [result, setResult] = useState<any[]>([]);
  const [id, setId] = useState<string>('');

  const deleteList = (id: string) => {
    setResult(result.filter(item => item.id !== id));
  };
  
  return (
    <>
    <div className="flex h-screen bg-gray-50">
      <Sidenav />
      <main className="flex-1 p-8">
        <MainNotifyList data={result} setId={setId} deleteList={deleteList} />
      </main>
    </div>
    </>
  );
}