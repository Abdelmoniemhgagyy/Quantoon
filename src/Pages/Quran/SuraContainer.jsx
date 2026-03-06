import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookA } from "lucide-react";
import { motion } from "framer-motion";
import call from "../../api/call";

function SuraContainer() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const nameSura = await call.nameSura();
        setData(nameSura);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="text-teal-400 font-bold text-lg animate-pulse">جاري تحميل السور...</div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
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
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
      >
        {data.map((item, i) => (
          <motion.div key={item.number || i} variants={itemVariants}>
            <Link
              to={`${item.number}`}
              className="group h-full flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-teal-400 hover:shadow-md hover:bg-white/10 transition-all duration-200 hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-xl bg-white/10 text-teal-400 group-hover:bg-teal-500 group-hover:text-white transition-colors duration-200 font-bold text-lg">
                  {item.number}
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-white font-amiri group-hover:text-teal-300 transition-colors">{item.name}</span>
                  <span className="text-sm text-sky-200 font-medium">{item.englishName}</span>
                </div>
              </div>
              <BookA size={20} className="text-white/20 group-hover:text-teal-400 transition-colors" />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default SuraContainer;
