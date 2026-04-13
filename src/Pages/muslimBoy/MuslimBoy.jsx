import React from 'react'
import Card from "./Card"
import { data } from "../../data/muslimBoy"
import { motion } from "framer-motion"
import SocialIcon from '../../components/SocialIcon'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

function MuslimBoy() {
  window.scroll({ top: 0 })

  return (
    <div className="min-h-screen pb-12 mt-[63px] sm:mt-[60px] md:mt-[80px] bg-transparent w-full overflow-x-hidden transition-all duration-300 pr-[75px] sm:pr-[85px] md:pr-[100px] pl-[15px] sm:pl-[25px]">

      {/* Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full pt-[10px] max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8 justify-items-center mb-20"
      >
        {data.map((boy) => (
          <motion.div key={boy.id} variants={itemVariants}>
            <Card
              name={boy.name}
              ImgSrc={boy.ImgSrc}
              data={boy.arrayVideo}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Footer Social Icons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex justify-center"
      >
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-8 py-2">
          <SocialIcon />
        </div>
      </motion.div>
    </div>
  )
}

export default MuslimBoy
