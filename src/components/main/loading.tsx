

import React from "react";
import Player from "react-lottie-player";
import animationData from "../assets/seach_image.json";

const Loading = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
            <Player loop animationData={animationData} play style={{ width: 150, height: 150 }} />
        </div>
    );
};

export default Loading;
