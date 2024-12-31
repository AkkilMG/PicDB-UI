import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import animationData from '../assets/seach_image.json'; // Import your animation data

const Loading = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            lottie.loadAnimation({
                container: containerRef.current,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: animationData,
            });
        }
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
            <div ref={containerRef} style={{ width: 150, height: 150 }}></div>
        </div>
    );
};

export default Loading;
