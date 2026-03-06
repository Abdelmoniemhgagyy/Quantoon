import React, { useContext } from 'react';
import GloableContext from '../store/GloableContext';
import { motion, AnimatePresence } from 'framer-motion';

function ThemeToggle() {
    const { theme, toggleTheme } = useContext(GloableContext);

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="relative p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg group transition-all duration-300 hover:bg-white/20 overflow-hidden"
            aria-label="Toggle Theme"
        >
            <div className="relative w-4 h-4">
                <AnimatePresence mode="wait">
                    {theme === 'dark' ? (
                        <motion.div
                            key="moon"
                            initial={{ y: 20, opacity: 0, rotate: 45 }}
                            animate={{ y: 0, opacity: 1, rotate: 0 }}
                            exit={{ y: -20, opacity: 0, rotate: -45 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 flex items-center justify-center text-yellow-400"
                        >
                            <i className="bi bi-moon-stars-fill text-xl"></i>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="sun"
                            initial={{ y: 20, opacity: 0, rotate: 45 }}
                            animate={{ y: 0, opacity: 1, rotate: 0 }}
                            exit={{ y: -20, opacity: 0, rotate: -45 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 flex items-center justify-center text-white"
                        >
                            <i className="bi bi-sun-fill text-xl"></i>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Decorative glow */}
            <div className={`absolute inset-0 opacity-20 blur-xl transition-colors duration-500 ${theme === 'dark' ? 'bg-blue-400' : 'bg-orange-400'}`}></div>
        </motion.button>
    );
}

export default ThemeToggle;
