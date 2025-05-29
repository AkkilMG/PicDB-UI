"use client";

import {
  FolderIcon,
} from '@heroicons/react/24/outline';


export default function MainDashboardFolders() {

    const folders = [
        { name: 'New Folder', files: 312 },
        { name: 'Key', files: 24 },
        { name: 'Secret', files: 1654 },
        { name: 'Rip', files: 512 },
    ];

    return (
        <section className="mb-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Folders</h2>
          <div className="grid grid-cols-4 gap-4">
            {folders && folders.map((folder: any, index: number) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                <FolderIcon className="h-6 w-6 text-blue-500 mb-2" />
                <p className="font-medium text-gray-800">{folder.name}</p>
                <p className="text-sm text-gray-600">{folder.count}</p>
              </div>
            ))}
          </div>
        </section>
    );
}