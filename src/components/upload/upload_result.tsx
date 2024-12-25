import { useState } from "react";
import {QRCodeSVG} from 'qrcode.react';


export default function UploadResult() {
    // url, title, link;
    const link = "https://akkilmg.vercel.app";
    const view = "https://akkilmg.vercel.app/v/";
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
        <div className="p-20 items-center justify-center w-screen h-screen bg-black bg-opacity-50 ">
            <div className="mx-auto max-w-7xl p-10">
                <div className="flex items-center justify-center transition-all duration-300 ease-in-out">
                    <div className="bg-white p-2 rounded-lg relative transform">
                        <div className="bg-white w-full max-w-7xl relative transform transition-all duration-300 ease-in-out">
                            <div className="flex">
                                <div className="w-3/10 p-4 border border-gray-200 rounded-lg shadow-xl mr-2">
                                    <h2 className="text-xl font-semibold mb-2">Image Download:</h2>
                                    <p className="text-gray-500 text-sm mb-4">This provides you link to download image.</p>
                                    <div className="mb-4">
                                        <label className="text-gray-600 text-sm block mb-1">Download link</label>
                                        <div className="flex border rounded-md border-gray-300">
                                            <input type="text" value={link} className="flex-1 px-3 py-2 focus:outline-none text-gray-700" readOnly/>
                                            <button id="copyBtn" onClick={() => handleCopyToClipboard(link)} className="bg-gray-100 hover:bg-gray-200 px-3 py-2 border-l border-gray-300 text-gray-600 rounded-r-md focus:outline-none">Copy</button>
                                        </div>
                                    </div>
                                    <div className="relative w-fit mx-auto">
                                        <div className="flex items-center mt-4">
                                            <div className="flex-grow h-0.5 bg-gray-300"></div>
                                            <span className="text-center text-sm text-gray-600 mb-2 mx-3">Scan to open in app</span>
                                            <div className="flex-grow h-0.5 bg-gray-300"></div>
                                        </div>
                                        <div className="flex flex-col items-center justify-center m-10">
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
                                            <p className="text-center text-sm text-gray-600 mt-2">Scan this code with your phone to <br />open your dashboard in the app.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-7/10 p-4 border border-gray-200 rounded-lg shadow-xl">
                                    <h2 className="text-xl font-semibold mb-2">Image View:</h2>
                                    <p className="text-gray-500 text-sm mb-4">This provides you link to view image.</p>
                                    <div className="relative w-fit mx-auto">
                                        <div className="flex items-center mt-4">
                                            <div className="flex-grow h-0.5 bg-gray-300"></div>
                                            <span className="text-center text-sm text-gray-600 mb-2 mx-3">Image View</span>
                                            <div className="flex-grow h-0.5 bg-gray-300"></div>
                                        </div>
                                        <div className="flex items-center justify-center border border-white rounded-md relative w-fit overflow-hidden p-5">
                                            <img src="https://picsum.photos/200/300" alt="Image" className="w-64 h-64 object-cover"/>  
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-gray-600 text-sm block mb-1">View link</label>
                                        <div className="flex border rounded-md border-gray-300">
                                            <input type="text" value={view} className="flex-1 px-3 py-2 focus:outline-none text-gray-700" readOnly/>
                                            <button id="copyView" onClick={() => handleCopyToClipboard(view)} className="bg-gray-100 hover:bg-gray-200 px-3 py-2 border-l border-gray-300 text-gray-600 rounded-r-md focus:outline-none">Copy</button>
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