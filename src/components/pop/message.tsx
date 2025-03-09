"use client";

import { useState } from "react";

export default function Message({ message, color }: { message: string; color: 1 | 2 | 3 }) {
    const type = {
        1: "bg-green-500", // success
        2: "bg-red-500",   // error
        3: "bg-teal-400",  // message
    };
    const [isVisible, setIsVisible] = useState(true);
    const handleDismiss = () => {
        setIsVisible(false);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed bottom-4 left-4 z-50 w-11/12 md:w-3/4 lg:w-1/3 mx-auto">
            <div className="bg-gray-800 text-white rounded-xl md:rounded-full lg:rounded-full flex flex-col md:flex-row items-start md:items-center justify-between p-4">
                <div className="flex items-start md:items-center px-4 py-2 flex-grow">
                    <img draggable={false} src="assets/icons/notify.svg" alt="Notify Icon" className="h-8 w-8 mr-4 text-black"/>
                    <div>
                        <p className="text-sm md:text-base lg:text-lg font-medium">{message}</p>
                    </div>
                </div>
                <button onClick={handleDismiss} className={`${type[color]} text-sm md:text-base text-white font-semibold py-2 px-4 md:px-6 rounded-full flex items-center justify-center mt-2 md:mt-0 w-full md:w-auto`}>
                    <img
                        src="assets/icons/tick.svg"
                        alt="Checkmark"
                        className="h-4 w-4 mr-1"
                    />
                    Okay
                </button>
            </div>
        </div>
    );
}
