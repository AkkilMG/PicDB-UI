
import {
    PhotoIcon as ImageIcon,  // Renamed to PhotoIcon
    VideoCameraIcon,
    EllipsisHorizontalIcon as DotsHorizontalIcon, // Renamed to EllipsisHorizontalIcon
    FolderIcon,
    DocumentIcon,
  } from '@heroicons/react/24/outline';

export default function MainDashboardList() {
    return (
        <section>
          <h2 className="text-lg font-medium text-gray-800 mb-4">All Files</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    File size
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
    );
}