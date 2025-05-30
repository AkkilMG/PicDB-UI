"use client";


import React, { useEffect, useState } from 'react';
import { enDashboard, esDashboard, hiDashboard, ruDashboard } from '@/config/text/dashboard.text';
import AdminSidenav from '../sidenav';


export default function AdminNewNotification() {
  return (
    <>
    <div className="flex h-screen bg-gray-50">
        <AdminSidenav />
        <main className="flex-1 p-8">
            
        </main>
    </div>
    </>
  );
}