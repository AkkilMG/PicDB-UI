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
        <>
            <div className="p-20 items-center justify-center w-screen h-screen bg-gray-100">
                <div className=" mx-40 p-10 bg-white shadow-md rounded-lg">
                    <div className="p-6">
                        <h2 className="text-xl font-semibold text-blue-500 mb-6">UPLOAD FILES</h2>

                        <div className="flex flex-col space-y-6">
                            <div className="border-2 border-dashed p-10 border-gray-300 p-8 rounded-md" onClick={() => document.getElementById('file')?.click()}>
                                <div className="flex flex-col items-center justify-center">
                                    <img src="assets/icons/upload.png" alt="upload" className="w-28 h-28 mb-4" />
                                    <p className="text-gray-700 mb-2">Drop your files here.</p>
                                    <p className="text-blue-500 cursor-pointer">or <span className="font-semibold">Browse</span></p>
                                    <input id="file" name="file" type="file" className="hidden" accept="image/*" onChange={handleFileChange} required />
                                </div>
                            </div>

                            <div className="pt-6">
                                <ul className="space-y-2 max-h-60 overflow-y-auto">
                                    { fileName && (
                                    <li className="bg-gray-50 p-3 rounded-md flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="bg-orange-100 p-2 rounded-md mr-2">
                                                <span className="text-orange-500 text-xs">{fileName.split('.').pop()}</span>
                                            </div>
                                            <div className="flex flex-col w-full">
                                                <span id='filename' className="text-gray-700 font-medium">{fileName}</span>
                                                <span className="text-gray-500 text-xs">{fileSize}</span>
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
                                    </li>)}

                                    {result && result.map((file: any, index: number) => (
                                        <li key={index} onClick={() => setId(file['id'])} className="bg-gray-50 p-3 rounded-md flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="bg-orange-100 p-2 rounded-md mr-2">
                                                    <span className="text-orange-500 text-xs uppercase">{file.title.split('.').pop()}</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-gray-700 font-medium">{file.title}</span>
                                                    <span className="text-gray-500 text-xs">{formatFileSize(file.size)}</span>
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
        </>
    );
}
