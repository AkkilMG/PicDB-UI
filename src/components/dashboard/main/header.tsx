"use client";

export default function MainDashboardHeader({data}: {data: any}) {
    return (
        <div className="py-4">
          <div className="container mx-auto">
            <h1 className="text-2xl font-semibold">{data.header.title} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 inline-block ml-1">
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg></h1>

            <div className="mt-4">
              <div className="relative py-2">
                <input type="search" className="block shadow-md w-full p-4 pl-14 text-lg border-none rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder={data.header.search} />
                <div className="absolute inset-y-0 left-0 flex items-center pl-8 py-4 pointer-events-none">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-6a7 7 0 10-14 0 7 7 0 0014 0z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}