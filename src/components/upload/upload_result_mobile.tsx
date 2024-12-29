"use client";


import {QRCodeSVG} from 'qrcode.react';
import { useState } from 'react';


interface UploadResultProps { view: string; link: string; title: string; close: {close: boolean, setClose: any};}

export default function UploadMobileResult({ view, link, title, close }: UploadResultProps) {
    const [showSection, setShowSection] = useState('download'); 
    const handleCopyToClipboard = async (clip: any) => {
        try {
            await navigator.clipboard.writeText(clip);
            if (clip.includes('/v/')) {
                let copyView = document.getElementById("copyView");
                if (copyView) {
                copyView.innerText = "Copied";
                    setTimeout(() => {
                        copyView.innerText = "Copy";
                    }, 1650);
                }
                return;
            }
            let copyBtn = document.getElementById("copyBtn");
            if (copyBtn) {
                copyBtn.innerText = "Copied";
                setTimeout(() => {
                    copyBtn.innerText = "Copy";
                }, 1650);
            }
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="mx-auto max-w-7xl p-4 sm:p-6 md:p-10">
            <div className="bg-white p-2 rounded-lg w-full px-5">
              <div className="flex items-center justify-between p-4">
                <h2 className="text-xl font-semibold">
                  {title}
                  <button className="ml-2 bg-green-300 text-white uppercase px-2 rounded text-base">
                    {title.split('.').pop()}
                  </button>
                </h2>
                <button onClick={() => close.setClose(true)} className="text-red-500 hover:text-red-700">
                  Close
                </button>
              </div>

              {/* Section Toggle for Small Screens */}
              <div className="block md:hidden p-4">
                <button onClick={() => setShowSection('download')} className={`px-4 py-2 rounded-md ${   showSection === 'download' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700' }`}> 
                Download
                </button>
                <button onClick={() => setShowSection('view')} className={`px-4 py-2 rounded-md ml-2 ${   showSection === 'view' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700' }`}> 
                View
                </button>
              </div>

              <div className="flex flex-col md:flex-row gap-4 p-4">
                {/* Download Section */}
                {(showSection === 'download') && (
                  <div className="md:w-5/12 p-4 border border-gray-200 rounded-lg shadow-xl">
                    <h2 className="text-xl font-semibold mb-2">Image Download:</h2>
                    <p className="text-gray-500 text-sm mb-4">
                      This provides you a link to download the image.
                    </p>
                    <div className="mb-4">
                      <label className="text-gray-600 text-sm block mb-1">Download link</label>
                      <div className="flex border rounded-md border-gray-300">
                        <input type="text" value={link} className="flex-1 px-3 py-2 focus:outline-none text-gray-700" readOnly />
                        <button id="copyBtn" onClick={() => handleCopyToClipboard(link)} className="bg-gray-100 hover:bg-gray-200 px-3 py-2 border-l border-gray-300 text-gray-600 rounded-r-md">
                          Copy
                        </button>
                        <button onClick={() => window.open(link, '_blank')} className="bg-gray-100 hover:bg-gray-200 px-2 py-2 border-l border-gray-300 text-gray-600 rounded-r-md focus:outline-none">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-grey-100">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-center mt-4">
                      <QRCodeSVG value={link} size={128} />
                      <p className="text-center text-sm text-gray-600 mt-2">
                        Scan this code to download the image.
                      </p>
                    </div>
                  </div>
                )}

                {/* View Section */}
                {(showSection === 'view') && (
                  <div className="md:w-7/12 p-4 border border-gray-200 rounded-lg shadow-xl">
                    <h2 className="text-xl font-semibold mb-2">Image View:</h2>
                    <p className="text-gray-500 text-sm mb-4">This provides you a link to view the image.</p>
                    <div className="flex justify-center mb-4">
                      {link && (
                        <img src={link || 'assets/icons/error.png'} alt="Preview" className="max-w-full max-h-80 object-cover rounded-lg border"
                        />
                      )}
                    </div>
                    <div>
                      <label className="text-gray-600 text-sm block mb-1">View link</label>
                      <div className="flex border rounded-md border-gray-300">
                        <input type="text" value={view} className="flex-1 px-3 py-2 focus:outline-none text-gray-700" readOnly/>
                        <button id="copyView" onClick={() => handleCopyToClipboard(view)} className="bg-gray-100 hover:bg-gray-200 px-3 py-2 border-l border-gray-300 text-gray-600 rounded-r-md">
                          Copy
                        </button>
                        <button onClick={() => window.open(view, '_blank')} className="bg-gray-100 hover:bg-gray-200 px-2 py-2 border-l border-gray-300 text-gray-600 rounded-r-md focus:outline-none">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-grey-100">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
    );
}