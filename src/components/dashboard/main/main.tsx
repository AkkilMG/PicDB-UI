"use client";

import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import MainDashboardFolders from './folders';
import { useLanguage } from '@/contexts/language-context';
import { useMediaQuery } from '@/hooks/use-media-query';

const langTextMap = { en: enDashboard, es: esDashboard, ru: ruDashboard, hi: hiDashboard } as const;

export default function Dashboard() {
  const [link, setLink] = useState('');
  const [title, setTitle] = useState('');
  const [view, setView] = useState('');
  const [id, setId] = useState('');
  const [close, setClose] = useState(true);
  const [result, setResult] = useState<any[]>([]);
  const [fullResult, setFullResult] = useState<any[]>([]);
  const [policy, setPolicy] = useState(true);
  const { lang } = useLanguage();
  const data = useMemo(() => langTextMap[lang] ?? enDashboard, [lang]);
  const isMobile = useMediaQuery(720);

  const [runTutorial, setRunTutorial] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(true);

  useEffect(() => {
    const policyAccepted = localStorage.getItem("policyAccepted") === "true";
    setPolicy(policyAccepted);
    try {
      const storedLinks = JSON.parse(localStorage.getItem('links') || '[]');
      setResult(storedLinks);
      setFullResult(storedLinks);
    } catch { /* ignore */ }
    setIsClient(true);
    const tutorial = localStorage.getItem("tutorial");
    if (tutorial) {
      try {
        const tutorialObj = JSON.parse(tutorial);
        if (!tutorialObj.dashboard) {
          setRunTutorial(true);
          localStorage.setItem("tutorial", JSON.stringify({ ...tutorialObj, dashboard: true }));
        }
      } catch { /* ignore */ }
    } else {
      setRunTutorial(true);
      localStorage.setItem("tutorial", JSON.stringify({ upload: false, dashboard: false, trash: false, report: false }));
    }
  }, []);

  useEffect(() => {
    if (!id || close) return;
    const found = result.find((item: any) => item.id === id);
    if (found) {
      setLink(found.link);
      setTitle(found.title);
      setView(found.view);
      setClose(false);
    }
  }, [id, result, close]);

  const handleClose = useCallback(() => {
    setClose(true);
    setId('');
    setLink('');
    setTitle('');
    setView('');
  }, []);

  const deleteList = useCallback((id: string) => {
    setResult(prev => {
      const updated = prev.filter(item => item.id !== id);
      setFullResult(updated);
      const trash = localStorage.getItem('trash');
      const trashedItems = prev.filter(item => item.id === id);
      const updatedTrash = trash ? [...JSON.parse(trash), ...trashedItems] : trashedItems;
      localStorage.setItem('trash', JSON.stringify(updatedTrash));
      localStorage.setItem('links', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const favoriteList = useCallback((id: string) => {
    setResult(prev => {
      const updated = prev.map(item => item.id === id ? { ...item, favorite: !item.favorite } : item);
      setFullResult(updated);
      localStorage.setItem('links', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const searchForImage = useCallback((text: string) => {
    setResult(text ? fullResult.filter(item => item.title.toLowerCase().includes(text.toLowerCase())) : fullResult);
  }, [fullResult]);

  const handleJoyrideCallback = useCallback((data: CallBackProps) => {
    const { status, index, type }: any = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRunTutorial(false);
      setStepIndex(0);
    } else {
      setStepIndex(index + (type === "step:after" ? 1 : 0));
    }
  }, []);

  useEffect(() => {
    if (drawerOpen) {
      const timer = setTimeout(() => setDrawerOpen(false), 10000);
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
        <div className="fixed -mr-2 bottom-6 right-2 sm:bottom-6 sm:right-2 z-40 cursor-pointer group" onClick={() => setDrawerOpen(true)}>
          <div className="w-7 h-16 bg-yellow-500 rounded-l-full shadow-lg flex items-center justify-center hover:bg-yellow-600 transition-colors">
            <FaLightbulb className="text-white w-5 h-5 pl-1 group-hover:animate-pulse" />
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

      {(id && !close) && (isMobile 
        ? <UploadMobileResult view={view} link={link} title={title} close={{ close, setClose: handleClose }} />
        : <UploadResult view={view} link={link} title={title} close={{ close, setClose: handleClose }} />
      )}

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
