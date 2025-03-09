"use client";

import { enPop, esPop, hiPop, ruPop } from "@/config/text/pop.text";
import { useState, useEffect } from "react";

export default function Cookies() {
    const [isVisible, setIsVisible] = useState(false);
    const [data, setData] = useState(enPop.cookies);
    useEffect(() => {
        const checkLanguage = () => {
        const lang = localStorage.getItem("lang");
        if (lang === "es") {
            setData(esPop.cookies);
        } else if (lang === "ru") {
            setData(ruPop.cookies);
        } else if (lang === "hi") {
            setData(hiPop.cookies);
        } else {
            setData(enPop.cookies);
        }
        };

        checkLanguage();
        const intervalId = setInterval(checkLanguage, 2000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        // Check if cookies have been accepted
        const cookiesAccepted = localStorage.getItem("cookiesAccepted") === "true";
        if (!cookiesAccepted) {
            setIsVisible(true);
        }
    }, []);

    const handleDismiss = () => {
        setIsVisible(false);
        localStorage.setItem("cookiesAccepted", "true");
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed bottom-4 left-4 z-50 w-11/12 md:w-3/4 lg:w-1/2 mx-auto">
            <div className="bg-gray-800 text-white rounded-xl md:rounded-full lg:rounded-full flex flex-col md:flex-row items-start md:items-center justify-between p-4">
                <div className="flex items-start md:items-center px-4 py-2 md:py-3 flex-grow">
                    <img draggable={false} src="/assets/icons/cookies.svg" alt="Cookie Icon" className="h-8 w-8 mr-4 text-teal-400" />
                    <div>
                        <p className="text-sm md:text-base lg:text-lg font-medium">
                            {data.message}
                            <a draggable={false} href="policy/cookies" className="text-teal-400 font-medium hover:underline">
                                {" "}
                                {data.learnMore}
                            </a>
                        </p>
                    </div>
                </div>
                <button onClick={handleDismiss}
                    className="bg-teal-400 text-sm md:text-base text-white font-semibold py-2 px-4 md:py-2 md:px-6 rounded-full flex items-center justify-center mt-2 md:mt-0 w-full md:w-auto">
                    <img draggable={false} src="/assets/icons/tick.svg" alt="Checkmark" className="h-4 w-4 mr-1" />
                    {data.okay}
                </button>
            </div>
        </div>
    );
}
