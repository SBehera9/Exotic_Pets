"use client"; 
import {
  PhoneIcon,
  MapPinIcon,
  UserIcon,
} from '@heroicons/react/24/outline'; 
import {
  EnvelopeIcon
} from '@heroicons/react/24/solid';  
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';

const TopBar = () => {
  return (
    <div className="bg-gray-100 py-2 text-gray-600">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
         <FacebookShareButton url="#">
            <FacebookIcon size={24} round />
          </FacebookShareButton>
          <LinkedinShareButton url="#">
            <LinkedinIcon size={24} round />
          </LinkedinShareButton>
          <TwitterShareButton url="#">
            <TwitterIcon size={24} round />
          </TwitterShareButton>

          <div className="hidden md:flex items-center space-x-2">
            <PhoneIcon className="h-5 w-5" />
            <span>+91-8888888888</span>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <EnvelopeIcon className="h-5 w-5" />
            <span>websupport@justdial.com</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <MapPinIcon className="h-5 w-5" />
            <span>Malad West</span>
          </div>

          <div className="flex items-center space-x-2">
            <UserIcon className="h-5 w-5" />
            <span>Log In | Sign Up</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;