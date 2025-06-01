"use client";


import {
    BellIcon,
    TrashIcon,
} from '@heroicons/react/24/outline';

export default function MainNotifyList({data, handleNotificationClick}: {data: any, handleNotificationClick: any }) {
    return (
      <section>
        <h2 className="text-lg font-medium text-gray-800 mb-4">All Notification</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="relative px-3 xl:px-6 py-3">
                  <span className="sr-only">Title</span>
                </th>
                <th scope="col" className="relative px-3 xl:px-6 py-3">
                  <span className="sr-only">Body</span>
                </th>
              </tr>
            </thead>
            <tbody className="cursor-pointer bg-white divide-y divide-gray-300">  
              {data && data.length > 0 ? data.map((notify: any, index: number) => (
                <tr key={index} onClick={(e) => {handleNotificationClick(notify['_id'])}} className='hover:bg-gray-50 cursor-pointer' style={{ paddingTop: '12px', paddingBottom: '12px' }}>
                  <td className="pl-2 xl:pl-16 pr-2 xl:pr-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <BellIcon className="h-5 w-5 mr-2 text-yellow-500" />
                      {notify.title}
                    </div>
                  </td> 
                  <td className="px-3 xl:px-6 py-4 whitespace-nowrap text-base text-gray-500 text-left">
                    {/* {notify.body.length > 140 ? notify.body.substring(0, 140) + '...' : notify.body} */}
                      {notify.body.length > (window.innerWidth < 640 ? 20 : 140)
                        ? notify.body.substring(0, window.innerWidth < 640 ? 20 : 140) + '...'
                        : notify.body}
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