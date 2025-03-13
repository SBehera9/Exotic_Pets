"use client";

import React from 'react';

const VideosSection = () => {
    const videoIds = [
        'your_first_youtube_id',
        'your_second_youtube_id',
        'your_third_youtube_id'
    ]; // Replace with actual YouTube video IDs

    const handleViewMore = () => {
        window.location.href = '/videos';
    };

    return (
        <div className="bg-gray-100 py-12" id="videos">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-semibold text-green-600 mb-8">Videos</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {videoIds.map((videoId, index) => (
                        <div key={index} className="rounded-xl overflow-hidden shadow-md">
                            <iframe
                                width="100%"
                                height="315"
                                src={`https://www.youtube.com/embed/${videoId}`}
                                title={`YouTube video ${index + 1}`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    ))}
                </div>

                <button 
                    onClick={handleViewMore} 
                    className="mt-8 bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                >
                    View More
                </button>
            </div>
        </div>
    );
};

export default VideosSection;
