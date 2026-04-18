import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutWrapper } from './SharedComponents';
import { getImageSrc } from '../utils';

const JannahGrid = ({ items, counters, setSelectedItem, clearCounters }) => {
    // Scroll to top when returning to grid
    useEffect(() => {
        window.scroll({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <LayoutWrapper>
            <div className="relative mb-10 z-10 w-[90%] max-w-[350px] sm:max-w-[400px]">
                <div className="absolute inset-0 bg-teal-600 dark:bg-teal-800 rounded-[50px] shadow-lg transform -skew-x-[15deg] rotate-[2deg] z-0 opacity-70"></div>
                <div className="relative bg-white dark:bg-slate-800 border-2 border-teal-500 dark:border-teal-700 rounded-3xl py-3 sm:py-4 px-6 sm:px-8 shadow-xl z-10 flex justify-center items-center backdrop-blur-md transition-colors duration-500">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl text-[#144b6d] dark:text-teal-400 font-bold font-['Marhey']">
                        ابني جنتك
                    </h1>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-4xl z-10">
                {items.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: index * 0.1, type: 'spring' }}
                        className="group flex flex-col items-center bg-white dark:bg-slate-800/80 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm border border-teal-50 dark:border-slate-700 hover:border-teal-200 dark:hover:border-teal-400 hover:shadow-teal-500/20 dark:hover:shadow-xl transition-all duration-500 cursor-pointer overflow-hidden"
                        onClick={() => setSelectedItem(item)}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className="w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mb-3 flex items-center justify-center bg-teal-50/50 dark:bg-slate-800 rounded-[20px] p-2 group-hover:bg-teal-50 dark:group-hover:bg-slate-700 transition-colors">
                            <img src={getImageSrc(item.image)} alt={item.name} className="max-w-full max-h-full object-contain filter drop-shadow-sm group-hover:drop-shadow-md transition-all group-hover:scale-105" />
                        </div>
                        <h2 className="text-[#144b6d] dark:text-white text-base sm:text-lg lg:text-xl font-bold mb-3 text-center">
                            {item.name}
                        </h2>
                        <div className="bg-white/40 dark:bg-teal-900/30 border border-white/60 dark:border-teal-800 rounded-xl sm:rounded-2xl px-3 sm:px-6 py-1 sm:py-2 w-full text-center">
                            <span className="text-[#144b6d] dark:text-teal-400 font-bold text-sm sm:text-lg tabular-nums">
                                {counters[item.id] || 0}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Footer Controls */}
            <div className="mt-12 flex flex-row items-center justify-center gap-3 sm:gap-4 w-full">
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="bg-white/60 dark:bg-slate-800/80 backdrop-blur-sm w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center border border-white/50 dark:border-slate-700 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all dark:hover:bg-slate-700"
                    onClick={() => window.history.back()}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 text-slate-600 dark:text-teal-400 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </motion.button>

                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={clearCounters}
                    className="bg-red-50/70 dark:bg-red-900/40 backdrop-blur-sm px-6 sm:px-16 py-3 sm:py-4 rounded-xl sm:rounded-full border border-red-200/50 dark:border-red-800 shadow-sm hover:-translate-y-1 hover:shadow-md hover:bg-red-100/80 dark:hover:bg-red-900/60 transition-all font-['Marhey']"
                >
                    <span className="text-base sm:text-xl font-bold text-red-600 dark:text-red-400">
                        مسح العداد
                    </span>
                </motion.button>
            </div>
        </LayoutWrapper>
    );
};

export default JannahGrid;
