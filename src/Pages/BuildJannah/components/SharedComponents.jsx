import React from 'react';
import { motion } from 'framer-motion';

export const LayoutWrapper = ({ children }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        dir="rtl"
        className="min-h-screen pt-[80px] pb-12 w-full transition-all duration-300 pr-[75px] sm:pr-[60px] md:pr-[60px] pl-[15px] sm:pl-[25px] bg-transparent dark:bg-transparent flex flex-col items-center justify-start lg:pr-[0px]"
    >
        {children}
    </motion.div>
);

export const FeedbackView = ({ children }) => (
    <div className="min-h-screen pt-[100px] flex items-center justify-center w-full transition-all duration-300 pr-[75px] sm:pr-[85px] md:pr-[0px] pl-[15px] sm:pl-[25px] dark:bg-transparent">
        {children}
    </div>
);
