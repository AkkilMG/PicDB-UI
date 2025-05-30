
import {
    PhotoIcon as ImageIcon,
    EllipsisHorizontalIcon as DotsHorizontalIcon,
    TrashIcon,
    StarIcon,
    FolderIcon,
  } from '@heroicons/react/24/outline';

export default function MainDashboardList({data, setId, deleteList, favoriteList}: {data: any, setId: any, deleteList: any, favoriteList: any}) {
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

    return (
      <section>
        <h2 className="text-lg font-medium text-gray-800 mb-4">All Images</h2>
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
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
              {/* Mock Data (Replace with your actual data) */}
              {data.length > 0 ? data.map((file: any, index: number) => (
                <tr key={index} onClick={() => setId(file['id']) } >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <ImageIcon className="h-5 w-5 mr-2 text-blue-500" />
                      {file.title.length > 25 ? file.title.substring(0, 25) + '...' : file.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 uppercase">{file.type.split('/').pop()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatFileSize(file.size)}</td>
                  <td onClick={(e) => { e.stopPropagation(); deleteList(file['id'])}}  className="pl-4 pr-12- py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-red-500 hover:text-red-700">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                  <td onClick={(e) => { e.stopPropagation(); favoriteList(file['id'])}} className="pr-8 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="focus:outline-none">
                      <StarIcon className="h-5 w-5" stroke={file.favorite ? "#f59e42" : "#3b82f6"} 
                        fill={file.favorite ? "#f59e42" : "none"}/>
                    </button>
                  </td>
                </tr>
              )): (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center bg-gray-50 text-gray-600">
                    No images found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    );
}