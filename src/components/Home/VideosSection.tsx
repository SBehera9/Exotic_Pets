"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const VideosSection = () => {
    const router = useRouter();

    const videoFiles = [
        "/videos/video1.mp4",
        "/videos/video2.mp4",
        "/videos/video3.mp4",
        "/videos/video4.mp4",
        "/videos/video5.mp4",
        "/videos/video6.mp4",
    ];

    const [activeVideo, setActiveVideo] = useState<string | null>(null);

    const handleVideoPlay = (videoSrc: string) => {
        setActiveVideo(videoSrc);
    };

    const handleViewMore = () => {
        router.push("/videos");
    };

    return (
        <div className="bg-green-100 py-12" id="videos">
            <div className="container mx-auto text-center px-4">
                <h2 className="text-3xl font-semibold text-green-600 mb-8">Videos</h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8">
                    {videoFiles.map((videoSrc, index) => (
                        <div key={index} className="rounded-xl overflow-hidden shadow-md">
                            <video
                                width="100%"
                                height="315"
                                controls
                                onPlay={() => handleVideoPlay(videoSrc)}
                            >
                                <source src={videoSrc} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    ))}
                </div>

                <button 
                    onClick={handleViewMore} 
                    className="mt-8 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                >
                    View More
                </button>
            </div>
        </div>
    );
};

export default VideosSection;
