'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';

interface Video {
  id: number;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  views?: string;
  duration?: string;
  category?: string;
}

const videoData: Video[] = [
  // ... (keep the videoData array as it is)
  {
    id: 1,
    title: 'Amazing Nature',
    thumbnailUrl: '/thumbnails/nature.jpg',
    videoUrl: '/videos/Bird.mp4',
    views: '1.2M views',
    duration: '4:32',
    category: 'Nature'
  },
  {
    id: 2,
    title: 'Space Exploration',
    thumbnailUrl: '/thumbnails/space.jpg',
    videoUrl: '/videos/Bird1.mp4',
    views: '856K views',
    duration: '8:15',
    category: 'Science'
  },
  {
    id: 3,
    title: 'Cooking Delights',
    thumbnailUrl: '/thumbnails/cooking.jpg',
    videoUrl: '/videos/Cat.mp4',
    views: '3.4M views',
    duration: '12:45',
    category: 'Food'
  },
  {
    id: 4,
    title: 'Tech Review',
    thumbnailUrl: '/thumbnails/tech.jpg',
    videoUrl: '/videos/dog.mp4',
    views: '2.1M views',
    duration: '9:22',
    category: 'Technology'
  },
  {
    id: 5,
    title: 'Travel Vlog',
    thumbnailUrl: '/thumbnails/travel.jpg',
    videoUrl: '/video/Dog1.mp4', // Potential typo: should be /videos/?
    views: '1.5M views',
    duration: '15:30',
    category: 'Travel'
  },
  {
    id: 6,
    title: 'Gaming Highlights',
    thumbnailUrl: '/thumbnails/gaming.jpg',
    videoUrl: '/video/Fish.mp4', // Potential typo: should be /videos/?
    views: '4.7M views',
    duration: '22:18',
    category: 'Gaming'
  },
  {
    id: 7,
    title: 'DIY Projects',
    thumbnailUrl: '/thumbnails/diy.jpg',
    videoUrl: '/video/diy.mp4', // Potential typo: should be /videos/?
    views: '756K views',
    duration: '18:42',
    category: 'DIY'
  },
  {
    id: 8,
    title: 'Music Performance',
    thumbnailUrl: '/thumbnails/music.jpg',
    videoUrl: '/video/music.mp4', // Potential typo: should be /videos/?
    views: '5.3M views',
    duration: '3:56',
    category: 'Music'
  },
  {
    id: 9,
    title: 'Science Experiments',
    thumbnailUrl: '/thumbnails/science.jpg',
    videoUrl: '/video/science.mp4', // Potential typo: should be /videos/?
    views: '2.8M views',
    duration: '11:24',
    category: 'Science'
  },
  {
    id: 10,
    title: 'Art Tutorial',
    thumbnailUrl: '/thumbnails/art.jpg',
    videoUrl: '/video/art.mp4', // Potential typo: should be /videos/?
    views: '1.1M views',
    duration: '25:10',
    category: 'Art'
  },
  {
    id: 11,
    title: 'Fitness Workout',
    thumbnailUrl: '/thumbnails/fitness.jpg',
    videoUrl: '/video/fitness.mp4', // Potential typo: should be /videos/?
    views: '3.2M views',
    duration: '32:45',
    category: 'Fitness'
  },
  {
    id: 12,
    title: 'Movie Trailer',
    thumbnailUrl: '/thumbnails/movie.jpg',
    videoUrl: '/video/movie.mp4', // Potential typo: should be /videos/?
    views: '8.9M views',
    duration: '2:30',
    category: 'Entertainment'
  },
];

interface VideoCardProps {
  video: Video;
  onClick: (video: Video, index: number) => void;
  index: number;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onClick, index }) => {
  // ... (keep the VideoCard component as it is)
  return (
    <div
      className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
      onClick={() => onClick(video, index)}
    >
      <div className="relative w-full aspect-video">
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
          <div className="text-white">
            <h3 className="font-semibold text-sm sm:text-base line-clamp-2">{video.title}</h3>
            <div className="flex justify-between items-center mt-1 sm:mt-2 text-xs sm:text-sm">
              <span className="bg-blue-500 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">{video.category}</span>
              <span className="bg-black/70 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded">{video.duration}</span>
            </div>
          </div>
        </div>
        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
          {video.views}
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 sm:p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 sm:h-8 sm:w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
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
  currentIndex: number;
  totalVideos: number;
}

const VideoModal: React.FC<VideoModalProps> = ({
  video,
  onClose,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
  currentIndex,
  totalVideos,
}) => {
 // ... (keep the VideoModal component as it is)
 if (!video) return null;

 return (
   <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
     <div className="relative w-full max-w-6xl max-h-[90vh] flex flex-col">
       {/* Header */}
       <div className="flex justify-between items-center bg-gray-900 text-white p-3 sm:p-4 rounded-t-lg">
         <div>
           <h2 className="text-lg sm:text-xl font-bold line-clamp-1">{video.title}</h2>
           <p className="text-xs sm:text-sm text-gray-300">{video.category} • {video.views}</p>
         </div>
         <div className="flex items-center space-x-2 sm:space-x-4">
           <span className="text-xs sm:text-sm text-gray-300">
             {currentIndex + 1} / {totalVideos}
           </span>
           <button
             className="p-1 sm:p-2 rounded-full hover:bg-gray-700 transition-colors"
             onClick={onClose}
             aria-label="Close"
           >
             <svg
               xmlns="http://www.w3.org/2000/svg"
               className="h-5 w-5 sm:h-6 sm:w-6"
               fill="none"
               viewBox="0 0 24 24"
               stroke="currentColor"
             >
               <path
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 strokeWidth={2}
                 d="M6 18L18 6M6 6l12 12"
               />
             </svg>
           </button>
         </div>
       </div>

       {/* Video Content */}
       <div className="relative flex-grow bg-black flex items-center justify-center">
         <video
           controls
           autoPlay
           className="w-full h-full object-contain"
           // Add a key to force re-render when video changes
           key={video.id}
         >
           <source src={video.videoUrl} type="video/mp4" />
           Your browser does not support the video tag.
         </video>

         {/* Navigation Arrows */}
         {hasPrev && (
           <button
             onClick={onPrev}
             className="absolute left-2 sm:left-4 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full transition-colors"
             aria-label="Previous Video"
           >
             <svg
               xmlns="http://www.w3.org/2000/svg"
               className="h-6 w-6 sm:h-8 sm:w-8"
               fill="none"
               viewBox="0 0 24 24"
               stroke="currentColor"
             >
               <path
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 strokeWidth={2}
                 d="M15 19l-7-7 7-7"
               />
             </svg>
           </button>
         )}

         {hasNext && (
           <button
             onClick={onNext}
             className="absolute right-2 sm:right-4 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full transition-colors"
             aria-label="Next Video"
           >
             <svg
               xmlns="http://www.w3.org/2000/svg"
               className="h-6 w-6 sm:h-8 sm:w-8"
               fill="none"
               viewBox="0 0 24 24"
               stroke="currentColor"
             >
               <path
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 strokeWidth={2}
                 d="M9 5l7 7-7 7"
               />
             </svg>
           </button>
         )}
       </div>

       {/* Footer */}
       <div className="bg-gray-900 text-white p-2 sm:p-3 text-xs sm:text-sm rounded-b-lg">
         <div className="flex justify-between items-center">
           <span>Duration: {video.duration}</span>
           <span>Video ID: {video.id}</span>
         </div>
       </div>
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
    setSelectedVideoIndex((prevIndex) => {
      if (prevIndex === null || prevIndex >= videoData.length - 1) {
        return prevIndex; // Stay on last or if null
      }
      return prevIndex + 1;
    });
  }, []); // No dependencies needed if using functional update

  const prevVideo = useCallback(() => {
    setSelectedVideoIndex((prevIndex) => {
      if (prevIndex === null || prevIndex <= 0) {
        return prevIndex; // Stay on first or if null
      }
      return prevIndex - 1;
    });
  }, []); // No dependencies needed if using functional update

  const hasNext = selectedVideoIndex !== null && selectedVideoIndex < videoData.length - 1;
  const hasPrev = selectedVideoIndex !== null && selectedVideoIndex > 0;
  const selectedVideo = selectedVideoIndex !== null ? videoData[selectedVideoIndex] : null;

  // --- CHANGE IS HERE ---
  // Increased top padding from pt-4 to pt-24 (or adjust as needed based on navbar height)
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      {/* --- END OF CHANGE --- */}

      <div className="max-w-7xl mx-auto"> {/* Removed mt-12 sm:mt-16 here as padding is now on main */}
        {/* Page Heading */}
        <div className="mb-8 sm:mb-10 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3" >Video Gallery</h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our collection of high-quality videos
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {videoData.map((video, index) => (
            <VideoCard key={video.id} video={video} onClick={openModal} index={index} />
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {/* Conditionally render modal to ensure video element is fresh */}
      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={closeModal}
          onNext={nextVideo}
          onPrev={prevVideo}
          hasNext={hasNext}
          hasPrev={hasPrev}
          currentIndex={selectedVideoIndex || 0}
          totalVideos={videoData.length}
        />
      )}
    </main>
  );
}

export default VideoPage;