import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import animationData from '../assets/seach_image.json'; 

const Loading = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const animation = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg', // Choose 'canvas' for better performance in some cases
        loop: true,
        autoplay: true,
        animationData, 
      });

      // Cleanup function to stop the animation on component unmount
      return () => animation.destroy(); 
    }
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50 opacity-75"> 
      <div ref={containerRef} style={{ width: '100px', height: '100px' }} /> 
    </div>
  );
};

export default Loading;