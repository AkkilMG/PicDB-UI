"use client";

import Cookies from "@/components/pop/cookies";
import DropUpload from "@/components/upload/drop_upload";
import MultiUpload from "@/components/upload/multi_upload";
import Upload from "@/components/upload/upload";
import UploadResult from "@/components/upload/upload_result";
import axios from "axios";
import { useState } from "react";


export default function UploadPage() {
    
    const [url, setUrl] = useState();
    const [title, setTitle] = useState();
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(false);
    const [view, setView] = useState();
    
    
    const uploadFile = async (file: any) => {
        if (!file) {
            alert('Please select an image before uploading.');
            return;
        }
        if (file.size / (1024 * 1024) > 20) {
            alert('Please select an image under 50mb. As its a limit.');
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

            axios
                .post('https://picdb.izaries.workers.dev/upload', formData, config)
                .then((response: any) => {
                // console.log(response.data['success']);
                if (response.data['success'] === true) {
                    setTitle(file.name);
                    setUrl(response.data['durl']);
                    setView(response.data['vurl']);
                    // console.log(response.data);
                } else {
                    setError(true);
                    setProgress(0);
                    console.log("Error: "+response.data['message']);
                    alert('File uploaded not successful.');
                }
                })
                .catch((error: any) => {
                    alert('Error uploading file: ' + error.message);
                });
        } catch (error) {
            alert('Error uploading file:' + (error as any).messages);
        }
    };
    return (
        <div>
            {/* <UploadResult /> */}
            {/* <Cookies /> */}
            <DropUpload uploadFile={uploadFile}/>
            <Upload uploadFile={uploadFile}/>
        </div>
    );
}