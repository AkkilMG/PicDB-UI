import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';

const Player = dynamic(() => import('react-lottie-player'), { ssr: false });

import animationData from "../assets/seach_image.json";

const Loading = () => {
    const [isClient, setIsClient] = useState(false);

    // Ensure the component is only rendered client-side
    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null; // This avoids rendering the component on SSR
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
            <Player 
                loop 
                animationData={animationData} 
                play 
                style={{ width: 200, height: 200 }} 
            />
        </div>
    );
};

export default Loading;
