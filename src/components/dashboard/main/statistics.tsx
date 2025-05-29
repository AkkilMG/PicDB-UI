"use client";

import { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts';
// import {
//     UsersIcon,
//     TrashIcon,
//     DocumentTextIcon,
//     FolderIcon,
//   } from '@heroicons/react/24/outline';

export default function Statistics() {

  const [data, setData] = useState([]);
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
    console.log("Result: ", result);
    setData(result);
    setTotalSize(totalSize);
  }

  useEffect(() => {
      fetchData();
  }, [])

  // const getChartOptions = () => {
  //   return {
  //     series: [35.1, 23.5, 2.4, 5.4],
  //     colors: ["#1C64F2", "#16BDCA", "#FDBA8C", "#E74694"],
  //     chart: {
  //       height: 320,
  //       width: "100%",
  //       type: "donut",
  //     },
  //     stroke: {
  //       colors: ["transparent"],
  //       lineCap: "",
  //     },
  //     plotOptions: {
  //       pie: {
  //         donut: {
  //           labels: {
  //             show: true,
  //             name: {
  //               show: true,
  //               fontFamily: "Inter, sans-serif",
  //               offsetY: 20,
  //             },
  //             total: {
  //               showAlways: true,
  //               show: true,
  //               label: "Unique visitors",
  //               fontFamily: "Inter, sans-serif",
  //               formatter: function (w: any) {
  //                 const sum = w.globals.seriesTotals.reduce((a: any, b: any) => {
  //                   return a + b;
  //                 }, 0);
  //                 return '$' + sum + 'k';
  //               },
  //             },
  //             value: {
  //               show: true,
  //               fontFamily: "Inter, sans-serif",
  //               offsetY: -20,
  //               formatter: function (value: any) {
  //                 return value + "k";
  //               },
  //             },
  //           },
  //           size: "80%",
  //         },
  //       },
  //     },
  //     grid: {
  //       padding: {
  //         top: -2,
  //       },
  //     },
  //     labels: ["Direct", "Sponsor", "Affiliate", "Email marketing"],
  //     dataLabels: {
  //       enabled: false,
  //     },
  //     legend: {
  //       position: "bottom",
  //       fontFamily: "Inter, sans-serif",
  //     },
  //     yaxis: {
  //       labels: {
  //         formatter: function (value: any) {
  //           return value + "k";
  //         },
  //       },
  //     },
  //     xaxis: {
  //       labels: {
  //         formatter: function (value: any) {
  //           return value + "k";
  //         },
  //       },
  //       axisTicks: {
  //         show: false,
  //       },
  //       axisBorder: {
  //         show: false,
  //       },
  //     },
  //   };
  // };

  // useEffect(() => {
  //   if (document.getElementById("image-storage-chart") && typeof ApexCharts !== 'undefined') {
  //     const chart = new ApexCharts(document.getElementById("image-storage-chart"), getChartOptions());
  //     chart.render();

  //     const checkboxes = document.querySelectorAll('#devices input[type="checkbox"]');

  //     function handleCheckboxChange(event: any) {
  //       const checkbox = event.target;
  //       if (checkbox.checked) {
  //         switch (checkbox.value) {
  //           case 'desktop':
  //             chart.updateSeries([15.1, 22.5, 4.4, 8.4]);
  //             break;
  //           case 'tablet':
  //             chart.updateSeries([25.1, 26.5, 1.4, 3.4]);
  //             break;
  //           case 'mobile':
  //             chart.updateSeries([45.1, 27.5, 8.4, 2.4]);
  //             break;
  //           default:
  //             chart.updateSeries([55.1, 28.5, 1.4, 5.4]);
  //         }
  //       } else {
  //         chart.updateSeries([35.1, 23.5, 2.4, 5.4]);
  //       }
  //     }

  //     checkboxes.forEach((checkbox) => {
  //       checkbox.addEventListener('change', handleCheckboxChange);
  //     });

  //     return () => {
  //       chart.destroy();
  //       checkboxes.forEach((checkbox) => {
  //         checkbox.removeEventListener('change', handleCheckboxChange);
  //       });
  //     };
  //   }
  // }, []);

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
                const totalSize = data.reduce((acc, item) => acc + item.size, 0);
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
    if (document.getElementById("image-storage-chart") && typeof ApexCharts !== 'undefined') {
      const totalSize = data.reduce((acc, item) => acc + item.size, 0);

      const labels = data.map((item) => `${item.type.toUpperCase()} (${formatFileSize(item.size)})`);
      const series = data.map((item) => +((item.size / totalSize) * 100).toFixed(2)); // in %

      const chart = new ApexCharts(document.getElementById("image-storage-chart"), getChartOptions(series, labels));
      chart.render();

      return () => {
        chart.destroy();
      };
    }
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
    <aside className="w-80 p-6 m-4 shadow-lg" style={{boxShadow: "-4px 0 6px -1px rgba(0, 0, 0, 0.1)"}}>
      <h2 className="text-lg font-medium text-gray-800 mb-4">Storage</h2>

      {/* Chart */}
      <div className="w-full rounded-lg shadow-sm -mt-6">
      <div className="py-6" id="image-storage-chart"></div>
      </div>

      {/* Storage info */}
      <div className="flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-600">Used Space</p>
        <p className="font-medium text-gray-800">{formatFileSize(totalSize)}</p>
      </div>
      <div>
        <p className="text-sm text-gray-600">Saved</p>
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