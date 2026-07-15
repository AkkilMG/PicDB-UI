"use client";


import React, { useEffect, useState } from 'react';
import Sidenav from '../sidenav';
import { enNotification, esNotification, hiNotification, ruNotification } from '@/config/text/notification.text';
import MainNotifyList from './notify';
import { getNotification } from '@/lib/notification';
import NotificationPopup from '@/components/pop/notification';
import { useLanguage } from '@/contexts/language-context';

const langTextMap = { en: enNotification, es: esNotification, ru: ruNotification, hi: hiNotification } as const;



export default function Notification() {
  const [policy, setPolicy] = useState<boolean>(true);
  const { lang } = useLanguage();
  const data = langTextMap[lang] ?? enNotification;

  useEffect(() => {
      const policyAccepted = localStorage.getItem("policyAccepted") === "true";
      if (!policyAccepted) {
          setPolicy(false);
      } else setPolicy(true)
  }, []);
  
  const [result, setResult] = useState<any[]>([]);
  
  async function fetchResult() {
    try {
      var data = await getNotification();
      if (data.success) {
        setResult(data.notifications);
      }else {
        console.log("Failed to fetch notifications:", data.message);
      }
    } catch (error) {
      console.log("Error fetching notifications:", error);
    }
  }
  useEffect(() => {
    fetchResult();
  }, []);
  
  
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationData, setNotificationData] = useState<any>({});
  const handleNotificationClick = (id: string) => {
    const notification = result.find((notify) => notify._id === id);
    if (!notification) {
      console.log("Notification not found for ID:", id);
      return;
    }
    setNotificationData(notification);
    setNotificationOpen(true)
  }
  const handleNotificationClose = () => {
    setNotificationOpen(false)
  }
  return (
    <>
    {notificationData && notificationOpen && <NotificationPopup isOpen={notificationOpen} onClose={handleNotificationClose} data={notificationData} /> }
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      <Sidenav />
      <main className="flex-1 p-4 md:p-8">
        <MainNotifyList text={data} data={result} handleNotificationClick={handleNotificationClick} />
      </main>
    </div>
    </>
  );
}