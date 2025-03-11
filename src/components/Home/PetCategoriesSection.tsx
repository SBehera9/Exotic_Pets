import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface PetCategory {
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    link: string;
}

const petCategories: PetCategory[] = [
    {
        title: 'Dogs',
        description: 'Find the perfect canine companion! We offer a variety of dog breeds, from playful puppies to loyal adult dogs.',
        imageSrc: '/Dog.jpeg',
        imageAlt: 'Dogs',
        link: '/dogs',
    },
    {
        title: 'Birds',
        description: 'Add a touch of color and song to your life! Explore our range of beautiful birds, from finches to parrots.',
        imageSrc: '/Birds.jpeg',
        imageAlt: 'Birds',
        link: '/birds',
    },
    {
        title: 'Cats',
        description: 'Discover your purrfect feline friend! Our selection includes cuddly kittens and graceful adult cats, all ready for a loving home.',
        imageSrc: '/Cat.jpeg',
        imageAlt: 'Cats',
        link: '/cats',
    },
    {
        title: 'Small Fish',
        description: 'Create a mesmerizing underwater world! We have a diverse collection of colorful freshwater and saltwater fish.',
        imageSrc: '/Fish.jpeg',
        imageAlt: 'Small Fish',
        link: '/fish',
    },
];

const PetCategoriesSection = () => {
    const imageSize = 250; 

    return (
        <div className="bg-white py-16" id="pet-categories">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-semibold text-green-600 mb-8">Pets</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {petCategories.map((category, index) => (
                        <div key={index} className="relative flex flex-col items-center transform transition-transform hover:scale-110">
                            <div className="w-[250px] h-[250px] bg-gray-100 shadow-md rounded-lg overflow-hidden relative">
                                <Image
                                    src={category.imageSrc}
                                    alt={category.imageAlt}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg"
                                />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mt-4 text-center">{category.title}</h3>
                            <p className="text-gray-600 text-center">{category.description}</p>
                        </div>
                    ))}
                </div>

                <Link href="/all-pets" className="mt-8 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-block">
                    Explore All Pets
                </Link>
            </div>
        </div>
    );
};

export default PetCategoriesSection;
