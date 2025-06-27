"use client";

import NotificationButtons from "@/components/dashboard/notification";
import Sidenav from "@/components/dashboard/sidenav";
import Footer from "@/components/main/footer";
import Header from "@/components/main/header";
import Policy from "@/components/pop/policy";
// import DropUpload from "@/components/upload/drop_upload";
import Upload from "@/components/upload/upload";
import UploadResult from "@/components/upload/upload_result";
import UploadMobileResult from "@/components/upload/upload_result_mobile";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";

export default function UploadPage() {
    const [link, setLink] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [view, setView] = useState<string>('');
    const [id, setId] = useState<string>('');
    const [close, setClose] = useState<boolean>(true);
    const [result, setResult] = useState<{ id: string; link: string; title: string; view: string, createdOn: any }[]>([]);
    const [uploadComponent, setUploadComponent] = useState<any>(<div></div>);
    const { toast } = useToast()

    const searchById = (id: String) => {
        const found = result.find(item => item.id === id.toString());
        if (found) {
            setLink(found.link);
            setTitle(found.title);
            setView(found.view);
            setClose(false);
        } else {
            alert('No result found with the given ID.');
        }
    };
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (id) {
            searchById(id);
        }
        if (close) {
            setId('');
            setLink('');
            setTitle('');
            setView('');
        }
    }, [id, close, view, link, title]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 720) {
                setUploadComponent(<UploadMobileResult view={view} link={link} title={title} close={{ close: close, setClose }} />);
            } else {
                setUploadComponent(<UploadResult view={view} link={link} title={title} close={{ close: close, setClose }} />);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [view, link, title, close]);

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
            const config = {
                headers: {
                // accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent: any) => {
                    setProgress(
                        Math.round((progressEvent.loaded / progressEvent.total) * 100)
                    );
                },
            };

            await axios
                .post('https://picdb.avianintek.workers.dev/upload', formData, config)
                .then(async (response: any) => {
                if (response.data['success'] === true) {
                    setResult(prevResult => [
                        ...prevResult,
                        {
                            id: response.data['id'],
                            link: response.data['durl'],
                            title: file.name,
                            size: file.size,
                            view: response.data['vurl'],
                            createdOn: new Date().toISOString(),
                        }
                    ]);
                    if (typeof window !== 'undefined') {
                        const existingLinks = JSON.parse(localStorage.getItem('links') || '[]') || [];
                        existingLinks.push({
                            id: response.data['id'],
                            link: response.data['durl'],
                            title: file.name,
                            size: file.size,
                            view: response.data['vurl'],
                            type: file.type,
                            createdOn: new Date().toISOString(),
                        });
                        localStorage.setItem('links', JSON.stringify(existingLinks));
                    }
                    return { success: true }
                } else {
                    setError(true);
                    setProgress(0);
                    console.log("Error: "+response.data['message']);
                    alert('File uploaded not successful.');
                    return { success: false }
                }
                })
                .catch((error: any) => {
                    alert('Error uploading file: ' + error.message);
                    return  { success: false }
                });
            return { success: false }
        } catch (error) {
            alert('Error uploading file:' + (error as any).messages);
            return { success: false }
        }
    };
    
    return (
        <div className="h-screen bg-gray-50">
            <NotificationButtons />
            <Policy />
            { (id && !close) && (uploadComponent)}
            <div>
                
            </div>
            <div className="flex flex-col md:flex-row h-screen bg-gray-50">
                <Sidenav />
                <main className="flex-1 p-4 md:p-8 bg-gray-50">
                    <Upload uploadFile={uploadFile} progress={progress} result={result} setId={setId} />
                </main>
            </div>
        </div>
    );
}