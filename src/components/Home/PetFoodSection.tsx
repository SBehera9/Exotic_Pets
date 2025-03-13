"use client";

import React from 'react';
import Image from 'next/image';

interface PetFood {
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    link: string;
}

const petFoods: PetFood[] = [
    {
        title: 'Dog Food',
        description: 'High-quality kibble and wet food to keep your dog happy and healthy. Variety of flavors and formulations.',
        imageSrc: '/Dog_Food.jpeg',
        imageAlt: 'Dog Food',
        link: '/dog-food',
    },
    {
        title: 'Bird Food',
        description: 'Seed mixes, pellets, and treats for all types of birds. Provide your feathered friends with the best nutrition.',
        imageSrc: '/Birds_Food.jpg',
        imageAlt: 'Bird Food',
        link: '/bird-food',
    },
    {
        title: 'Cat Food',
        description: 'Delicious and balanced meals for your feline friend. From dry kibble to savory wet food.',
        imageSrc: '/Cat_Food.jpeg',
        imageAlt: 'Cat Food',
        link: '/cat-food',
    },
    {
        title: 'Fish Food',
        description: 'Nutritious flakes and pellets for a vibrant and healthy aquarium. Complete diets for all types of fish.',
        imageSrc: '/Fish_Food.jpeg',
        imageAlt: 'Fish Food',
        link: '/fish-food',
    },
];

const PetFoodSection = () => {
    const handleViewMore = () => {
        window.location.href = '/all-pet-food';
    };

    return (
        <div className="bg-white mt-0 pt-0 pb-16">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-semibold text-green-600 mb-8">Pet Food</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {petFoods.map((food, index) => (
                        <div key={index} className="relative flex flex-col items-center transform transition-transform hover:scale-110">
                            <div className="w-[250px] h-[250px] bg-gray-100 shadow-md rounded-lg overflow-hidden relative">
                                <Image
                                    src={food.imageSrc}
                                    alt={food.imageAlt}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg"
                                />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mt-4 text-center">{food.title}</h3>
                            <p className="text-gray-600 text-center">{food.description}</p>
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

export default PetFoodSection;
