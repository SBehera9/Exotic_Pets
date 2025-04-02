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
    category: "Pets",
    views: "1.2M"
  },
  { 
    src: "/video/Cat.mp4", 
    title: "Curious Kitten Adventures", 
    duration: "0:28",
    category: "Pets",
    views: "890K"
  },
  { 
    src: "/video/Bird.mp4", 
    title: "Colorful Parrot Singing", 
    duration: "0:45",
    category: "Nature",
    views: "2.4M"
  },
  { 
    src: "/video/Fish.mp4", 
    title: "Aquarium Relaxation", 
    duration: "1:15",
    category: "Nature",
    views: "1.8M"
  },
  { 
    src: "/video/Bird1.mp4", 
    title: "Eagle Soaring", 
    duration: "0:52",
    category: "Wildlife",
    views: "3.1M"
  },
  { 
    src: "/video/Dog1.mp4", 
    title: "Golden Retriever Beach Day", 
    duration: "0:38",
    category: "Pets",
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

    video.addEventListener('timeupdate', updateProgress);
    return () => video.removeEventListener('timeupdate', updateProgress);
  }, [selectedIndex]);

  useEffect(() => {
    if (selectedIndex === null) return;

    const hideControls = () => {
      if (isPlaying && !isHoveringControls) {
        controlsAnim.start({ opacity: 0, y: 20 });
        setShowControls(false);
      }
    };

    const resetControlsTimeout = () => {
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
      controlsTimeout.current = setTimeout(hideControls, 3000);
    };

    if (isPlaying) {
      resetControlsTimeout();
    } else {
      setShowControls(true);
      controlsAnim.start({ opacity: 1, y: 0 });
    }

    return () => {
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
    };
  }, [isPlaying, isHoveringControls, selectedIndex, controlsAnim]);

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  const toggleFullscreen = useCallback(() => {
    if (!modalRef.current) return;

    if (!isFullscreen) {
      modalRef.current.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  }, [isFullscreen]);

  const seek = useCallback((seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime += seconds;
  }, []);

  const closeModal = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setSelectedIndex(null);
    setIsPlaying(false);
    setProgress(0);
    document.body.style.overflow = 'auto';
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;

      switch (e.key) {
        case ' ':
          togglePlay();
          break;
        case 'ArrowLeft':
          seek(-5);
          break;
        case 'ArrowRight':
          seek(5);
          break;
        case 'm':
          toggleMute();
          break;
        case 'f':
          toggleFullscreen();
          break;
        case 'Escape':
          if (isFullscreen) {
            toggleFullscreen();
          } else {
            closeModal();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, isPlaying, isMuted, isFullscreen, togglePlay, toggleMute, toggleFullscreen, closeModal, seek]);

  const handleFullscreenChange = useCallback(() => {
    setIsFullscreen(!!document.fullscreenElement);
  }, []);

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [handleFullscreenChange]);

  const openModal = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const nextVideo = () => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % filteredVideos.length : 0
    );
    setIsPlaying(false);
    setProgress(0);
  };

  const prevVideo = () => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + filteredVideos.length) % filteredVideos.length : 0
    );
    setIsPlaying(false);
    setProgress(0);
  };

  const handleVideoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    togglePlay();
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * videoRef.current.duration;
  };

  const handleControlsMouseEnter = () => {
    setIsHoveringControls(true);
    controlsAnim.start({ opacity: 1, y: 0 });
    setShowControls(true);
  };

  const handleControlsMouseLeave = () => {
    setIsHoveringControls(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
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
              key={index}
              className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer group"
              onClick={() => openModal(index)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              whileHover={{ y: -5 }}
            >
              <div className="aspect-video relative">
                <video 
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  muted
                  loop
                  playsInline
                  poster={`/thumbnails/${video.src.split('/').pop()?.replace('.mp4', '.jpg')}`}
                >
                  <source src={video.src} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-between p-3 sm:p-4">
                  <div className="flex justify-between items-start">
                    <span className="bg-black/60 text-white text-[10px] sm:text-xs px-2 py-1 rounded">
                      {video.category}
                    </span>
                    <span className="bg-black/60 text-white text-[10px] sm:text-xs px-2 py-1 rounded flex items-center">
                      <Play size={10} className="mr-1" />
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
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
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
            View Full Video
          </motion.button>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 px-4 backdrop-blur-sm"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            ref={modalRef}
          >
            <motion.div
              className="relative w-full max-w-6xl"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={closeModal}
                className="absolute -top-12 sm:-top-16 right-0 text-white/80 hover:text-white p-1 sm:p-2 transition-all z-20"
              >
                <X size={28} className="sm:size-9" />
              </button>

              <div className="relative aspect-video bg-black rounded-lg sm:rounded-xl overflow-hidden shadow-2xl">
                <video
                  key={selectedIndex}
                  ref={videoRef}
                  className="w-full h-full object-contain cursor-pointer"
                  controls={false}
                  autoPlay
                  onClick={handleVideoClick}
                >
                  <source src={filteredVideos[selectedIndex].src} type="video/mp4" />
                </video>
                
                {showControls && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={controlsAnim}
                    initial={{ opacity: 1 }}
                    onMouseEnter={handleControlsMouseEnter}
                    onMouseLeave={handleControlsMouseLeave}
                  >
                    {!isPlaying && (
                      <button 
                        onClick={togglePlay}
                        className="p-2 sm:p-4 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all"
                      >
                        <Play size={40} className="text-white pl-1 sm:pl-2 sm:size-[60px]" />
                      </button>
                    )}
                  </motion.div>
                )}

                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-4 pt-6 sm:pt-8"
                  animate={controlsAnim}
                  initial={{ opacity: 1 }}
                  onMouseEnter={handleControlsMouseEnter}
                  onMouseLeave={handleControlsMouseLeave}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 px-1 sm:px-2 gap-2 sm:gap-0">
                    <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
                      <button 
                        onClick={togglePlay}
                        className="text-white hover:text-green-300 transition-colors"
                      >
                        {isPlaying ? <Pause size={20} className="sm:size-6" /> : <Play size={20} className="sm:size-6" />}
                      </button>
                      <button 
                        onClick={toggleMute}
                        className="text-white hover:text-green-300 transition-colors"
                      >
                        {isMuted ? <VolumeX size={20} className="sm:size-6" /> : <Volume2 size={20} className="sm:size-6" />}
                      </button>
                      <span className="text-white text-xs sm:text-sm font-medium">
                        {videoRef.current && formatTime(videoRef.current.currentTime)} / {filteredVideos[selectedIndex].duration}
                      </span>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-2 sm:space-x-4">
                      <span className="text-white text-xs sm:text-sm font-medium truncate max-w-[120px] sm:max-w-[180px] md:max-w-none">
                        {filteredVideos[selectedIndex].title}
                      </span>
                      <button 
                        onClick={toggleFullscreen}
                        className="text-white hover:text-green-300 transition-colors"
                      >
                        {isFullscreen ? <Minimize size={20} className="sm:size-6" /> : <Maximize size={20} className="sm:size-6" />}
                      </button>
                    </div>
                  </div>
                  
                  <div 
                    className="h-1.5 sm:h-2 bg-white/20 rounded-full w-full cursor-pointer relative overflow-hidden"
                    onClick={handleSeek}
                  >
                    <div 
                      className="h-full bg-green-500 absolute top-0 left-0"
                      style={{ width: `${progress}%` }}
                    >
                      <div className="h-full w-1.5 sm:w-2 bg-white absolute right-0 -mr-0.5 sm:-mr-1"></div>
                    </div>
                  </div>
                </motion.div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevVideo();
                }}
                className="absolute top-1/2 -left-8 sm:-left-12 transform -translate-y-1/2 text-white/80 hover:text-white p-1 sm:p-2 bg-black/50 rounded-full transition-all hover:bg-black/70"
              >
                <ChevronLeft size={20} className="sm:size-8" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextVideo();
                }}
                className="absolute top-1/2 -right-8 sm:-right-12 transform -translate-y-1/2 text-white/80 hover:text-white p-1 sm:p-2 bg-black/50 rounded-full transition-all hover:bg-black/70"
              >
                <ChevronRight size={20} className="sm:size-8" />
              </button>

              <div className="absolute -bottom-12 sm:-bottom-16 left-0 text-white/70 text-xs sm:text-sm">
                Video {selectedIndex + 1} of {filteredVideos.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideosSection;