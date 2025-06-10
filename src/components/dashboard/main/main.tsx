"use client";

import React, { useEffect, useState } from 'react';
import Sidenav from '../sidenav';
import MainDashboardHeader from './header';
import MainDashboardList from './list';
import UploadMobileResult from '../../upload/upload_result_mobile';
import UploadResult from '../../upload/upload_result';
import { enDashboard, esDashboard, hiDashboard, ruDashboard } from '@/config/text/dashboard.text';
import Statistics from './statistics';
import Joyride, { CallBackProps, STATUS } from "react-joyride";
import { FaLightbulb } from "react-icons/fa6";
import { dashboardSteps } from '@/config/steps.tutorial';

export default function Dashboard() {
  const [link, setLink] = useState('');
  const [title, setTitle] = useState('');
  const [view, setView] = useState('');
  const [id, setId] = useState('');
  const [close, setClose] = useState(true);
  const [uploadComponent, setUploadComponent] = useState<any>(<div></div>);
  const [result, setResult] = useState<any[]>([]);
  const [fullResult, setFullResult] = useState<any[]>([]);
  const [policy, setPolicy] = useState(true);
  const [data, setData] = useState(enDashboard);

  const [runTutorial, setRunTutorial] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const [drawerOpen, setDrawerOpen] = useState(true);

  useEffect(() => {
    const checkLanguage = () => {
      const lang = localStorage.getItem("lang");
      if (lang === "es") setData(esDashboard);
      else if (lang === "ru") setData(ruDashboard);
      else if (lang === "hi") setData(hiDashboard);
      else setData(enDashboard);
    };
    checkLanguage();
    const intervalId = setInterval(checkLanguage, 2000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const policyAccepted = localStorage.getItem("policyAccepted") === "true";
    setPolicy(policyAccepted);
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
    const storedLinks = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('links') || '[]') : [];
    setResult(storedLinks);
    setFullResult(storedLinks);
  }, []);

  useEffect(() => {
    if (id) searchById(id);
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
    return () => window.removeEventListener('resize', handleResize);
  }, [view, link, title, close]);

  const deleteList = (id: string) => {
    const updatedResult = result.filter(item => item.id !== id);
    setResult(updatedResult);
    const updatedFullResult = fullResult.filter(item => item.id !== id);
    setFullResult(updatedFullResult);
    const trash = localStorage.getItem('trash');
    const updatedTrash = trash ? [...JSON.parse(trash), ...fullResult.filter(item => item.id === id)] : fullResult.filter(item => item.id === id);
    localStorage.setItem('trash', JSON.stringify(updatedTrash));
    localStorage.setItem('links', JSON.stringify(updatedFullResult));
  };

  const favoriteList = (id: string) => {
    const updatedResult = result.map(item => item.id === id ? { ...item, favorite: !item.favorite } : item);
    const updatedFullResult = fullResult.map(item => item.id === id ? { ...item, favorite: !item.favorite } : item);
    setResult(updatedResult);
    setFullResult(updatedFullResult);
    localStorage.setItem('links', JSON.stringify(updatedFullResult));
  };

  const searchForImage = (text: string) => {
    setResult(text ? fullResult.filter(item => item.title.toLowerCase().includes(text.toLowerCase())) : fullResult);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const tutorial = localStorage.getItem("tutorial");
    if (tutorial) {
      try {
        const tutorialObj = JSON.parse(tutorial);
        if (!tutorialObj.dashboard) {
          setRunTutorial(true);
          localStorage.setItem("tutorial", JSON.stringify({ ...tutorialObj, dashboard: true }));
        }
      } catch (e) {
        console.log("Error parsing tutorial data:", e);
      }
    } else {
      setRunTutorial(true);
      localStorage.setItem("tutorial", JSON.stringify({ upload: false, dashboard: false, trash: false, report: false }));
    }
  }, []);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, index, type }: any = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRunTutorial(false);
      setStepIndex(0);
    } else {
      setStepIndex(index + (type === "step:after" ? 1 : 0));
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDrawerOpen(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (drawerOpen) {
      const timer = setTimeout(() => {
        setDrawerOpen(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [drawerOpen]);

  return (
    <>
      {isClient && (
        <Joyride steps={dashboardSteps} continuous showSkipButton scrollToFirstStep showProgress run={runTutorial} 
          stepIndex={stepIndex} callback={handleJoyrideCallback} styles={{ options: { primaryColor: "#3b82f6", zIndex: 10000 } }} />
      )}

      {!drawerOpen && (
        <div className="fixed -mr-2 bottom-6 right-2 sm:bottom-10 sm:right-2 z-40 cursor-pointer group" onClick={() => setDrawerOpen(true)}>
          <div className="w-5 h-20 bg-yellow-500 rounded-l-full shadow-lg flex items-center justify-center hover:bg-yellow-600 transition-colors">
            <FaLightbulb className="text-white w-4 h-4 group-hover:animate-pulse" />
          </div>
        </div>
      )}

      <div className={`fixed bottom-6 transition-all duration-500 ease-in-out z-40 ${ drawerOpen ? 'right-6 sm:right-10' : '-right-full'}`}>
        <button className="bg-yellow-500 border-yellow-500 text-white px-4 py-4 rounded-full shadow-xl shadow-yellow-400/60 flex items-center group" onClick={() => setRunTutorial(true)}>
          <FaLightbulb className="w-5 h-5 inline-block" />
          <span className="hidden sm:block ml-2 transition-opacity duration-200 font-semibold whitespace-nowrap">
            Tutorial
          </span>
        </button>
      </div>

      {(id && !close) && uploadComponent}

      <div className="flex flex-col md:flex-row h-screen bg-gray-50">
        <Sidenav />
        <main className="flex-1 p-4 md:p-8">
          <MainDashboardHeader data={data} searchForImage={searchForImage} />
          <MainDashboardList setStepIndex={setStepIndex} text={data} data={result} 
            setId={setId} deleteList={deleteList} favoriteList={favoriteList}/>
        </main>
        <Statistics text={data} />
      </div>
    </>
  );
}
