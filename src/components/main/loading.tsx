import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import animationData from '../assets/seach_image.json'; 

const Loading = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const animation = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg', //  'canvas'
        loop: true,
        autoplay: true,
        animationData, 
      });
      return () => animation.destroy(); 
    }
  }, [containerRef]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50 opacity-95"> 
      <div ref={containerRef} style={{ width: '200px', height: '200px' }} /> 
    </div>
  );
};

export default Loading;