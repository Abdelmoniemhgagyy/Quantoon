import React from "react";
import { Link } from "react-router-dom";
import { Layers } from "lucide-react";
import { motion } from "framer-motion";

function JuzaContainer() {
  // Generate Juza data (1 to 30)
  const juzs = Array.from({ length: 30 }, (_, i) => ({
    name: `الجزء ${i + 1}`,
    number: i + 1,
  }));

  // Map Arabic numbers to specific string names for better UI display
  const arabicNames = [
    "الأول", "الثاني", "الثالث", "الرابع", "الخامس", "السادس", "السابع", "الثامن", "التاسع", "العاشر",
    "الحادي عشر", "الثاني عشر", "الثالث عشر", "الرابع عشر", "الخامس عشر", "السادس عشر", "السابع عشر", "الثامن عشر", "التاسع عشر", "العشرون",
    "الحادي والعشرون", "الثاني والعشرون", "الثالث والعشرون", "الرابع والعشرون", "الخامس والعشرون", "السادس والعشرون", "السابع والعشرون", "الثامن والعشرون", "التاسع والعشرون", "الثلاثون"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8 bg-transparent">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
      >
        {juzs.map((item, i) => (
          <motion.div key={item.number} variants={itemVariants}>
            <Link
              to={`${item.number}`}
              className="group h-full relative overflow-hidden flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-teal-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>

              <div className="relative z-10 w-14 h-14 flex items-center justify-center rounded-full bg-white/10 text-white/50 group-hover:bg-teal-500 group-hover:text-white transition-all duration-300 mb-4 shadow-sm group-hover:shadow-md">
                <Layers size={28} />
              </div>
              <div className="relative z-10 text-xl font-bold text-white mb-1 font-amiri tracking-wide group-hover:text-teal-300 transition-colors">
                الجزء {arabicNames[i] || item.number}
              </div>
              <div className="relative z-10 text-sky-200/70 text-sm font-medium mt-2 group-hover:text-teal-200 transition-colors">
                الجزء رقم {item.number}
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default JuzaContainer;