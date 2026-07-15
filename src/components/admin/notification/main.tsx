"use client";


import React, { useEffect, useState } from 'react';
import { enDashboard, esDashboard, hiDashboard, ruDashboard } from '@/config/text/dashboard.text';
import MainNotifyList from './notify';
import AdminSidenav from '../sidenav';
import { deleteNotification, getNotification } from '@/lib/notification';
import NotificationPopup from '@/components/pop/notification';
import { useLanguage } from '@/contexts/language-context';

const langTextMap = { en: enDashboard, es: esDashboard, ru: ruDashboard, hi: hiDashboard } as const;



export default function Notification() {
  const [policy, setPolicy] = useState<boolean>(true);
  const { lang } = useLanguage();
  const data = langTextMap[lang] ?? enDashboard;

  useEffect(() => {
      const policyAccepted = localStorage.getItem("policyAccepted") === "true";
      if (!policyAccepted) {
          setPolicy(false);
      } else setPolicy(true)
  }, []);
  

  const [result, setResult] = useState<any[]>([]);
  const [id, setId] = useState<string>('');

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

  const deleteList = async (id: string) => {
    try {
      var data = await deleteNotification(id);
      if (data.success) {
        alert("Notification deleted successfully");
      }else {
        console.log("Failed to fetch notifications:", data.message);
      }
    } catch (error) {
      console.log("Error fetching notifications:", error);
    }
  };


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
      <AdminSidenav />
      <main className="flex-1 p-4 md:p-8">
        <MainNotifyList data={result} deleteList={deleteList} handleNotificationClick={handleNotificationClick} />
      </main>
    </div>
    </>
  );
}