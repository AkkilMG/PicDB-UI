"use client";

export default function MainDashboardHeader({data, searchForImage}: {data: any, searchForImage: any}) {
    return (
      <div className="py-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-semibold -mt-3 sm:-mt-0">{data.header.title}</h1>

          <div className="mt-4">
            <div className="relative py-2">
              <input type="search" className="block shadow-md w-full p-2 sm:p-4 pl-12 sm:pl-14 text-lg border-none rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder={data.header.search} onChange={(e) => searchForImage(e.target.value)} />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 sm:pl-6 pr-2 py-2 sm:py-4 pointer-events-none">
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