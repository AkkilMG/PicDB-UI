"use client";

import { useState, useEffect } from "react";

export default function Policy() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const policyAccepted = localStorage.getItem("policyAccepted") === "true";
        if (!policyAccepted) {
            setIsVisible(true);
        }
    }, []);

    const handleDismiss = () => {
        setIsVisible(false);
        localStorage.setItem("policyAccepted", "true");
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed bottom-4 left-4 z-50 w-11/12 md:w-3/4 lg:w-1/2 mx-auto">
            <div className="bg-gray-800 text-white rounded-xl md:rounded-full lg:rounded-full flex flex-col md:flex-row items-start md:items-center justify-between p-4">
                <div className="flex items-start md:items-center px-4 py-2 md:py-3 flex-grow">
                    <img src="/assets/icons/policy.svg" alt="Policy Icon" className="h-8 w-8 mr-4 text-teal-400" />
                    <div>
                        <p className="text-sm md:text-base lg:text-lg font-medium">
                            I hereby acknowledge and formally accept all stated policies.
                            <a href="policy/privacy" className="text-teal-400 font-medium hover:underline">
                                {" "}
                                Privacy Policy
                            </a>
                            <a href="policy/terms-of-service" className="text-teal-400 font-medium hover:underline">
                                {" "} <span className="text-white">|</span> {" "}
                                Terms of Service
                            </a>
                        </p>
                    </div>
                </div>
                <button onClick={handleDismiss}
                    className="bg-teal-400 text-sm md:text-base text-white font-semibold py-2 px-4 md:py-2 md:px-6 rounded-full flex items-center justify-center mt-2 md:mt-0 w-full md:w-auto">
                    <img src="/assets/icons/tick.svg" alt="Checkmark" className="h-4 w-4 mr-1" />
                    Agree
                </button>
            </div>
        </div>
    );
}
