'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';
import Image from 'next/image';

type VideoItem = {
  id: number;
  src: string;
  thumbnail: string;
  title: string;
  duration: string;
  views: string;
};

const videoData: VideoItem[] = [
  {
    id: 1,
    src: '/video/Dog.mp4',
    thumbnail: '/thumbnails/dog.jpg',
    title: 'Happy Puppy Playtime',
    duration: '0:32',
    views: '1.2M'
  },
  {
    id: 2,
    src: '/video/Cat.mp4',
    thumbnail: '/thumbnails/cat.jpg',
    title: 'Curious Kitten Adventures',
    duration: '0:28',
    views: '890K'
  },
  {
    id: 3,
    src: '/video/Bird.mp4',
    thumbnail: '/thumbnails/bird.jpg',
    title: 'Colorful Parrot Singing',
    duration: '0:45',
    views: '2.4M'
  },
  {
    id: 4,
    src: '/video/Fish.mp4',
    thumbnail: '/thumbnails/fish.jpg',
    title: 'Aquarium Relaxation',
    duration: '1:15',
    views: '1.8M'
  },
  {
    id: 5,
    src: '/video/Bird1.mp4',
    thumbnail: '/thumbnails/bird1.jpg',
    title: 'Eagle Soaring',
    duration: '0:52',
    views: '3.1M'
  },
  {
    id: 6,
    src: '/video/Dog1.mp4',
    thumbnail: '/thumbnails/dog1.jpg',
    title: 'Golden Retriever Beach Day',
    duration: '0:38',
    views: '2.7M'
  },
  {
    id: 7,
    src: '/video/Cat1.mp4',
    thumbnail: '/thumbnails/cat1.jpg',
    title: 'Sleepy Cat Nap',
    duration: '1:05',
    views: '1.5M'
  },
  {
    id: 8,
    src: '/video/Fish1.mp4',
    thumbnail: '/thumbnails/fish1.jpg',
    title: 'Coral Reef Exploration',
    duration: '1:30',
    views: '2.1M'
  },
  {
    id: 9,
    src: '/video/Dog2.mp4',
    thumbnail: '/thumbnails/dog2.jpg',
    title: 'Border Collie Herding',
    duration: '0:45',
    views: '3.5M'
  },
  {
    id: 10,
    src: '/video/Bird2.mp4',
    thumbnail: '/thumbnails/bird2.jpg',
    title: 'Hummingbird Feeding',
    duration: '0:40',
    views: '1.9M'
  },
  {
    id: 11,
    src: '/video/Cat2.mp4',
    thumbnail: '/thumbnails/cat2.jpg',
    title: 'Playful Kittens',
    duration: '0:50',
    views: '2.8M'
  },
  {
    id: 12,
    src: '/video/Fish2.mp4',
    thumbnail: '/thumbnails/fish2.jpg',
    title: 'Deep Sea Creatures',
    duration: '1:20',
    views: '1.7M'
  },
];

const VideoPage = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHoveringControls, setIsHoveringControls] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const controlsTimeout = useRef<NodeJS.Timeout | null>(null);
  const controlsAnim = useAnimationControls();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || selectedIndex === null) return;

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
      if (isPlaying && !videoRef.current?.paused) {
        controlsTimeout.current = setTimeout(hideControls, 3000);
      }
    };

    const modalElement = modalRef.current;
    if (modalElement) {
      modalElement.addEventListener('mousemove', resetControlsTimeout);
    }

    resetControlsTimeout();

    return () => {
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
      if (modalElement) {
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
    if (document.fullscreenElement) {
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
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
    setIsPlaying(false);
    setProgress(0);
  };

  const nextVideo = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % videoData.length : 0
    );
  }, []);

  const prevVideo = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + videoData.length) % videoData.length : 0
    );
  }, []);

  const handleVideoClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    togglePlay();
  }, [togglePlay]);

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !videoRef.current.duration) return;

    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * videoRef.current.duration;
    setProgress(pos * 100);
  }, []);

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
    if (index === null || index < 0 || index >= videoData.length) return "0:00";
    const video = videoRef.current;
    if (video && video.duration && isFinite(video.duration)) {
      return formatTime(video.duration);
    }
    return videoData[index].duration;
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-green-50 py-8 md:py-12 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-3"
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
            className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 mx-auto rounded-full mb-6"
          />
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our collection of beautiful moments captured on video
          </p>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
          {videoData.map((video, index) => (
            <motion.div
              key={video.id}
              className="relative rounded-lg sm:rounded-xl overflow-hidden shadow-md sm:shadow-lg cursor-pointer group"
              onClick={() => openModal(index)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -3 }}
            >
              <div className="aspect-video relative">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 33vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-between p-2 sm:p-3 pointer-events-none">
                  <div className="flex justify-end items-start">
                    <span className="bg-black/60 text-white text-[8px] sm:text-[10px] px-1 py-0.5 sm:px-2 sm:py-1 rounded">
                      {video.views}
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-white font-bold text-[10px] sm:text-xs md:text-sm line-clamp-2 leading-tight">
                      {video.title}
                    </h3>
                    <div className="flex items-center text-green-200 text-[8px] sm:text-[10px]">
                      <span>{video.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/90 rounded-full flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform shadow-md">
                    <Play size={12} className="text-green-600 pl-0.5 sm:size-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedIndex !== null && (
            <motion.div
              ref={modalRef}
              className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 px-3 sm:px-4 backdrop-blur-sm"
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
                      : '-top-8 right-0 sm:top-0 sm:-right-10'
                  }`}
                  aria-label="Close video player"
                >
                  <X size={24} className="sm:size-8" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevVideo();
                  }}
                  className={`absolute top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white p-1 sm:p-2 bg-black/30 hover:bg-black/60 rounded-full transition-all z-[55] ${
                    isFullscreen
                      ? 'left-4 fixed -translate-x-0'
                      : 'left-0 -translate-x-full mx-1 sm:mx-2'
                  }`}
                  aria-label="Previous video"
                >
                  <ChevronLeft size={18} className="sm:size-7" />
                </button>

                <div className="relative aspect-video w-full rounded-lg sm:rounded-xl overflow-hidden shadow-xl">
                  <video
                    key={videoData[selectedIndex].src}
                    ref={videoRef}
                    className="w-full h-full object-contain cursor-pointer"
                    controls={false}
                    onClick={handleVideoClick}
                    onDoubleClick={toggleFullscreen}
                    playsInline
                    preload="auto"
                  >
                    <source src={videoData[selectedIndex].src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  <AnimatePresence>
                    {!isPlaying && showControls && (
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center bg-black/30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            togglePlay();
                          }}
                          className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-all"
                        >
                          <Play size={32} className="text-white pl-1 sm:pl-2 sm:size-[50px]" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 sm:p-3 pt-4 sm:pt-6 z-10"
                    animate={controlsAnim}
                    initial={{ opacity: 1, y: 0 }}
                    onMouseEnter={handleControlsMouseEnter}
                    onMouseLeave={handleControlsMouseLeave}
                  >
                    <div
                      className="h-1.5 sm:h-2 bg-white/20 hover:h-2 sm:hover:h-2.5 rounded-full w-full cursor-pointer relative group mb-1 sm:mb-2 transition-all duration-200"
                      onClick={handleSeek}
                    >
                      <div
                        className="h-full bg-green-500 absolute top-0 left-0 rounded-full pointer-events-none"
                        style={{ width: `${progress}%` }}
                      >
                        <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 bg-white rounded-full absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 sm:gap-3">
                      <div className="flex items-center space-x-1 sm:space-x-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            togglePlay();
                          }}
                          className="text-white hover:text-green-300 transition-colors"
                        >
                          {isPlaying ? <Pause size={18} className="sm:size-5" /> : <Play size={18} className="sm:size-5" />}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMute();
                          }}
                          className="text-white hover:text-green-300 transition-colors"
                        >
                          {isMuted ? <VolumeX size={18} className="sm:size-5" /> : <Volume2 size={18} className="sm:size-5" />}
                        </button>
                        <span className="text-white text-xs sm:text-sm font-medium tabular-nums">
                          {formatTime(videoRef.current?.currentTime ?? 0)} / {getVideoDuration(selectedIndex)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 sm:space-x-3">
                        <span className="text-white text-xs sm:text-sm font-medium hidden sm:block truncate max-w-[120px] md:max-w-[200px] lg:max-w-[300px]">
                          {selectedIndex !== null ? videoData[selectedIndex].title : ''}
                        </span>
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
                          className="text-white hover:text-green-300 transition-colors"
                          aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                        >
                          {isFullscreen ? <Minimize size={18} className="sm:size-5" /> : <Maximize size={18} className="sm:size-5" />}
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
                      : 'right-0 translate-x-full mx-1 sm:mx-2'
                  }`}
                  aria-label="Next video"
                >
                  <ChevronRight size={18} className="sm:size-7" />
                </button>

                <div className={`absolute text-white/70 text-xs sm:text-sm whitespace-nowrap ${
                  isFullscreen
                    ? 'bottom-4 left-1/2 transform -translate-x-1/2 fixed'
                    : '-bottom-6 sm:-bottom-7 left-1/2 transform -translate-x-1/2'
                }`}>
                  Video {selectedIndex !== null ? selectedIndex + 1 : 0} of {videoData.length}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default VideoPage;