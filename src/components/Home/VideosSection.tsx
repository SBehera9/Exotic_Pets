"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";

const videoFiles = [
    "/video/Dog.mp4",
    "/video/Cat.mp4",
    "/video/Bird.mp4",
    "/video/Fish.mp4",
    "/video/Bird1.mp4",
    "/video/Dog1.mp4",
];

const VideosSection = () => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    
    useEffect(() => {
        if (selectedIndex !== null && videoRef.current) {
            videoRef.current.load();
            videoRef.current.play().catch((error) => console.error("Autoplay prevented:", error));
        }
    }, [selectedIndex]);

    const openModal = (index: number) => {
        setSelectedIndex(index);
    };

    const closeModal = (event: React.MouseEvent) => {
        if (event.target === event.currentTarget) {
            setSelectedIndex(null);
        }
    };

    const nextVideo = () => {
        setSelectedIndex((prev) =>
            prev !== null ? (prev + 1) % videoFiles.length : 0
        );
    };

    const prevVideo = () => {
        setSelectedIndex((prev) =>
            prev !== null ? (prev - 1 + videoFiles.length) % videoFiles.length : 0
        );
    };

    return (
        <div className="bg-green-100 py-12" id="videos">
            <div className="container mx-auto text-center px-4">
                <h2 className="text-3xl font-semibold text-green-600 mb-8">Videos</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {videoFiles.map((videoSrc, index) => (
                        <div
                            key={index}
                            className="relative rounded-xl overflow-hidden shadow-md cursor-pointer aspect-video"
                            onClick={() => openModal(index)}
                        >
                            <video className="w-full h-full object-cover">
                                <source src={videoSrc} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Play size={50} className="text-white" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedIndex !== null && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 px-4"
                    onClick={closeModal}
                >
                    <div className="relative max-w-full sm:max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setSelectedIndex(null)}
                            className="absolute top-4 right-4 text-white text-xl sm:text-3xl"
                        >
                            <X size={30} />
                        </button>

                        <video key={selectedIndex} ref={videoRef} className="w-full h-auto rounded-lg" controls autoPlay>
                            <source src={videoFiles[selectedIndex]} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>

                        <button
                            onClick={prevVideo}
                            className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 text-white text-xl sm:text-3xl"
                        >
                            <ChevronLeft size={30} />
                        </button>

                        <button
                            onClick={nextVideo}
                            className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 text-white text-xl sm:text-3xl"
                        >
                            <ChevronRight size={30} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideosSection;
