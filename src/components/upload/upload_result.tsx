import {QRCodeSVG} from 'qrcode.react';


interface UploadResultProps { view: string; link: string; title: string; close: {close: boolean, setClose: any};}

export default function UploadResult({ view, link, title, close }: UploadResultProps) {
    console.log(view, link, title);
    
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
            <div className="mx-auto max-w-7xl p-10">
                <div className="flex items-center justify-center transition-all duration-300 ease-in-out">
                    <div className="bg-white p-2 rounded-lg relative transform w-full">
                        <div className="flex items-center justify-between p-4">
                            <h2 className="text-xl font-semibold">{title} <button className='ml-2 bg-green-300 text-white uppercase px-2 rounded text-base'>{title.split('.').pop()}</button></h2>
                            <button onClick={() => close.setClose(true)} className="text-red-500 hover:text-red-700">Close</button>
                        </div>
                        <div className="bg-white w-full max-w-7xl relative transform transition-all duration-300 ease-in-out">
                            <div className="flex">
                                <div className="w-4/10 p-4 border border-gray-200 rounded-lg shadow-xl mr-2">
                                    <h2 className="text-xl font-semibold mb-2">Image Download:</h2>
                                    <p className="text-gray-500 text-sm mb-4">This provides you link to download image.</p>
                                    <div className="mb-4">
                                        <label className="text-gray-600 text-sm block mb-1">Download link</label>
                                        <div className="flex border rounded-md border-gray-300">
                                            <input type="text" value={link} className="flex-1 px-3 py-2 focus:outline-none text-gray-700" readOnly/>
                                            <button id="copyBtn" onClick={() => handleCopyToClipboard(link)} className="bg-gray-100 hover:bg-gray-200 px-3 py-2 border-l border-gray-300 text-gray-600 rounded-r-md focus:outline-none">Copy</button>
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
                                            <span className="text-center text-sm text-gray-600 mb-2 mx-3">Scan to download</span>
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
                                            <p className="text-center text-sm text-gray-600 mt-2">Scan this code with your phone to <br />download the image.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-6/10 p-4 border border-gray-200 rounded-lg shadow-xl">
                                    <h2 className="text-xl font-semibold mb-2">Image View:</h2>
                                    <p className="text-gray-500 text-sm">This provides you link to view image.</p>
                                    <div className="relative w-fit mx-auto mt-2 m-5">
                                        <div className="flex items-center mt-4">
                                            <div className="flex-grow h-0.5 bg-gray-300"></div>
                                            <span className="text-center text-sm text-gray-600 mb-2 mx-3">Image View</span>
                                            <div className="flex-grow h-0.5 bg-gray-300"></div>
                                        </div>
                                        <div className="flex items-center justify-center border border-grey-400 rounded-md relative w-fit overflow-hidden m-5 p-1">
                                            { link && (<img src={link || "assets/icons/error.png"} alt="Image" className="w-64 h-auto object-cover"/>) }
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-gray-600 text-sm block mb-1">View link</label>
                                        <div className="flex border rounded-md border-gray-300">
                                            <input type="text" value={view} className="flex-1 px-3 py-2 focus:outline-none text-gray-700" readOnly/>
                                            <button id="copyView" onClick={() => handleCopyToClipboard(view)} className="bg-gray-100 hover:bg-gray-200 px-3 py-2 border-l border-gray-300 text-gray-600 rounded-r-md focus:outline-none">Copy</button>
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