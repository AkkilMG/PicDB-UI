"use client";


import React, { useEffect, useState } from 'react';
import AdminSidenav from '../sidenav';
import { enDashboard, esDashboard, hiDashboard, ruDashboard } from '@/config/text/dashboard.text';


export default function Analysis() {
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