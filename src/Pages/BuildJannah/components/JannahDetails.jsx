import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutWrapper } from './SharedComponents';
import { getImageSrc } from '../utils';

const JannahDetails = ({ selectedItem, setSelectedItem, counter, onIncrement }) => {
    // Scroll to top when opening details
    useEffect(() => {
        window.scroll({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <LayoutWrapper>
            <div className="w-full flex justify-between items-center max-w-2xl mt-4 sm:mt-0 px-2 sm:px-0">
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all dark:hover:bg-slate-700 hover:-translate-y-1"
                    onClick={() => setSelectedItem(null)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-slate-600 dark:text-teal-400 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </motion.button>
                <h2 className="text-xl sm:text-2xl font-bold text-white dark:text-teal-400 font-['Marhey']">
                    {selectedItem.name}
                </h2>
                <div className="w-10 h-10 sm:w-12 sm:h-12"></div>
            </div>

            <div className="flex flex-col items-center bg-white dark:bg-slate-800/80 rounded-[30px] sm:rounded-[40px] p-6 sm:p-8 shadow-xl border border-teal-50 dark:border-teal-900/50 w-full max-w-md mt-8 backdrop-blur-md">
                <img src={getImageSrc(selectedItem.image)} alt={selectedItem.name} className="w-24 h-24 sm:w-40 sm:h-40 mb-6 sm:mb-8 object-contain filter drop-shadow-lg" />

                <motion.button
                    whileTap={{ scale: 0.92 }}
                    onClick={() => onIncrement(selectedItem.id)}
                    className="w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-gradient-to-tr from-teal-500 to-teal-300 dark:from-teal-600 dark:to-teal-800 shadow-[0_10px_30px_rgba(20,184,166,0.3)] dark:shadow-[0_10px_30px_rgba(13,148,136,0.4)] flex flex-col items-center justify-center border-4 border-white/50 dark:border-slate-700 relative overflow-hidden group transition-transform"
                >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-active:opacity-100 transition-opacity"></div>
                    <span className="text-4xl sm:text-6xl text-white font-bold tabular-nums" style={{ textShadow: '0px 2px 4px rgba(0,0,0,0.2)' }}>
                        {counter || 0}
                    </span>
                </motion.button>

                <div className="mt-8 text-center bg-teal-50/50 dark:bg-slate-700/50 p-4 rounded-xl sm:rounded-2xl w-full border border-teal-100/50 dark:border-slate-600 backdrop-blur-sm">
                    <h3 className="text-lg sm:text-2xl font-bold text-teal-800 dark:text-teal-300 leading-relaxed font-['Marhey']">{selectedItem.action}</h3>
                </div>

                <div className="mt-6 text-center w-full">
                    <div className="inline-block px-3 py-1 bg-white/60 dark:bg-slate-700 text-slate-500 dark:text-slate-300 text-xs font-bold mb-3 rounded-md backdrop-blur-sm border border-white/30 dark:border-transparent">الدليل من السنة</div>
                    <p className="text-slate-700 dark:text-slate-300 leading-loose text-sm sm:text-base whitespace-pre-wrap font-medium">
                        {selectedItem.hadith}
                    </p>
                </div>
            </div>
        </LayoutWrapper>
    );
};

export default JannahDetails;
