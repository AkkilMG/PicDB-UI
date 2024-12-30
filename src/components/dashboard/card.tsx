"use client";

import { useEffect, useState } from "react";


export default function Card({data, setId, id}: {data: any, setId: any, id: any}) {
    const [isOpen, setIsOpen] = useState(false);
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
    useEffect(() => {
        if (isOpen && id === "") {
            setIsOpen(false);
        }
    });
    return (
        <div className="max-w-sm p-4"> {/* bg-gradient-to-br from-green-300 via-green-100 to-green-300 */}
            <div className="relative bg-black text-white rounded-xl p-6 shadow-xl">
                <div className="mb-6">
                    <div className="text-sm text-gray-400">Image</div>
                    <div className="text-xl lg:text-2xl xl:text-2xl font-bold">{data.title}</div>
                    <div className="text-gray-500 text-sm mt-2 uppercase p-2">{data.type.split('/').pop()}</div>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold uppercase tracking-wide">{formatFileSize(data.size)}</span>
                </div>
                <div onClick={() => {setId(data['id']); setIsOpen(true);}} className={`absolute flex items-center justify-center text-white bottom-4 transform right-4`}> 
                    {/* onClick={() => setId(data['id'])} className="absolute right-4 bottom-4 flex flex-col items-center text-white"> */}
                    <div className="bg-gradient-to-r from-green-400 to-green-500 w-16 h-32 rounded-full flex items-center justify-center">
                        <div className={`bg-white w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 ${isOpen ? 'translate-y-[-50%]' : 'translate-y-[50%]'}`}>
                            <span className="text-black font-medium px-4">Open</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
