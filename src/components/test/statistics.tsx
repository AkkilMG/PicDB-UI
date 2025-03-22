"use client";

import Image from 'next/image';
import { useEffect } from 'react';
import ApexCharts from 'apexcharts';
import {
    UsersIcon,
    TrashIcon,
    DocumentTextIcon,
    FolderIcon,
  } from '@heroicons/react/24/outline';

export default function Statistics() {

  const getChartOptions = () => {
    return {
      series: [35.1, 23.5, 2.4, 5.4],
      colors: ["#1C64F2", "#16BDCA", "#FDBA8C", "#E74694"],
      chart: {
        height: 320,
        width: "100%",
        type: "donut",
      },
      stroke: {
        colors: ["transparent"],
        lineCap: "",
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                show: true,
                fontFamily: "Inter, sans-serif",
                offsetY: 20,
              },
              total: {
                showAlways: true,
                show: true,
                label: "Unique visitors",
                fontFamily: "Inter, sans-serif",
                formatter: function (w: any) {
                  const sum = w.globals.seriesTotals.reduce((a: any, b: any) => {
                    return a + b;
                  }, 0);
                  return '$' + sum + 'k';
                },
              },
              value: {
                show: true,
                fontFamily: "Inter, sans-serif",
                offsetY: -20,
                formatter: function (value: any) {
                  return value + "k";
                },
              },
            },
            size: "80%",
          },
        },
      },
      grid: {
        padding: {
          top: -2,
        },
      },
      labels: ["Direct", "Sponsor", "Affiliate", "Email marketing"],
      dataLabels: {
        enabled: false,
      },
      legend: {
        position: "bottom",
        fontFamily: "Inter, sans-serif",
      },
      yaxis: {
        labels: {
          formatter: function (value: any) {
            return value + "k";
          },
        },
      },
      xaxis: {
        labels: {
          formatter: function (value: any) {
            return value + "k";
          },
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
    };
  };

  useEffect(() => {
    if (document.getElementById("image-storage-chart") && typeof ApexCharts !== 'undefined') {
      const chart = new ApexCharts(document.getElementById("image-storage-chart"), getChartOptions());
      chart.render();

      const checkboxes = document.querySelectorAll('#devices input[type="checkbox"]');

      function handleCheckboxChange(event: any) {
        const checkbox = event.target;
        if (checkbox.checked) {
          switch (checkbox.value) {
            case 'desktop':
              chart.updateSeries([15.1, 22.5, 4.4, 8.4]);
              break;
            case 'tablet':
              chart.updateSeries([25.1, 26.5, 1.4, 3.4]);
              break;
            case 'mobile':
              chart.updateSeries([45.1, 27.5, 8.4, 2.4]);
              break;
            default:
              chart.updateSeries([55.1, 28.5, 1.4, 5.4]);
          }
        } else {
          chart.updateSeries([35.1, 23.5, 2.4, 5.4]);
        }
      }

      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', handleCheckboxChange);
      });

      return () => {
        chart.destroy();
        checkboxes.forEach((checkbox) => {
          checkbox.removeEventListener('change', handleCheckboxChange);
        });
      };
    }
  }, []);
    return (
      <aside className="w-80 p-4 shadow-md">
      <h2 className="text-lg font-medium text-gray-800 mb-4">Storage</h2>

      {/* Chart */}
      <div className="w-full rounded-lg shadow-sm -mt-6">
        <div className="py-6" id="image-storage-chart"></div>
      </div>

      {/* Storage info */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">Total Space</p>
          <p className="font-medium text-gray-800">512GB</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Used</p>
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            <span className="w-2 h-2 rounded-full bg-yellow-400" />
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <p className="font-medium text-gray-800">420GB</p>
          </div>
        </div>
      </div>

      {/* Folders */}
      <div className="grid grid-cols-2 gap-4 mt-4">
         {/* Fav Folders */}
        <div className="bg-green-50 p-4 rounded-lg flex flex-col items-center justify-center">
          <FolderIcon className="h-6 w-6 text-yellow-500 mb-2" />
          <p className="font-medium text-gray-800 text-center">Fav Folders</p>
          <p className="text-sm text-gray-600">1654 files</p>
        </div>
        {/* Shared Files */}
        <div className="bg-green-50 p-4 rounded-lg flex flex-col items-center justify-center">
          <UsersIcon className="h-6 w-6 text-pink-500 mb-2" />
          <p className="font-medium text-gray-800 text-center">Shared Files</p>
          <p className="text-sm text-gray-600">1654 files</p>
        </div>
          {/* Notes */}
          <div className="bg-green-50 p-4 rounded-lg flex flex-col items-center justify-center">
            <DocumentTextIcon className="h-6 w-6 text-blue-500 mb-2" />
            <p className="font-medium text-gray-800 text-center">Notes</p>
            <p className="text-sm text-gray-600">1654 files</p>
          </div>
        {/* Trash */}
        <div className="bg-green-50 p-4 rounded-lg flex flex-col items-center justify-center">
          <TrashIcon className="h-6 w-6 text-green-500 mb-2" />
          <p className="font-medium text-gray-800 text-center">Trash</p>
          <p className="text-sm text-gray-600">1654 files</p>
        </div>
      </div>
    </aside>
    );
}