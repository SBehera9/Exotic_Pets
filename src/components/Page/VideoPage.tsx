'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';

interface Video {
  id: number;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
}

const videoData: Video[] = [
  {
    id: 1,
    title: 'Amazing Nature',
    thumbnailUrl: '/thumbnails/nature.jpg',
    videoUrl: '/videos/nature.mp4',
  },
  {
    id: 2,
    title: 'Space Exploration',
    thumbnailUrl: '/thumbnails/space.jpg',
    videoUrl: '/videos/space.mp4',
  },
  {
    id: 3,
    title: 'Cooking Delights',
    thumbnailUrl: '/thumbnails/cooking.jpg',
    videoUrl: '/videos/cooking.mp4',
  },
  {
    id: 4,
    title: 'Tech Review',
    thumbnailUrl: '/thumbnails/tech.jpg',
    videoUrl: '/videos/tech.mp4',
  },
  {
    id: 5,
    title: 'Travel Vlog',
    thumbnailUrl: '/thumbnails/travel.jpg',
    videoUrl: '/videos/travel.mp4',
  },
  {
    id: 6,
    title: 'Gaming Highlights',
    thumbnailUrl: '/thumbnails/gaming.jpg',
    videoUrl: '/videos/gaming.mp4',
  },
  {
    id: 7,
    title: 'DIY Projects',
    thumbnailUrl: '/thumbnails/diy.jpg',
    videoUrl: '/videos/diy.mp4',
  },
  {
    id: 8,
    title: 'Music Performance',
    thumbnailUrl: '/thumbnails/music.jpg',
    videoUrl: '/videos/music.mp4',
  },
  {
    id: 9,
    title: 'Science Experiments',
    thumbnailUrl: '/thumbnails/science.jpg',
    videoUrl: '/videos/science.mp4',
  },
  {
    id: 10,
    title: 'Art Tutorial',
    thumbnailUrl: '/thumbnails/art.jpg',
    videoUrl: '/videos/art.mp4',
  },
  {
    id: 11,
    title: 'Fitness Workout',
    thumbnailUrl: '/thumbnails/fitness.jpg',
    videoUrl: '/videos/fitness.mp4',
  },
  {
    id: 12,
    title: 'Movie Trailer',
    thumbnailUrl: '/thumbnails/movie.jpg',
    videoUrl: '/videos/movie.mp4',
  },
];

interface VideoCardProps {
  video: Video;
  onClick: (video: Video) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {
  return (
    <div
      className="group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={() => onClick(video)}
    >
      <div className="relative w-full h-48">
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      </div>
    </div>
  );
};

interface VideoModalProps {
  video: Video | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

const VideoModal: React.FC<VideoModalProps> = ({ video, onClose, onNext, onPrev, hasNext, hasPrev }) => {
  if (!video) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-11/12 md:w-3/4 lg:w-2/3 overflow-hidden relative">
        <div className="flex justify-end items-center bg-gray-100 py-2 px-4">
          <button
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
            onClick={onClose}
            aria-label="Close"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div className="p-4 flex justify-center items-center">
          <video controls className="w-full object-contain max-h-[70vh]">
            <source src={video.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {hasPrev && (
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-full p-2"
            aria-label="Previous Video"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {hasNext && (
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-full p-2"
            aria-label="Next Video"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

function VideoPage() {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(null);

  const openModal = (video: Video, index: number) => {
    setSelectedVideoIndex(index);
  };

  const closeModal = () => {
    setSelectedVideoIndex(null);
  };

  const nextVideo = useCallback(() => {
    if (selectedVideoIndex !== null && selectedVideoIndex < videoData.length - 1) {
      setSelectedVideoIndex(selectedVideoIndex + 1);
    }
  }, [selectedVideoIndex]);

  const prevVideo = useCallback(() => {
    if (selectedVideoIndex !== null && selectedVideoIndex > 0) {
      setSelectedVideoIndex(selectedVideoIndex - 1);
    }
  }, [selectedVideoIndex]);

  const hasNext = selectedVideoIndex !== null && selectedVideoIndex < videoData.length - 1;
  const hasPrev = selectedVideoIndex !== null && selectedVideoIndex > 0;

  const selectedVideo = selectedVideoIndex !== null ? videoData[selectedVideoIndex] : null;

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videoData.map((video, index) => (
            <VideoCard key={video.id} video={video} onClick={() => openModal(video, index)} />
          ))}
        </div>
      </div>
      <VideoModal
        video={selectedVideo}
        onClose={closeModal}
        onNext={nextVideo}
        onPrev={prevVideo}
        hasNext={hasNext}
        hasPrev={hasPrev}
      />
    </div>
  );
}

export default VideoPage;
