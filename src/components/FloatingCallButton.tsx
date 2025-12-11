
import React from 'react';
import { motion } from 'framer-motion';

const FloatingCallButton = () => {
    // Separate initial animation from continuous pulse
    const buttonVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: { delay: 1, duration: 0.5, ease: "easeOut" }
        },
        pulse: {
            scale: [1, 1.05, 1], // Pulse effect
            transition: {
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 1
            }
        }
    };

    return (
        <motion.a
            href="tel:+919918048575"
            aria-label="Call Now"
            variants={buttonVariants}
            initial="hidden"
            animate={["visible", "pulse"]} // Play initial and then pulse
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="fixed top-1/2 right-4 md:right-6 -translate-y-1/2 z-50 flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg"
        >
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="w-6 h-6"
            >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
        </motion.a>
    );
};

export default FloatingCallButton;
