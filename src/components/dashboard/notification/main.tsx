"use client";


import React, { useEffect, useState } from 'react';
import Sidenav from '../sidenav';
import { enDashboard, esDashboard, hiDashboard, ruDashboard } from '@/config/text/dashboard.text';
import MainNotifyList from './notify';
import { getNotification } from '@/lib/notification';
import NotificationPopup from '@/components/pop/notification';



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
        <MainNotifyList data={result} handleNotificationClick={handleNotificationClick} />
      </main>
    </div>
    </>
  );
}