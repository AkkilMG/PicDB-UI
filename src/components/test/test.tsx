import React from 'react';
import Sidenav from './sidenav';
import Statistics from './statistics';
import MainDashboardHeader from './main/header';
import MainDashboardOverview from './main/overview';
import MainDashboardList from './main/list';



export default function TestPage() {
    return (
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidenav />

        {/* Main Content */}
        <main className="flex-1 p-8">
          <MainDashboardHeader />
          <MainDashboardList />
        </main>

        {/* Storage */}
        <Statistics />
      </div>
    );
}