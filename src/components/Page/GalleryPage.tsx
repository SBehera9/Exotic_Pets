'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';

interface Image {
  id: number;
  imageUrl: string;
}

const imageData: Image[] = [
  { id: 1, imageUrl: '/images/landscape1.jpg' },
  { id: 2, imageUrl: '/images/city1.jpg' },
  { id: 3, imageUrl: '/images/abstract1.jpg' },
  { id: 4, imageUrl: '/images/wildlife1.jpg' },
  { id: 5, imageUrl: '/images/minimalist1.jpg' },
  { id: 6, imageUrl: '/images/portrait1.jpg' },
  { id: 7, imageUrl: '/images/food1.jpg' },
  { id: 8, imageUrl: '/images/architecture1.jpg' },
  { id: 9, imageUrl: '/images/macro1.jpg' },
  { id: 10, imageUrl: '/images/sunset1.jpg' },
  { id: 11, imageUrl: '/images/flower1.jpg' },
  { id: 12, imageUrl: '/images/sports1.jpg' },
];

interface ImageCardProps {
  image: Image;
  onClick: (image: Image) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => {
  return (
    <div
      className="group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={() => onClick(image)}
    >
      <div className="relative w-full h-48">
        <Image
          src={image.imageUrl}
          alt={`Image ${image.id}`}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      </div>
    </div>
  );
};

interface ImageModalProps {
  image: Image | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, onClose, onNext, onPrev, hasNext, hasPrev }) => {
  if (!image) return null;

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
        <div className="p-4 flex justify-center items-center w-full h-[70vh] relative">
          <Image src={image.imageUrl} alt="Image" layout="fill" objectFit="contain" />
        </div>

        {hasPrev && (
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-full p-2"
            aria-label="Previous Image"
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
            aria-label="Next Image"
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

function GalleryPage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openModal = (image: Image, index: number) => {
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = useCallback(() => {
    if (selectedImageIndex !== null && selectedImageIndex < imageData.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  }, [selectedImageIndex]);

  const prevImage = useCallback(() => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  }, [selectedImageIndex]);

  const hasNext = selectedImageIndex !== null && selectedImageIndex < imageData.length - 1;
  const hasPrev = selectedImageIndex !== null && selectedImageIndex > 0;

  const selectedImage = selectedImageIndex !== null ? imageData[selectedImageIndex] : null;

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {imageData.map((image, index) => (
            <ImageCard key={image.id} image={image} onClick={() => openModal(image, index)} />
          ))}
        </div>
      </div>
      <ImageModal
        image={selectedImage}
        onClose={closeModal}
        onNext={nextImage}
        onPrev={prevImage}
        hasNext={hasNext}
        hasPrev={hasPrev}
      />
    </div>
  );
}

export default GalleryPage;
