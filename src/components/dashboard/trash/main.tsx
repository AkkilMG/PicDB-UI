"use client";

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Sidenav from '../sidenav';
import UploadMobileResult from '../../upload/upload_result_mobile';
import UploadResult from '../../upload/upload_result';
import { enDashboard, esDashboard, hiDashboard, ruDashboard } from '@/config/text/dashboard.text';
import MainDashboardHeader from '../main/header';
import MainTrashList from './list';
import { useLanguage } from '@/contexts/language-context';
import { useMediaQuery } from '@/hooks/use-media-query';

const langTextMap = { en: enDashboard, es: esDashboard, ru: ruDashboard, hi: hiDashboard } as const;

export default function Trash() {
  const [link, setLink] = useState('');
  const [title, setTitle] = useState('');
  const [view, setView] = useState('');
  const [id, setId] = useState('');
  const [close, setClose] = useState(true);
  const [result, setResult] = useState<any[]>([]);
  const [fullResult, setFullResult] = useState<any[]>([]);
  const { lang } = useLanguage();
  const data = useMemo(() => langTextMap[lang] ?? enDashboard, [lang]);
  const isMobile = useMediaQuery(720);

  useEffect(() => {
    try {
      const trashLinks = JSON.parse(localStorage.getItem('trash') || '[]');
      setResult(trashLinks);
      setFullResult(trashLinks);
    } catch { /* ignore */ }
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
      localStorage.setItem('trash', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const searchForImage = useCallback((text: string) => {
    setResult(text ? fullResult.filter(item => item.title.toLowerCase().includes(text.toLowerCase())) : fullResult);
  }, [fullResult]);

  return (
    <>
    { (id && !close) && (isMobile
      ? <UploadMobileResult view={view} link={link} title={title} close={{ close, setClose: handleClose }} />
      : <UploadResult view={view} link={link} title={title} close={{ close, setClose: handleClose }} />
    )}
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      <Sidenav />
      <main className="flex-1 p-4 md:p-8">
        <MainDashboardHeader data={data} searchForImage={searchForImage} />
        <MainTrashList text={data} data={result} setId={setId} deleteList={deleteList} />
      </main>
    </div>
    </>
  );
}
