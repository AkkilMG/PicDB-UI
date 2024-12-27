"use client";

import Cookies from "@/components/pop/cookies";
import DropUpload from "@/components/upload/drop_upload";
import MultiUpload from "@/components/upload/multi_upload";
import Upload from "@/components/upload/upload";
import UploadResult from "@/components/upload/upload_result";
import axios from "axios";
import { link } from "fs";
import { useEffect, useState } from "react";


export default function UploadPage() {
    
    const [link, setLink] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [view, setView] = useState<string>('');
    const [id, setId] = useState<string>('');
    const [close, setClose] = useState<boolean>(true);
    const [result, setResult] = useState<{ id: string; link: string; title: string; view: string }[]>([]);

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
    });

    const uploadFile = async (file: any) => {
        if (!file) {
            alert('Please select an image before uploading.');
            return  { success: false };
        }
        if (file.size / (1024 * 1024) > 60) {
            alert('Please select an image under 60MB. As its a limit.');
            return;
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
                .post('https://sangrahdb.izaries.workers.dev/upload', formData, config)
                .then(async (response: any) => {
                    console.log(response.data);
                if (response.data['success'] === true) {
                    setResult(prevResult => [
                        ...prevResult,
                        {
                            id: response.data['id'],
                            link: response.data['durl'],
                            title: file.name,
                            size: file.size,
                            view: response.data['vurl']
                        }
                    ]);
                    console.log({
                        id: response.data['id'],
                        link: response.data['durl'],
                        title: file.name,
                        size: file.size,
                        view: response.data['vurl']
                    });
                } else {
                    setError(true);
                    setProgress(0);
                    console.log("Error: "+response.data['message']);
                    alert('File uploaded not successful.');
                    return { success: true}
                }
                })
                .catch((error: any) => {
                    alert('Error uploading file: ' + error.message);
                    return  { success: false }
                });
        } catch (error) {
            alert('Error uploading file:' + (error as any).messages);
            return { success: false }
        }
    };
    
    return (
        <div>
            { id && !close ? (<UploadResult view={view} link={link} title={title} close={{ close: close, setClose }} />): null}
            {/* <Cookies /> */}
            <DropUpload uploadFile={uploadFile}/>
            <Upload uploadFile={uploadFile} progress={progress} result={result} setId={setId} />
        </div>
    );
}