"use client";
import { enUpload, esUpload, hiUpload, ruUpload } from '@/config/text/upload.text';

import {QRCodeSVG} from 'qrcode.react';
import { useEffect, useState } from 'react';

interface UploadResultProps { view: string; link: string; title: string; close: {close: boolean, setClose: any};}

export default function UploadResult({ view, link, title, close }: UploadResultProps) {
    
    const [data, setData] = useState(enUpload);
    useEffect(() => {
        const checkLanguage = () => {
        const lang = localStorage.getItem("lang");
        if (lang === "es") {
            setData(esUpload);
        } else if (lang === "ru") {
            setData(ruUpload);
        } else if (lang === "hi") {
            setData(hiUpload);
        } else {
            setData(enUpload);
        }
        };
    
        checkLanguage();
        const intervalId = setInterval(checkLanguage, 2000);
    
        return () => clearInterval(intervalId);
    }, []);

    const handleCopyToClipboard = async (clip: any) => {
        try {
            await navigator.clipboard.writeText(clip);
            if (clip.includes('/v/')) {
                let copyView = document.getElementById("copyView");
                if (copyView) {
                copyView.innerText = data.copied;
                    setTimeout(() => {
                        copyView.innerText = data.copy;
                    }, 1650);
                }
                return;
            }
            let copyBtn = document.getElementById("copyBtn");
            if (copyBtn) {
                copyBtn.innerText = data.copied;
                setTimeout(() => {
                    copyBtn.innerText = data.copy;
                }, 1650);
            }
        } catch (error) {
            console.log('Failed to copy to clipboard:', error);
        }
    };
    const handleShare = async (url: string) => {
        const shareData = {
          title: "PicDB",
          text: `Hey 👋, check out this image my friend.`,
          url: url, // Include one of the links to ensure Web Share API compatibility
        };
      
        if (navigator.share) {
          try {
            await navigator.share(shareData);
            console.log("Content shared successfully!");
          } catch (error) {
            console.log("Error sharing content:", error);
          }
        } else {
          console.warn("Web Share API is not supported in this browser.");
          alert("Sharing is not supported in this browser.");
        }
      };      
    

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="mx-auto max-w-7xl p-10">
                <div className="flex items-center justify-center transition-all duration-300 ease-in-out">
                    <div className="bg-white p-2 rounded-lg relative transform w-full">
                        <div className="flex items-center justify-between p-4">
                            <h2 className="text-xl font-semibold">{title.length > 50 ? title.substring(0, 50) + '...' : title} <button className='ml-2 bg-green-300 text-white uppercase px-2 rounded text-base'>{title.split('.').pop()}</button></h2>
                            <button onClick={() => close.setClose(true)} className="text-red-500 hover:text-red-700">{data.close}</button>
                        </div>
                        <div className="bg-white w-full max-w-7xl relative transform transition-all duration-300 ease-in-out">
                            <div className="flex">
                                <div className="w-4/10 p-4 border border-gray-200 rounded-lg shadow-xl mr-2">
                                    <h2 className="text-xl font-semibold mb-2">{data.downloads.title}</h2>
                                    <p className="text-gray-500 text-sm mb-4">{data.downloads.description}</p>
                                    <div className="mb-4">
                                        <label className="text-gray-600 text-sm block mb-1">{data.downloads.link}</label>
                                        <div className="flex border rounded-md border-gray-300">
                                            <input type="text" value={link} className="flex-1 px-3 py-2 focus:outline-none text-gray-700" readOnly/>
                                            <button id="copyBtn" onClick={() => handleCopyToClipboard(link)} className="bg-gray-100 hover:bg-gray-200 px-2 py-2 border-l border-gray-300 text-gray-600 focus:outline-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-grey-100"> 
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"/>
                                                </svg>
                                            </button>
                                            <button onClick={() => handleShare(link)} className="bg-gray-100 hover:bg-gray-200 px-2 py-2 border-l border-gray-300 text-gray-600 focus:outline-none">
                                                <svg className="w-5 h-5 text-grey-100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 483 483" xmlSpace="preserve">
                                                    <g> <path d="M395.72,0c-48.204,0-87.281,39.078-87.281,87.281c0,2.036,0.164,4.03,0.309,6.029l-161.233,75.674 c-15.668-14.971-36.852-24.215-60.231-24.215c-48.204,0.001-87.282,39.079-87.282,87.282c0,48.204,39.078,87.281,87.281,87.281 c15.206,0,29.501-3.907,41.948-10.741l69.789,58.806c-3.056,8.896-4.789,18.396-4.789,28.322c0,48.204,39.078,87.281,87.281,87.281 c48.205,0,87.281-39.078,87.281-87.281s-39.077-87.281-87.281-87.281c-15.205,0-29.5,3.908-41.949,10.74l-69.788-58.805 c3.057-8.891,4.789-18.396,4.789-28.322c0-2.035-0.164-4.024-0.308-6.029l161.232-75.674c15.668,14.971,36.852,24.215,60.23,24.215 c48.203,0,87.281-39.078,87.281-87.281C482.999,39.079,443.923,0,395.72,0z"/></g>
                                                </svg>
                                            </button>
                                            <button onClick={() => window.open(link, '_blank')} className="bg-gray-100 hover:bg-gray-200 px-2 py-2 border-l border-gray-300 text-gray-600 rounded-r-md focus:outline-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-grey-100">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="relative w-fit mx-auto">
                                        <div className="flex items-center mt-4">
                                            <div className="flex-grow h-0.5 bg-gray-300"></div>
                                            <span className="text-center text-sm text-gray-600 mb-2 mx-3">{data.scan}</span>
                                            <div className="flex-grow h-0.5 bg-gray-300"></div>
                                        </div>
                                        <div className="flex flex-col items-center justify-center m-10 mb-5">
                                            <div className="flex items-center justify-center border border-white rounded-md relative w-fit overflow-hidden p-5">
                                                <div className="">
                                                    <div className="absolute top-0 left-0 w-full h-full animate-pulse opacity-50"></div> {/* bg-gradient-to-r from-transparent via-blue-200 to-transparent */}
                                                        {link && (
                                                        <QRCodeSVG
                                                            value={link}
                                                            size={124}
                                                            bgColor="#ffffff"
                                                            fgColor="#000000"
                                                            level="Q" // Error correction level
                                                        />
                                                        )}
                                                        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                                                        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-400"></div>
                                                        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-blue-400"></div>
                                                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-blue-400"></div>
                                                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-blue-400"></div>
                                                    </div>
                                                    <div className="absolute left-0 w-full h-full overflow-hidden">
                                                        <div className="absolute top-1/2 left-0 w-full h-1 bg-blue-300 transform -translate-y-1/2">
                                                            <div className="absolute w-full h-full bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-scan "></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-center text-sm text-gray-600 mt-2">{data.scan}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-6/10 p-4 border border-gray-200 rounded-lg shadow-xl">
                                    <h2 className="text-xl font-semibold mb-2">{data.views.title}</h2>
                                    <p className="text-gray-500 text-sm">{data.views.description}</p>
                                    <div className="relative w-fit mx-auto mt-2 m-5">
                                        <div className="flex items-center mt-4">
                                            <div className="flex-grow h-0.5 bg-gray-300"></div>
                                            <span className="text-center text-sm text-gray-600 mb-2 mx-3">{data.views.title}</span>
                                            <div className="flex-grow h-0.5 bg-gray-300"></div>
                                        </div>
                                        <div className="flex items-center justify-center border border-grey-400 rounded-md relative w-fit overflow-hidden m-5 p-1">
                                            { link && (<img draggable={false} src={link || "assets/icons/error.png"} alt="Image" className="w-64 max-h-[50vh] object-cover"/>) }
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-gray-600 text-sm block mb-1">View link</label>
                                        <div className="flex border rounded-md border-gray-300">
                                            <input type="text" value={view} className="flex-1 px-3 py-2 focus:outline-none text-gray-700" readOnly/>
                                            <button id="copyBtn" onClick={() => handleCopyToClipboard(view)} className="bg-gray-100 hover:bg-gray-200 px-2 py-2 border-l border-gray-300 text-gray-600 focus:outline-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-grey-100"> 
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"/>
                                                </svg>
                                            </button>
                                            <button onClick={() => handleShare(view)} className="bg-gray-100 hover:bg-gray-200 px-2 py-2 border-l border-gray-300 text-gray-600 focus:outline-none">
                                                <svg className="w-5 h-5 text-grey-100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 483 483" xmlSpace="preserve">
                                                    <g> <path d="M395.72,0c-48.204,0-87.281,39.078-87.281,87.281c0,2.036,0.164,4.03,0.309,6.029l-161.233,75.674 c-15.668-14.971-36.852-24.215-60.231-24.215c-48.204,0.001-87.282,39.079-87.282,87.282c0,48.204,39.078,87.281,87.281,87.281 c15.206,0,29.501-3.907,41.948-10.741l69.789,58.806c-3.056,8.896-4.789,18.396-4.789,28.322c0,48.204,39.078,87.281,87.281,87.281 c48.205,0,87.281-39.078,87.281-87.281s-39.077-87.281-87.281-87.281c-15.205,0-29.5,3.908-41.949,10.74l-69.788-58.805 c3.057-8.891,4.789-18.396,4.789-28.322c0-2.035-0.164-4.024-0.308-6.029l161.232-75.674c15.668,14.971,36.852,24.215,60.23,24.215 c48.203,0,87.281-39.078,87.281-87.281C482.999,39.079,443.923,0,395.72,0z"/></g>
                                                </svg>
                                            </button>
                                            <button onClick={() => window.open(view, '_blank')} className="bg-gray-100 hover:bg-gray-200 px-2 py-2 border-l border-gray-300 text-gray-600 rounded-r-md focus:outline-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-grey-100">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}