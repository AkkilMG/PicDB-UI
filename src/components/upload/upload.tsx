"use client";

import { useEffect, useState } from "react";


export default function Upload({ uploadFile, progress, result, setId }: { uploadFile: (file: File) => Promise<any>, progress: number, result: any, setId: any }) {
    const [fileName, setFilename] = useState<string | null>(null)
    const [fileSize, setFileSize] = useState<string | null>(null)
    
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

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setFilename(file.name);
            setFileSize(formatFileSize(file.size));
            console.log("Uploading file...");
            await uploadFile(file);
            console.log("File uploaded.");
            setFileSize(null)
            setFilename(null)
        }
    };


    return (
        <div className="pb-4 p-4 sm:p-6 md:p-8 lg:p-10 flex items-center justify-center w-full py-20 pb-20 min-h-80 lg:min-h-screen bg-gray-100">
            <div className="w-full max-w-4xl mx-auto p-4 sm:p-5 md:p-6 lg:p-8 bg-white shadow-md rounded-lg">
                <div className="p-3 sm:p-4 md:p-5">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-blue-500 mb-3 sm:mb-4 lg:mb-5">
                        UPLOAD FILES
                    </h2>

                    <div className="flex flex-col space-y-3 sm:space-y-4 md:space-y-5">
                        <div 
                            className="border-2 border-dashed border-gray-300 p-4 sm:p-5 md:p-6 rounded-md cursor-pointer"
                            onClick={() => document.getElementById('file')?.click()}
                        >
                            <div className="flex flex-col items-center justify-center">
                                <img src="assets/icons/upload.png" alt="upload" className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mb-4" />
                                <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-2">
                                    Drop your files here.
                                </p>
                                <p className="text-sm sm:text-base lg:text-lg text-blue-500 cursor-pointer">
                                    or <span className="font-semibold">Browse</span>
                                </p>
                                <input 
                                    id="file" 
                                    name="file" 
                                    type="file" 
                                    className="hidden" 
                                    accept="image/*" 
                                    onChange={handleFileChange} 
                                    required 
                                />
                            </div>
                        </div>

                        <div className="pt-3 sm:pt-4 md:pt-5">
                            <ul className="space-y-2 max-h-60 sm:max-h-72 overflow-y-auto">
                                {fileName && (
                                    <li className="bg-gray-50 p-2 sm:p-3 rounded-md flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="bg-orange-100 p-2 rounded-md mr-2">
                                                <span className="text-orange-500 text-xs sm:text-sm">{fileName.split('.').pop()}</span>
                                            </div>
                                            <div className="flex flex-col w-full">
                                                <span id="filename" className="text-gray-700 font-medium text-sm sm:text-base">{fileName}</span>
                                                <span className="text-gray-500 text-xs sm:text-sm">{fileSize}</span>
                                                <div id="progress" className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative w-4 h-4">
                                            <div className="absolute top-0 left-0 w-full h-full rounded-full border-2 border-blue-300 flex items-center justify-center">
                                                <div className="w-2 h-2 rounded-full bg-blue-300"></div>
                                            </div>
                                        </div>
                                    </li>
                                )}

                                {result && result.map((file: any, index: number) => (
                                    <li 
                                        key={index} 
                                        onClick={() => setId(file['id'])} 
                                        className="bg-gray-50 p-2 sm:p-3 rounded-md flex items-center justify-between"
                                    >
                                        <div className="flex items-center">
                                            <div className="bg-orange-100 p-2 rounded-md mr-2">
                                                <span className="text-orange-500 text-xs sm:text-sm uppercase">{file.title.split('.').pop()}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-gray-700 font-medium text-sm sm:text-base">{file.title}</span>
                                                <span className="text-gray-500 text-xs sm:text-sm">{formatFileSize(file.size)}</span>
                                            </div>
                                        </div>
                                        <div className="relative w-4 h-4">
                                            <div className="absolute top-0 left-0 w-full h-full rounded-full border-2 border-green-300 flex items-center justify-center">
                                                <div className="w-2 h-2 rounded-full bg-green-300"></div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
