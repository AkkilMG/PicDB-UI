"use client";


import React, { useEffect, useState } from 'react';
import Sidenav from '../sidenav';
import MainDashboardHeader from './header';
import MainDashboardList from './list';
import UploadMobileResult from '../../upload/upload_result_mobile';
import UploadResult from '../../upload/upload_result';
import { enDashboard, esDashboard, hiDashboard, ruDashboard } from '@/config/text/dashboard.text';
import Statistics from './statistics';
// import MainDashboardFolders from './folders';

import Joyride, { CallBackProps, STATUS } from "react-joyride";
import { FaLightbulb } from "react-icons/fa6";
import { dashboardSteps } from '@/config/steps.tutorial';


export default function Dashboard() {
  const [link, setLink] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [view, setView] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [close, setClose] = useState<boolean>(true);
  const [uploadComponent, setUploadComponent] = useState<any>(<div></div>);
  const [result, setResult] = useState<any[]>([]);
  const [fullResult, setFullResult] = useState<any[]>([]);
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
      setFullResult(storedLinks);
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
    const updatedFullResult = fullResult.filter(item => item.id !== id);
    setFullResult(updatedFullResult);
    const trash = localStorage.getItem('trash')
    const updatedTrash = trash ? [...JSON.parse(trash), ...fullResult.filter(item => item.id === id)] : fullResult.filter(item => item.id === id);
    localStorage.setItem('trash', JSON.stringify(updatedTrash));
    localStorage.setItem('links', JSON.stringify(updatedFullResult));
  };

  const favoriteList = (id: string) => {
    const updatedResult = result.map(item => {
      if (item.id === id) {
        return { ...item, favorite: !item.favorite };
      }
      return item;
    });
    setResult(updatedResult);
    const updatedFullResult = fullResult.map(item => {
      if (item.id === id) {
        return { ...item, favorite: !item.favorite };
      }
      return item;
    });
    setFullResult(updatedFullResult);
    localStorage.setItem('links', JSON.stringify(updatedFullResult));
  }

  const searchForImage = (text: string) => {
    if (text) {
      const filteredResult = fullResult.filter(item => item.title.toLowerCase().includes(text.toLowerCase()));
      setResult(filteredResult);
    } else {
      setResult(fullResult);
    }
  }

  const [runTutorial, setRunTutorial] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

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
        localStorage.setItem("tutorial", JSON.stringify({upload: false, dashboard: false, trash: false, report: false}));
    }
  }, []);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, index, type }: any = data;
    const finished = [STATUS.FINISHED, STATUS.SKIPPED].includes(status);
    if (finished) {
        setRunTutorial(false);
        setStepIndex(0);
    } else {
        setStepIndex(index + (type === "step:after" ? 1 : 0));
    }
  };


  return (
    <>
    {isClient && (
        <Joyride steps={dashboardSteps} continuous showSkipButton scrollToFirstStep showProgress run={runTutorial}
            stepIndex={stepIndex} callback={handleJoyrideCallback} styles={{ options: { primaryColor: "#3b82f6", zIndex: 10000 } }}
        />
    )}
    
    <button className="fixed bottom-10 right-10 bg-yellow-500 border-yellow-500 text-white px-4 py-4 rounded-full shadow-xl shadow-yellow-400/60 z-40 flex items-center group"
        onClick={() => setRunTutorial(true)}>
        <FaLightbulb className="w-5 h-5 inline-block" />
        <span className="ml-2 transition-opacity duration-200  font-semibold whitespace-nowrap">
            Tutorial
        </span>
    </button>
    

    { (id && !close) && (uploadComponent)}
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      <Sidenav />
      <main className="flex-1 p-4 md:p-8">
        <MainDashboardHeader data={data} searchForImage={searchForImage} />
        <MainDashboardList setStepIndex={setStepIndex} text={data} data={result} setId={setId} deleteList={deleteList} favoriteList={favoriteList} />
      </main>
      <Statistics text={data} />
    </div>

    </>
  );
}