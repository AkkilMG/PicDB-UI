"use client";

import { useEffect, useState } from 'react';
// import ApexCharts from 'apexcharts';
// import {
//     UsersIcon,
//     TrashIcon,
//     DocumentTextIcon,
//     FolderIcon,
//   } from '@heroicons/react/24/outline';

export default function Statistics({text}: {text: any}) {

  const [data, setData] = useState<{ type: string; size: number }[]>([]);
  const [totalSize, setTotalSize] = useState(0);

  async function fetchData() {
    const storedLinks = (typeof window !== 'undefined') ? JSON.parse(localStorage.getItem('links') || '[]') : [];
    const typeSizeMap: { [key: string]: number } = {};
    storedLinks.forEach((file: { type: string; size: number }) => {
      const ext = file.type.split('/').pop() || 'unknown';
      if (!typeSizeMap[ext]) typeSizeMap[ext] = 0;
      typeSizeMap[ext] += file.size;
    });
    const result = Object.entries(typeSizeMap).map(([type, size]) => ({ type, size }));
    const totalSize = result.reduce((sum, item) => sum + item.size, 0);
    // console.log("Result: ", result);
    setData(result);
    setTotalSize(totalSize);
  }

  useEffect(() => {
      fetchData();
  }, [])

  const getChartOptions = (series: number[], labels: string[]) => ({
    series,
    labels,
    colors: ["#1C64F2", "#16BDCA", "#FDBA8C", "#E74694", "#A78BFA", "#FACC15"],
    chart: {
      height: 320,
      width: "100%",
      type: "donut",
    },
    stroke: {
      colors: ["transparent"],
    },
    plotOptions: {
      pie: {
        donut: {
          size: "80%",
          labels: {
            show: true,
            name: {
              show: true,
              offsetY: 20,
              fontFamily: "Inter, sans-serif",
            },
            value: {
              show: true,
              offsetY: -20,
              fontFamily: "Inter, sans-serif",
              formatter: (value: any) => `${parseFloat(value).toFixed(1)}%`,
            },
            total: {
              show: true,
              label: "Total",
              fontFamily: "Inter, sans-serif",
              formatter: () => {
                const totalSize = data.reduce((acc: any, item: any) => acc + item.size, 0);
                return formatFileSize(totalSize);
              },
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "bottom",
      fontFamily: "Inter, sans-serif",
    },
  });

  useEffect(() => {
    let chart: any = null;
    let isMounted = true;

    async function loadChart() {
      if (typeof window === 'undefined') return;
      const ApexCharts = (await import('apexcharts')).default;
      const chartContainer = document.getElementById("image-storage-chart");
      if (chartContainer && data.length > 0) {
        const totalSize = data.reduce((acc: any, item: any) => acc + item.size, 0);
        const labels = data.map((item: any) => `${item.type.toUpperCase()} (${formatFileSize(item.size)})`);
        const series = data.map((item: any) => +((item.size / totalSize) * 100).toFixed(2)); // in %
        chart = new ApexCharts(chartContainer, getChartOptions(series, labels));
        chart.render();
      }
    }

    loadChart();

    return () => {
      if (chart) {
        chart.destroy();
      }
      isMounted = false;
    };
  }, [data]);



  const formatFileSize = (size: number) => {
    if (size >= 1073741824) {
        return ((size / 1073741824).toFixed(2) + ' GB');
    } else if (size >= 1048576) {
        return ((size / 1048576).toFixed(2) + ' MB');
    } else if (size >= 1024) {
        return ((size / 1024).toFixed(2) + ' KB');
    } else {
        return (size + ' bytes');
    }
  };
  
  const costFileSize = (size: any) => {
    return Number((size / 1073741824)* 0.6).toFixed(4);
  };

  return (
    <aside className="hidden statistics xl:block w-80 p-6 m-4 shadow-lg " style={{boxShadow: "-4px 0 6px -1px rgba(0, 0, 0, 0.1)"}}>
      <h2 className="text-lg font-medium text-gray-800 mb-4">{text.statistics.title}</h2>

      {/* Chart */}
      <div className="w-full rounded-lg shadow-sm -mt-6">
        <div className="py-6" id="image-storage-chart"></div>
      </div>

      {/* Storage info */}
      <div className="flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-600">{text.statistics.used}</p>
        <p className="font-medium text-gray-800">{formatFileSize(totalSize)}</p>
      </div>
      <div>
        <p className="text-sm text-gray-600">{text.statistics.saved}</p>
        <p className="font-medium text-gray-800">{costFileSize(totalSize)}$</p>
      </div>
      </div>

      {/* Folders */}
      {/* <div className="grid grid-cols-2 gap-4 mt-4">
      <div className="bg-green-50 p-4 rounded-lg flex flex-col items-center justify-center">
        <FolderIcon className="h-6 w-6 text-yellow-500 mb-2" />
        <p className="font-medium text-gray-800 text-center">Fav Folders</p>
        <p className="text-sm text-gray-600">1654 files</p>
      </div>
      <div className="bg-green-50 p-4 rounded-lg flex flex-col items-center justify-center">
        <UsersIcon className="h-6 w-6 text-pink-500 mb-2" />
        <p className="font-medium text-gray-800 text-center">Shared Files</p>
        <p className="text-sm text-gray-600">1654 files</p>
      </div>
      <div className="bg-green-50 p-4 rounded-lg flex flex-col items-center justify-center">
        <DocumentTextIcon className="h-6 w-6 text-blue-500 mb-2" />
        <p className="font-medium text-gray-800 text-center">Notes</p>
        <p className="text-sm text-gray-600">1654 files</p>
      </div>
      <div className="bg-green-50 p-4 rounded-lg flex flex-col items-center justify-center">
        <TrashIcon className="h-6 w-6 text-green-500 mb-2" />
        <p className="font-medium text-gray-800 text-center">Trash</p>
        <p className="text-sm text-gray-600">1654 files</p>
      </div>
      </div> */}
    </aside>
  );
}