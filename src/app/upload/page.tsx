"use client";

import NotificationButtons from "@/components/dashboard/notification";
import Sidenav from "@/components/dashboard/sidenav";
import Upload from "@/components/upload/upload";
import UploadResult from "@/components/upload/upload_result";
import UploadMobileResult from "@/components/upload/upload_result_mobile";
import { useToast } from "@/hooks/use-toast";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useCallback, useEffect, useState } from "react";

export default function UploadPage() {
    const [link, setLink] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [view, setView] = useState<string>('');
    const [id, setId] = useState<string>('');
    const [close, setClose] = useState<boolean>(true);
    const [result, setResult] = useState<{ id: string; link: string; title: string; view: string, createdOn: any }[]>([]);
    const { toast } = useToast()
    const isMobile = useMediaQuery(720);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!id || close) return;
        const found = result.find(item => item.id === id);
        if (found) {
            setLink(found.link);
            setTitle(found.title);
            setView(found.view);
            setClose(false);
        }
    }, [id, result, close]);

    const handleClose = useCallback(() => {
        setClose(true);
        setId('');
        setLink('');
        setTitle('');
        setView('');
    }, []);

    const uploadFile = async (file: any) => {
        const policy = localStorage.getItem("policyAccepted")?.toLowerCase() === "true";
        if (!policy) {
            alert('Please accept the policy to upload images.');
            return { success: false };
        }
        if (!file) {
            alert('Please select an image before uploading.');
            return  { success: false };
        }
        if (file.size / (1024 * 1024) > 65) {
            alert('Please select an image under 60MB. As its a limit.');
            return { success: false };
        }
        try {
            const formData = new FormData();
            formData.append('file', file, file.name);

            return await new Promise<{ success: boolean }>((resolve) => {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', 'https://picdb-api.arkynox.com/upload');
                xhr.upload.onprogress = (e) => {
                    if (e.lengthComputable) {
                        setProgress(Math.round((e.loaded / e.total) * 100));
                    }
                };
                xhr.onload = () => {
                    try {
                        const response = JSON.parse(xhr.responseText);
                        if (response['success'] === true) {
                            const newEntry = {
                                id: response['id'],
                                link: response['durl'],
                                title: file.name,
                                size: file.size,
                                view: response['vurl'],
                                createdOn: new Date().toISOString(),
                            };
                            setResult(prev => [...prev, newEntry]);
                            const existingLinks = JSON.parse(localStorage.getItem('links') || '[]') || [];
                            existingLinks.push({ ...newEntry, type: file.type });
                            localStorage.setItem('links', JSON.stringify(existingLinks));
                            resolve({ success: true });
                        } else {
                            alert('File uploaded not successful.');
                            resolve({ success: false });
                        }
                    } catch {
                        alert('Error parsing server response.');
                        resolve({ success: false });
                    }
                };
                xhr.onerror = () => {
                    alert('Error uploading file.');
                    resolve({ success: false });
                };
                xhr.send(formData);
            });
        } catch (error) {
            alert('Error uploading file');
            return { success: false };
        }
    };
    
    return (
        <div className="h-screen bg-gray-50">
            <NotificationButtons />
            { (id && !close) && (isMobile
                ? <UploadMobileResult view={view} link={link} title={title} close={{ close, setClose: handleClose }} />
                : <UploadResult view={view} link={link} title={title} close={{ close, setClose: handleClose }} />
            )}
            <div className="flex flex-col md:flex-row h-screen bg-gray-50">
                <Sidenav />
                <main className="flex-1 p-4 md:p-8 bg-gray-50">
                    <Upload uploadFile={uploadFile} progress={progress} result={result} setId={setId} />
                </main>
            </div>
        </div>
    );
}
