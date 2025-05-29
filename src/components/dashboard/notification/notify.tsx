"use client";


import {
    BellIcon,
    TrashIcon,
} from '@heroicons/react/24/outline';

export default function MainNotifyList({data, setId, deleteList}: {data: any, setId: any, deleteList: any}) {
    return (
      <section>
        <h2 className="text-lg font-medium text-gray-800 mb-4">All Notification</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="bg-white divide-y divide-gray-300">  
              {data.length > 0 ? data.map((notify: any, index: number) => (
                <tr key={index} onClick={() => setId(notify['id']) } >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <BellIcon className="h-5 w-5 mr-2 text-yellow-500" />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 uppercase">{notify.text}</td>
                  <td onClick={(e) => deleteList(notify['id'])}  className="pl-4 pr-12- py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-red-500 hover:text-red-700">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
                
              )): (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center bg-gray-50 text-gray-600">
                    No Notifications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    );
}