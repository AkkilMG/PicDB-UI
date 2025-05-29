"use client";

import {
  PhotoIcon as ImageIcon,  // Renamed to PhotoIcon
  VideoCameraIcon,
  DocumentTextIcon,
  DocumentIcon,
} from '@heroicons/react/24/outline';


export default function MainDashboardOverview() {
    return (
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
    );
}