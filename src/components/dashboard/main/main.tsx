"use client";


import React, { useEffect, useState } from 'react';
import Sidenav from '../sidenav';
import MainDashboardHeader from './header';
// import MainDashboardOverview from './main/overview';
import MainDashboardList from './list';
import UploadMobileResult from '../../upload/upload_result_mobile';
import UploadResult from '../../upload/upload_result';
import { enDashboard, esDashboard, hiDashboard, ruDashboard } from '@/config/text/dashboard.text';
import Statistics from './statistics';
import MainDashboardFolders from './folders';



export default function Dashboard() {
  const [link, setLink] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [view, setView] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [close, setClose] = useState<boolean>(true);
  const [uploadComponent, setUploadComponent] = useState<any>(<div></div>);
  const [result, setResult] = useState<any[]>([]);
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
  
  const searchById = (id: String) => {
      const found = result.find((item: any) => item.id === id.toString());
      if (found) {
          setLink(found.link);
          setTitle(found.title);
          setView(found.view);
          setClose(false);
      }
  };

  useEffect(() => {
      const storedLinks = (typeof window !== 'undefined') ? JSON.parse(localStorage.getItem('links') || '[]') : [];
      setResult(storedLinks);
  }, [])

  useEffect(() => {
      if (id) {
          searchById(id);
      }
  }, [id]);

  useEffect(() => {
      if (close) {
          setId('');
          setLink('');
          setTitle('');
          setView('');
      }
  }, [close, view, link, title]);
  
  useEffect(() => {
      const handleResize = () => {
          if (window.innerWidth <= 720) {
              setUploadComponent(<UploadMobileResult view={view} link={link} title={title} close={{ close: close, setClose }} />);
          } else {
              setUploadComponent(<UploadResult view={view} link={link} title={title} close={{ close: close, setClose }} />);
          }
      };
  
      handleResize();
      window.addEventListener('resize', handleResize);
  
      return () => {
          window.removeEventListener('resize', handleResize);
      };
  }, [view, link, title, close]);

  const deleteList = (id: string) => {
    const updatedResult = result.filter(item => item.id !== id);
    setResult(updatedResult);
    const trash = localStorage.getItem('trash')
    const updatedTrash = trash ? [...JSON.parse(trash), ...updatedResult] : updatedResult;
    localStorage.setItem('trash', JSON.stringify(updatedTrash));
    localStorage.setItem('links', JSON.stringify(updatedResult));
  };

  const favoriteList = (id: string) => {
    const updatedResult = result.map(item => {
      if (item.id === id) {
        return { ...item, favorite: !item.favorite };
      }
      return item;
    });
    setResult(updatedResult);
    localStorage.setItem('links', JSON.stringify(updatedResult));
  }


  return (
    <>
    { (id && !close) && (uploadComponent)}
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      <Sidenav />
      <main className="flex-1 p-4 md:p-8">
        <MainDashboardHeader />
        <MainDashboardList data={result} setId={setId} deleteList={deleteList} favoriteList={favoriteList} />
      </main>
      <Statistics />
    </div>

    </>
  );
}