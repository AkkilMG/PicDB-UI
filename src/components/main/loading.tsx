import dynamic from 'next/dynamic';

const Player = dynamic(() => import('react-lottie-player'), { ssr: false });

import animationData from "../assets/seach_image.json";

const Loading = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
            <Player loop animationData={animationData} play style={{ width: 150, height: 150 }} />
        </div>
    );
};

export default Loading;
