"use client";

import { useEffect, useState } from "react";
import Message from "../pop/message";
import DropUpload from "./drop_upload";
import Joyride, { CallBackProps, STATUS } from "react-joyride";
import { enUpload, esUpload, hiUpload, ruUpload } from "@/config/text/upload.text";
import { FaLightbulb } from "react-icons/fa6";
import { uploadSteps } from "@/config/steps.tutorial";


export default function Upload({ uploadFile, progress, result, setId }: { uploadFile: (file: File) => Promise<any>, progress: number, result: any, setId: any }) {
    const [fileName, setFilename] = useState<string | null>(null)
    const [fileSize, setFileSize] = useState<string | null>(null)
    const [success, setSuccess] = useState<boolean>(false)
    const [data, setData] = useState(enUpload);
    const [runTutorial, setRunTutorial] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [stepIndex, setStepIndex] = useState(0);
      const [drawerOpen, setDrawerOpen] = useState(true);

    useEffect(() => {
        setIsClient(true);
    }, []);
    
    useEffect(() => {
        const tutorial = localStorage.getItem("tutorial");
        if (tutorial) {
            try {
                const tutorialObj = JSON.parse(tutorial);
                if (!tutorialObj.upload) {
                    setRunTutorial(true);
                    localStorage.setItem("tutorial", JSON.stringify({ ...tutorialObj, upload: true }));
                }
            } catch (e) {
                console.log("Error parsing tutorial data:", e);
            }
        } else {
            setRunTutorial(true);
            localStorage.setItem("tutorial", JSON.stringify({upload: false, dashboard: false, trash: false, report: false}));
        }
    }, []);

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

    const formatFileSize = (size: number) => {
        if (size >= 1073741824) return ((size / 1073741824).toFixed(2) + ' GB');
        else if (size >= 1048576) return ((size / 1048576).toFixed(2) + ' MB');
        else if (size >= 1024) return ((size / 1024).toFixed(2) + ' KB');
        else return (size + ' bytes');
    };

    const handleFileChange = async (data: any) => {
        if (data.files && data.files.length > 0) {
            for (const file of data.files) {
                setFilename(file.name);
                setFileSize(formatFileSize(file.size));
                const dataRes = await uploadFile(file);
                setFileSize(null);
                setFilename(null);
                if (dataRes.success) {
                    setSuccess(true);
                    setTimeout(() => setSuccess(false), 3000);
                    setStepIndex(4); // Move to next step after uploading
                }
            }
        }
    };

    const handleJoyrideCallback = (data: CallBackProps) => {
        const { status, index, type }: any = data;
        const finished = [STATUS.FINISHED, STATUS.SKIPPED].includes(status);
        if (finished) {
            setRunTutorial(false);
            setStepIndex(0);
        } else {
            setStepIndex(index + (type === "step:after" ? 1 : 0));
        }
    };

    
    useEffect(() => {
    const timer = setTimeout(() => {
        setDrawerOpen(false);
    }, 10000);
    return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
    if (drawerOpen) {
        const timer = setTimeout(() => {
        setDrawerOpen(false);
        }, 10000);
        return () => clearTimeout(timer);
    }
    }, [drawerOpen]);

    return (
        <>
        {isClient && (
            <Joyride steps={uploadSteps} continuous showSkipButton scrollToFirstStep showProgress run={runTutorial}
                stepIndex={stepIndex} callback={handleJoyrideCallback} styles={{ options: { primaryColor: "#3b82f6", zIndex: 10000 } }}
            />
        )}

        {!drawerOpen && (
        <div className="fixed -mr-2 bottom-6 right-2 sm:bottom-10 sm:right-2 z-40 cursor-pointer group" onClick={() => setDrawerOpen(true)}>
            <div className="w-5 h-20 bg-yellow-500 rounded-l-full shadow-lg flex items-center justify-center hover:bg-yellow-600 transition-colors">
            <FaLightbulb className="text-white w-4 h-4 group-hover:animate-pulse" />
            </div>
        </div>
        )}

        <div className={`fixed bottom-6 transition-all duration-500 ease-in-out z-40 ${ drawerOpen ? 'right-6 sm:right-10' : '-right-full'}`}>
        <button className="bg-yellow-500 border-yellow-500 text-white px-4 py-4 rounded-full shadow-xl shadow-yellow-400/60 flex items-center group" onClick={() => setRunTutorial(true)}>
            <FaLightbulb className="w-5 h-5 inline-block" />
            <span className="hidden sm:block ml-2 transition-opacity duration-200 font-semibold whitespace-nowrap">
            Tutorial
            </span>
        </button>
        </div>

        <DropUpload uploadFile={handleFileChange} />
        {success && <Message message={`Successfully uploaded the image..`} color={1} />}
        
        <div className="p-2 sm:p-4 md:p-6 lg:p-8 pb-1 flex items-center justify-center w-full min-h-80 lg:min-h-[80vh]">
            <div className="w-full max-w-4xl mx-auto p-3 sm:p-4 md:p-5 lg:p-6 pb-1 shadow-md bg-white rounded-lg">
                <div className="p-3 sm:p-4 md:p-5">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-blue-500 mb-3 sm:mb-4 lg:mb-5">
                        {data.main['title']}
                    </h2>

                    <div className="flex flex-col space-y-3 sm:space-y-4 md:space-y-5 upload-zone">
                        <div className="border-2 border-dashed border-gray-300 p-4 sm:p-5 md:p-6 rounded-md cursor-pointer" onClick={() => document.getElementById('file')?.click()}>
                            <div className="flex flex-col items-center justify-center">
                                <img draggable={false} src="assets/icons/upload.png" alt="upload" className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mb-4" />
                                <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-2">
                                    {data.main['desc']}.
                                </p>
                                <p className="text-sm sm:text-base lg:text-lg text-blue-500 cursor-pointer">
                                    {data.main['browser'][0]} <span className="font-semibold">{data.main['browser'][1]}</span>
                                </p>
                                <input id="file" name="file" type="file" className="hidden" accept="image/*" onChange={(e: any) => handleFileChange(e.target)} multiple required />
                            </div>
                        </div>

                        <div className="pt-3 sm:pt-4 md:pt-5">
                            <ul className="space-y-2 max-h-96 sm:max-h-72 pr-2 overflow-y-auto scrollbar" >
                                {fileName && (
                                    <li className="uploading-file bg-gray-50 p-2 sm:p-3 rounded-md flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="bg-orange-100 p-2 rounded-md mr-2">
                                                <span className="text-orange-500 text-xs sm:text-sm">{fileName.split('.').pop()}</span>
                                            </div>
                                            <div className="flex flex-col w-full">
                                                <span id="filename" className="text-gray-700 font-medium text-sm sm:text-base">{fileName} <button className='mt-1 ml-2 bg-blue-500 text-white uppercase px-2 rounded text-sm'>Wait..</button></span>
                                                <span className="text-gray-500 text-xs sm:text-sm">{fileSize}</span>
                                                <div id="progress" className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative w-4 h-4">
                                            <div className="uploading absolute top-0 left-0 w-full h-full rounded-full border-2 border-blue-300 flex items-center justify-center">
                                                <div className="w-2 h-2 rounded-full bg-blue-300"></div>
                                            </div>
                                        </div>
                                    </li>
                                )}

                                {result && result.map((file: any, index: number) => (
                                    <li onClick={() => { setId(file['id']); setTimeout(() => setId(file['id']), 0); }} key={index} 
                                        className="uploaded-file bg-gray-50 p-2 sm:p-3 rounded-md flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="bg-orange-100 p-2 rounded-md mr-2">
                                                <span className="text-orange-500 text-xs sm:text-sm uppercase">{file.title.split('.').pop()}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-gray-700 font-medium text-sm sm:text-base">
                                                    {file.title}
                                                    <button className='mt-1 py-0 ml-2 bg-green-500 text-white uppercase px-2 rounded text-sm' onClick={e => {
                                                        e.stopPropagation(); setId(file['id']); setTimeout(() => setId(file['id']), 0); }}>
                                                        Click Me
                                                    </button>
                                                </span>
                                                <span className="text-gray-500 text-xs sm:text-sm">{formatFileSize(file.size)}</span>
                                            </div>
                                        </div>
                                        <div className="relative w-4 h-4">
                                            <div className="uploaded absolute top-0 left-0 w-full h-full rounded-full border-2 border-green-300 flex items-center justify-center">
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
