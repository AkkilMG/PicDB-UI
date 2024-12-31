"use client";

import { useState, useEffect } from "react";
import Card from "./card";
import UploadMobileResult from "../upload/upload_result_mobile";
import UploadResult from "../upload/upload_result";

export default function Dashboard() {
    const [link, setLink] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [view, setView] = useState<string>('');
    const [id, setId] = useState<string>('');
    const [close, setClose] = useState<boolean>(true);
    const [uploadComponent, setUploadComponent] = useState<any>(<div></div>);
    const [result, setResult] = useState<any[]>([]);
    const [policy, setPolicy] = useState<boolean>(true);
    useEffect(() => {
        const policyAccepted = localStorage.getItem("policyAccepted") === "true";
        if (!policyAccepted) {
            setPolicy(false);
        } else setPolicy(true)
    }, []);
    
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

    useEffect(() => {
        const storedLinks = (typeof window !== 'undefined') ? JSON.parse(localStorage.getItem('links') || '[]') : [];
        setResult(storedLinks);
    }, [])

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
    return (
        <>
        { (id && !close) && (uploadComponent)}
        <div className="p-10 items-center">
            { (policy && result.length > 0) ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {result.map((item, index) => {
                    return <Card key={index} data={item} setId={setId} id={id} />;
                })}
                </div>
            ): (
                <div className="min-h-[65vh] flex items-center justify-center">
                    <div className="text-center flex items-center justify-center text-bold text-3xl">{!policy ? `Please accept the policy to access uploaded images.` : `You haven't uploaded any images..`}</div>
                </div>
            )}
        </div>
        </>
    );
}