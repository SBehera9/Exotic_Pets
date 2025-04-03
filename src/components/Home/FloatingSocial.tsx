"use client";

import { useState, useEffect } from "react";
import { FaWhatsapp, FaInstagram, FaFacebook, FaChevronDown, FaCommentAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function FloatingSocial() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const socialLinks = [
    {
      icon: <FaWhatsapp />,
      href: "https://wa.me/918328873021",
      bg: "bg-[#25D366]",
      hoverBg: "bg-[#128C7E]",
      tooltip: "Chat on WhatsApp"
    },
    {
      icon: <FaInstagram />,
      href: "https://www.instagram.com/your-instagram",
      bg: "bg-gradient-to-tr from-[#833AB4] via-[#C13584] to-[#E1306C]",
      hoverBg: "bg-gradient-to-tr from-[#6a2a92] via-[#a02a6d] to-[#c22558]",
      tooltip: "Follow on Instagram"
    },
    {
      icon: <FaFacebook />,
      href: "https://www.facebook.com/your-facebook",
      bg: "bg-[#1877F2]",
      hoverBg: "bg-[#166FE5]",
      tooltip: "Connect on Facebook"
    }
  ];

  const toggleButtonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.95 }
  };

  const socialButtonVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    hover: { scale: 1.1, y: -5 }
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isScrolled ? 'translate-y-0' : 'translate-y-20'}`}>
      <div className="flex flex-col items-end gap-3">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-3 items-end"
            >
              {socialLinks.map((link, index) => (
                <motion.div
                  key={index}
                  variants={socialButtonVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  whileHover="hover"
                  transition={{ 
                    type: "spring",
                    stiffness: 300,
                    damping: 10,
                    delay: index * 0.1
                  }}
                  className="relative group"
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${link.bg} hover:${link.hoverBg} text-white p-3 rounded-full shadow-xl flex items-center justify-center text-2xl transition-all duration-200`}
                  >
                    {link.icon}
                  </a>
                  <div className="absolute right-14 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    {link.tooltip}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-gray-800 transform rotate-45" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          variants={toggleButtonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className={`${isOpen ? 'bg-gray-700' : 'bg-gradient-to-r from-emerald-500 to-blue-500'} text-white p-4 rounded-full shadow-2xl flex items-center justify-center text-2xl relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 opacity-0 hover:opacity-100 transition-opacity duration-300" />
          <span className="relative z-10">
            {isOpen ? <FaChevronDown /> : <FaCommentAlt />}
          </span>
          {!isOpen && (
            <motion.span 
              className="absolute flex h-3 w-3 -top-1 -right-1"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
            </motion.span>
          )}
        </motion.button>
      </div>
    </div>
  );
}

export default FloatingSocial;