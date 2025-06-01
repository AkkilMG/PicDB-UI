"use client";


import React, { useEffect, useState } from 'react';
import { enDashboard, esDashboard, hiDashboard, ruDashboard } from '@/config/text/dashboard.text';
import AdminSidenav from '../sidenav';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ReportsList } from './list';
import { Button } from '@/components/ui/button';


export default function AdminReport() {
  return (
    <>
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
        <AdminSidenav />
        <main className="flex-1 p-4 md:p-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>All reported links from users!</CardDescription>
            </CardHeader>
            <CardContent>
              <ReportsList />
            </CardContent>
          </Card>
        </main>
    </div>
    </>
  );
}