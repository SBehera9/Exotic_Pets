"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Maximize, Minimize } from "lucide-react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { useRouter } from "next/navigation";

type VideoItem = {
  src: string;
  title: string;
  duration: string;
  category: string;
  views?: string;
};

const videoFiles: VideoItem[] = [
  {
    src: "/video/Dog.mp4",
    title: "Happy Puppy Playtime",
    duration: "0:32",
    category: "Dog",
    views: "1.2M"
  },
  {
    src: "/video/Cat.mp4",
    title: "Curious Kitten Adventures",
    duration: "0:28",
    category: "Cat",
    views: "890K"
  },
  {
    src: "/video/Bird.mp4",
    title: "Colorful Parrot Singing",
    duration: "0:45",
    category: "Bird",
    views: "2.4M"
  },
  {
    src: "/video/Fish.mp4",
    title: "Aquarium Relaxation",
    duration: "1:15",
    category: "Fish",
    views: "1.8M"
  },
  {
    src: "/video/Bird1.mp4",
    title: "Eagle Soaring",
    duration: "0:52",
    category: "Bird",
    views: "3.1M"
  },
  {
    src: "/video/Dog1.mp4",
    title: "Golden Retriever Beach Day",
    duration: "0:38",
    category: "Dog",
    views: "2.7M"
  },
];

const VideosSection = () => {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); 
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHoveringControls, setIsHoveringControls] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const controlsTimeout = useRef<NodeJS.Timeout | null>(null);
  const controlsAnim = useAnimationControls();

  const filteredVideos = activeCategory === "All"
    ? videoFiles
    : videoFiles.filter(video => video.category === activeCategory);

  const categories = ["All", ...new Set(videoFiles.map(video => video.category))];

  const handleViewMore = () => {
    router.push("/videopage");
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      setProgress((video.currentTime / video.duration) * 100 || 0);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
        setIsPlaying(false);
    };

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

     video.play().catch(error => {
        console.log("Autoplay prevented:", error);
        setIsPlaying(false);
     });
     video.muted = isMuted; 

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, [selectedIndex, isMuted]);

  useEffect(() => {
    if (selectedIndex === null) return;

    const hideControls = () => {
      if (isPlaying && !isHoveringControls && !videoRef.current?.paused) { 
        controlsAnim.start({ opacity: 0, y: 20 });
        setShowControls(false);
      }
    };

    const resetControlsTimeout = () => {
      controlsAnim.start({ opacity: 1, y: 0 }); 
      setShowControls(true);
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
      if(isPlaying && !videoRef.current?.paused){
         controlsTimeout.current = setTimeout(hideControls, 3000);
      }
    };

    const modalElement = modalRef.current;
    if(modalElement) {
        modalElement.addEventListener('mousemove', resetControlsTimeout);
    }

    resetControlsTimeout();


    return () => {
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
      if(modalElement) {
         modalElement.removeEventListener('mousemove', resetControlsTimeout);
      }
    };
  }, [isPlaying, isHoveringControls, selectedIndex, controlsAnim]);

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      const newMutedState = !videoRef.current.muted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!modalRef.current) return; 

    const isInFullscreen = !!document.fullscreenElement;

    if (!isInFullscreen) {
      modalRef.current.requestFullscreen?.().catch(err => {
         console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      if (document.exitFullscreen) {
         document.exitFullscreen();
      }
    }
  }, []);

  const seek = useCallback((seconds: number) => {
    if (!videoRef.current) return;
    const newTime = videoRef.current.currentTime + seconds;
    videoRef.current.currentTime = Math.max(0, Math.min(newTime, videoRef.current.duration));
  }, []);

  const closeModal = useCallback(() => {
    if(document.fullscreenElement) {
        document.exitFullscreen();
    }
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setSelectedIndex(null);
    setIsPlaying(false);
    setProgress(0);
    setIsFullscreen(false); 
    document.body.style.overflow = 'auto';
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;

       if (e.key === ' ' || e.code === 'Space') {
         e.preventDefault();
         togglePlay();
       }

      switch (e.key) {

        case 'ArrowLeft':
          seek(-5);
          break;
        case 'ArrowRight':
          seek(5);
          break;
        case 'm':
        case 'M':
          toggleMute();
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
        case 'Escape':
          if (document.fullscreenElement) {
            document.exitFullscreen();
          } else {
            closeModal();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, togglePlay, toggleMute, toggleFullscreen, closeModal, seek]); 


  const handleFullscreenChange = useCallback(() => {
    setIsFullscreen(!!document.fullscreenElement);
  }, []);

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [handleFullscreenChange]);

  const openModal = (index: number) => {
     const actualIndex = videoFiles.indexOf(filteredVideos[index]); 
    setSelectedIndex(index); 
    document.body.style.overflow = 'hidden';
    setIsPlaying(false);
    setProgress(0);
  };

  const nextVideo = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % filteredVideos.length : 0
    );
    
  }, [filteredVideos.length]);

  const prevVideo = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + filteredVideos.length) % filteredVideos.length : 0
    );
     
  }, [filteredVideos.length]);


  const handleVideoClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); 
    togglePlay();
  },[togglePlay]);

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !videoRef.current.duration) return;

    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * videoRef.current.duration;
    setProgress(pos * 100); 
  },[]);


  const handleControlsMouseEnter = () => {
    setIsHoveringControls(true);
  };

  const handleControlsMouseLeave = () => {
    setIsHoveringControls(false);
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || time === Infinity) return "0:00";
    const totalSeconds = Math.floor(time);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

    const getVideoDuration = (index: number | null): string => {
     if (index === null || index < 0 || index >= filteredVideos.length) return "0:00";
     const video = videoRef.current;
     if (video && video.duration && isFinite(video.duration)) {
         return formatTime(video.duration);
     }
     return filteredVideos[index].duration; 
 };


  return (
    <div className="bg-gradient-to-b from-white to-green-50 py-12 md:py-20 px-4 sm:px-6" id="videos">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 md:mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Video <span className="text-green-600">Gallery</span>
          </motion.h2>
          <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="w-32 h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-600 mx-auto rounded-full mb-8"
          />
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our collection of beautiful moments captured on video
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 md:mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-1 sm:px-4 sm:py-1.5 md:px-5 md:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {filteredVideos.map((video, index) => (
            <motion.div
              key={video.src}
              className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer group"
              onClick={() => openModal(index)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.2 }} 
              whileHover={{ y: -5 }}
            >
              <div className="aspect-video relative">
                
                <video
                  className="w-full h-full " 
                  muted
                  loop
                  playsInline 
                  preload="metadata" 
                  onMouseOver={event => event.currentTarget.play()}
                  onMouseOut={event => event.currentTarget.pause()}
                >
                  <source src={video.src} type="video/mp4" />
                </video>

                <div className="absolute inset-0 via-transparent to-transparent flex flex-col justify-between p-3 sm:p-4 pointer-events-none"> 
                   <div className="flex justify-between items-start">
                    <span className="bg-black/60 text-white text-[10px] sm:text-xs px-2 py-1 rounded">
                      {video.category}
                    </span>
                    <span className="bg-black/60 text-white text-[10px] sm:text-xs px-2 py-1 rounded flex items-center">
                      {video.views}
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-white font-bold text-xs sm:text-sm md:text-base line-clamp-2 leading-tight">
                      {video.title}
                    </h3>
                    <div className="flex items-center text-green-200 text-[10px] sm:text-xs">
                      <span>{video.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/90 rounded-full flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform shadow-lg">
                    <Play size={16} className="text-green-600 pl-1 sm:size-5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredVideos.length > 0 && (
          <motion.div
            className="text-center mt-12 md:mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
         <motion.button
            onClick={handleViewMore}
            className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(5, 150, 105, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
<<<<<<< HEAD
            View More
=======
            View Full Video Page
>>>>>>> c334a547a28b0b133492a9d59854b64b1e540e87
          </motion.button>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            ref={modalRef}
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 px-4 backdrop-blur-sm"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ backgroundColor: isFullscreen ? 'black' : undefined }}
          >
            <motion.div
              className={`relative flex items-center justify-center ${
                isFullscreen
                  ? 'w-screen h-screen max-w-none max-h-none' 
                  : 'w-full max-w-6xl max-h-[90vh]'        
              }`}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={closeModal}
                className={`absolute text-white/80 hover:text-white p-1 sm:p-2 transition-all z-[60] ${
                  isFullscreen
                    ? 'top-4 right-4 fixed' 
                    : '-top-10 right-0 sm:top-0 sm:-right-12' 
                }`}
                aria-label="Close video player"
              >
                <X size={28} className="sm:size-9" />
              </button>

               <button
                onClick={(e) => {
                  e.stopPropagation(); 
                  prevVideo();
                }}
               
                className={`absolute top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white p-1 sm:p-2 bg-black/30 hover:bg-black/60 rounded-full transition-all z-[55] ${ 
                  isFullscreen
                    ? 'left-4 fixed -translate-x-0' 
                    : 'left-0 -translate-x-full mx-2' 
                }`}
                aria-label="Previous video"
              >
                <ChevronLeft size={20} className="sm:size-8" />
              </button>

              <div className="relative aspect-video w-full rounded-lg sm:rounded-xl overflow-hidden shadow-2xl">
                <video
                  key={filteredVideos[selectedIndex].src}
                  ref={videoRef}
                  className="w-full h-full object-contain cursor-pointer"
                  controls={false}
                  onClick={handleVideoClick}
                  onDoubleClick={toggleFullscreen}
                  playsInline
                  preload="auto"
                >
                  <source src={filteredVideos[selectedIndex].src} type="video/mp4" />
                   Your browser does not support the video tag.
                </video>

                <AnimatePresence>
                {!isPlaying && showControls && (
                   <motion.div /* ... */ >
                     <button /* ... */ >
                        <Play size={40} className="text-white pl-1 sm:pl-2 sm:size-[60px]" />
                    </button>
                  </motion.div>
                 )}
                 </AnimatePresence>

                 <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-4 pt-6 sm:pt-8 z-10"
                  animate={controlsAnim}
                  initial={{ opacity: 1, y: 0 }}
                  onMouseEnter={handleControlsMouseEnter}
                  onMouseLeave={handleControlsMouseLeave}
                 >
                    <div
                      className="h-1.5 sm:h-2 bg-white/20 hover:h-2 sm:hover:h-2.5 rounded-full w-full cursor-pointer relative group mb-2 sm:mb-3 transition-all duration-200"
                      onClick={handleSeek}
                    >
                      <div
                        className="h-full bg-green-500 absolute top-0 left-0 rounded-full pointer-events-none"
                        style={{ width: `${progress}%` }}
                      >
                        <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 bg-white rounded-full absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      </div>
                    </div>

                   <div className="flex items-center justify-between gap-3 sm:gap-4">
                      <div className="flex items-center space-x-2 sm:space-x-4">
                        <button onClick={(e) => { e.stopPropagation(); togglePlay(); }} /* ... */ >
                          {isPlaying ? <Pause size={20} className="sm:size-6" /> : <Play size={20} className="sm:size-6" />}
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); toggleMute(); }} /* ... */ >
                          {isMuted ? <VolumeX size={20} className="sm:size-6" /> : <Volume2 size={20} className="sm:size-6" />}
                        </button>
                        <span className="text-white text-xs sm:text-sm font-medium tabular-nums">
                           {formatTime(videoRef.current?.currentTime ?? 0)} / {getVideoDuration(selectedIndex)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-4">
                         <span className="text-white text-xs sm:text-sm font-medium hidden md:block truncate max-w-[150px] lg:max-w-[300px]">
                           {selectedIndex !== null ? filteredVideos[selectedIndex].title : ''}
                         </span>
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
                          className="text-white hover:text-green-300 transition-colors"
                           aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                        >
                          {isFullscreen ? <Minimize size={20} className="sm:size-6" /> : <Maximize size={20} className="sm:size-6" />}
                        </button>
                      </div>
                    </div>
                  </motion.div>
              </div> 
               <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextVideo();
                }}
                className={`absolute top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white p-1 sm:p-2 bg-black/30 hover:bg-black/60 rounded-full transition-all z-[55] ${
                  isFullscreen
                    ? 'right-4 fixed translate-x-0'
                    : 'right-0 translate-x-full mx-2' 
                }`}
                 aria-label="Next video"
              >
                <ChevronRight size={20} className="sm:size-8" />
              </button>

              <div className={`absolute text-white/70 text-xs sm:text-sm whitespace-nowrap ${
                 isFullscreen
                    ? 'bottom-4 left-1/2 transform -translate-x-1/2 fixed' 
                    : '-bottom-8 left-1/2 transform -translate-x-1/2'
              }`}>
                 Video {selectedIndex !== null ? selectedIndex + 1 : 0} of {filteredVideos.length}
              </div>

            </motion.div> 
          </motion.div> 
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideosSection;