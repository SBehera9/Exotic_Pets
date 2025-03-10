'use client';

import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faPlay } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faExpand, faPlay);

interface Video {
  title: string;
  thumbnailSrc: string;
  videoUrl: string; // Add this
}

const videos: Video[] = [
  {
    title: 'All About Pet Food - Dr. Becker',
    thumbnailSrc: '/images/video1.png',
    videoUrl: 'https://www.youtube.com/embed/your_video_id_1',  // Replace with real URL
  },
  {
    title: 'Canine Nutritional Truths: Debunking Pet Food Ingredient Myths',
    thumbnailSrc: '/images/video2.png',
    videoUrl: 'https://www.youtube.com/embed/your_video_id_2', // Replace with real URL
  },
  {
    title: 'Pet Care Basics',
    thumbnailSrc: '/images/video3.png',
    videoUrl: 'https://www.youtube.com/embed/your_video_id_3', // Replace with real URL
  },
  {
    title: '9 Signs You Take Care of Your Pet Completely Wrong',
    thumbnailSrc: '/images/video4.png',
    videoUrl: 'https://www.youtube.com/embed/your_video_id_4',  // Replace with real URL
  },
];

const VideosSection = () => {
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold text-green-600 mb-8">Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((video, index) => (
            <div
              key={index}
              className="relative rounded-xl overflow-hidden shadow-md group" // Added group for hover effect
            >
              <Image
                src={video.thumbnailSrc}
                alt={video.title}
                width={600} // Adjust as needed
                height={350} // Adjust as needed
                objectFit="cover"
                className="w-full h-full transition-transform duration-300 group-hover:scale-110" // Added hover effect
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 transition-opacity duration-300 flex items-center justify-center"> {/* Hover overlay */}
                <a href={video.videoUrl} target="_blank" rel="noopener noreferrer" className="text-white text-4xl hover:text-green-400 transition-colors duration-300">
                  <FontAwesomeIcon icon="play" />
                </a>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white">
                <h3 className="text-lg font-semibold">{video.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideosSection;