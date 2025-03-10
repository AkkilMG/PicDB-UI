import React from 'react';
import Image from 'next/image';
import {
    CloudIcon,
    ChartBarSquareIcon as DashboardIcon, // Renamed to ChartBarSquareIcon
    LockClosedIcon,
    UsersIcon,
    StarIcon,
    BellIcon,
    TrashIcon,
    PhotoIcon as ImageIcon,  // Renamed to PhotoIcon
    VideoCameraIcon,
    DocumentTextIcon,
    EllipsisHorizontalIcon as DotsHorizontalIcon, // Renamed to EllipsisHorizontalIcon
    FolderIcon,
    DocumentIcon,
    ArrowUpRightIcon,
  } from '@heroicons/react/24/outline';



export default function PrivacyPolicyPage() {
    return (
        <div className="flex h-screen bg-green-50">
      {/* Sidebar */}
      <aside className="w-64 bg-green-100 p-4 rounded-r-2xl">
        {/* Logo */}
        <div className="mb-8 flex items-center">
          <CloudIcon className="h-6 w-6 mr-2 text-gray-800" />
          <span className="text-xl font-semibold text-gray-800">KeepFiles</span>
        </div>

        {/* Navigation */}
        <nav>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="flex items-center rounded-lg px-4 py-2 text-sm font-medium bg-green-300 text-gray-900"
              >
                <DashboardIcon className="h-5 w-5 mr-2" />
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
              >
                <LockClosedIcon className="h-5 w-5 mr-2" />
                Private Files
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
              >
                <UsersIcon className="h-5 w-5 mr-2" />
                Members
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
              >
                <StarIcon className="h-5 w-5 mr-2" />
                Favorites
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 relative"
              >
                <BellIcon className="h-5 w-5 mr-2" />
                Notifications
                <span className="absolute top-1 right-1 bg-yellow-500 text-white text-xs rounded-full px-2 py-0.5">
                  3
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
              >
                <TrashIcon className="h-5 w-5 mr-2" />
                Trash
              </a>
            </li>
          </ul>
        </nav>

        {/* User Info */}
        <div className="mt-auto flex flex-col items-center">
          <div className="w-20 h-20 rounded-full overflow-hidden mt-8 mb-2">
            <Image
              src="/profile.jpg" // Replace with your image path
              alt="Profile"
              width={80}
              height={80}
            />
          </div>
          <div className="text-center">
            <p className="font-medium text-gray-800">Dmytro Shopinskyi</p>
            <p className="text-sm text-gray-600">shopinskyi.ui@gmail.com</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-800">Dmytro's Cloud</h1>
            <input
              type="text"
              placeholder="Type for search your files..."
              className="w-full max-w-md rounded-lg py-2 px-4 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
            />
            <button className="rounded-lg px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 ml-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a7.5 7.5 0 1 0 0 15h9.75m-9.75 0a7.5 7.5 0 1 0 0-15H2.25"
                />
              </svg>
            </button>
          </div>
        </header>

        {/* Overview */}
        <section className="mb-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Overview</h2>
          <div className="grid grid-cols-4 gap-4">
            {/* Image */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <ImageIcon className="h-6 w-6 text-blue-500 mb-2" />
              <p className="font-medium text-gray-800">Images</p>
              <p className="text-sm text-gray-600">312 files</p>
            </div>
             {/* Videos */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <VideoCameraIcon className="h-6 w-6 text-blue-500 mb-2" />
              <p className="font-medium text-gray-800">Videos</p>
              <p className="text-sm text-gray-600">24 files</p>
            </div>
            {/* Documents */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <DocumentTextIcon className="h-6 w-6 text-blue-500 mb-2" />
              <p className="font-medium text-gray-800">Documents</p>
              <p className="text-sm text-gray-600">1654 files</p>
            </div>
            {/* Others */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <DocumentIcon className="h-6 w-6 text-blue-500 mb-2" />
              <p className="font-medium text-gray-800">Others</p>
              <p className="text-sm text-gray-600">512 files</p>
            </div>
          </div>
        </section>

        {/* All Files */}
        <section>
          <h2 className="text-lg font-medium text-gray-800 mb-4">All Files</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    File size
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Last modified
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Mock Data (Replace with your actual data) */}
                {[
                  { name: 'My Creative', type: 'Folder', size: '1,2 GB', modified: '21.12.2023 18:35' },
                  { name: 'Image 375015', type: 'Image', size: '985 MB', modified: '21.12.2023 18:35' },
                  { name: 'My CV Dec 2024', type: 'Document', size: '1.3 MB', modified: '21.12.2023 18:35' },
                  { name: 'My Creative', type: 'Folder', size: '10 GB', modified: '21.12.2023 18:35' },
                  { name: 'Radmilka nu', type: 'Image', size: '6.5 MB', modified: '21.12.2023 18:35' },
                  { name: 'My Creative', type: 'Video', size: '150 MB', modified: '21.12.2023 18:35' },
                ].map((file, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {file.type === 'Folder' ? (
                          <FolderIcon className="h-5 w-5 mr-2 text-yellow-500" />
                        ) : file.type === 'Image' ? (
                          <ImageIcon className="h-5 w-5 mr-2 text-blue-500" />
                        ) : file.type === 'Document' ? (
                          <DocumentIcon className="h-5 w-5 mr-2 text-pink-500" />
                        ) : (
                          <VideoCameraIcon className="h-5 w-5 mr-2 text-green-500" />
                        )}
                        {file.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.size}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.modified}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-gray-500 hover:text-gray-700">
                        <DotsHorizontalIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Storage */}
      <aside className="w-80 bg-white rounded-l-2xl p-4 shadow-md">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Storage</h2>

        {/* Chart */}
        <div className="relative mb-4">
          <div className="h-24 w-24 mx-auto rounded-full border-8 border-green-200 flex items-center justify-center">
            <span className="text-xl font-semibold text-gray-800">70%</span>
          </div>
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

        {/* Upgrade */}
        <div className="bg-yellow-50 p-4 rounded-lg mt-4">
          {/* Replace with your actual image path */}
          <Image
            src="/upgrade.png"
            alt="Upgrade"
            width={280}
            height={100}
            className="object-cover"
          />
          <h3 className="font-medium text-gray-800">Expand Your Storage</h3>
          <p className="text-sm text-gray-600">Storage space will run out soon</p>
        </div>
      </aside>
    </div>
    );
}