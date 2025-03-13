'use client';

import {
    PhoneIcon,
    MapPinIcon,
} from '@heroicons/react/24/outline';
import {
    EnvelopeIcon
} from '@heroicons/react/24/solid';
import {
    FacebookShareButton,
    FacebookIcon,
    WhatsappShareButton,
    WhatsappIcon,
} from 'react-share';
import { FaInstagram } from 'react-icons/fa';

const TopBar = () => {
    return (
        <div className="hidden md:block bg-gray-100 py-2 text-gray-600 w-full z-50">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 md:px-0">
                {/* Left Section for Icons and Number */}
                <div className="flex items-center space-x-2 sm:space-x-4">
                    <FacebookShareButton url="#">
                        <FacebookIcon size={24} round />
                    </FacebookShareButton>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <FaInstagram size={24} className="text-pink-500" />
                    </a>
                    <WhatsappShareButton url="#">
                        <WhatsappIcon size={24} round />
                    </WhatsappShareButton>
                    <div className="flex items-center space-x-2">
                        <PhoneIcon className="h-5 w-5" />
                        <a href="tel:+918888888888" className="hover:underline">+91-8888888888</a>
                    </div>
                </div>

                {/* Right Section for Email and Address */}
                <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-4 space-y-2 md:space-y-0 mt-2 md:mt-0">
                    <div className="flex items-center space-x-2">
                        <EnvelopeIcon className="h-5 w-5" />
                        <a href="mailto:websupport@justdial.com" className="hover:underline">websupport@justdial.com</a>
                    </div>

                    <div className="flex items-center space-x-2">
                        <MapPinIcon className="h-5 w-5" />
                        <span>Brahmapur, Ganjam, Odisha</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
