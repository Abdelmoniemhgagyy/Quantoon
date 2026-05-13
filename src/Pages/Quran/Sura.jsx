import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowRight, BookType, X } from "lucide-react";
import CopyIcons from "../../components/CopyIcons/CopyIcons";
import { motion, AnimatePresence } from "framer-motion";
import call from "../../api/call";

function Sura() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [tafsir, setTafsir] = useState(null);
  const [activeAyah, setActiveAyah] = useState(null);
  const [tafsirLoading, setTafsirLoading] = useState(false);
  const { id } = useParams();

  const handleAyahClick = async (ayahNumber) => {
    if (activeAyah === ayahNumber) {
      // Toggle off if clicking the same one
      setActiveAyah(null);
      setTafsir(null);
      return;
    }

    setActiveAyah(ayahNumber);
    setTafsirLoading(true);
    try {
      const tafsirText = await call.tafsirAyah(ayahNumber);
      setTafsir(tafsirText);
    } catch (error) {
      console.error("Error fetching tafsir:", error);
      setTafsir("تعذر تحميل التفسير. حاول مرة أخرى.");
    } finally {
      setTafsirLoading(false);
    }
  };

  useEffect(() => {
    const handelSura = async () => {
      setLoading(true);
      try {
        const sura = await call.suraData(id);
        setData(sura);
      } catch (error) {
        console.error("Error fetching sura:", error);
      } finally {
        setLoading(false);
      }
    };

    handelSura();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-white/20 border-t-teal-400 rounded-full animate-spin mb-4"></div>
        <div className="text-lg text-teal-400 font-bold">جاري تحميل السورة...</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full flex justify-center py-6 sm:py-10 px-4 sm:px-6 bg-transparent"
    >
      <div className="w-full max-w-4xl relative">
        <Link
          to="/quran"
          className="absolute -top-4 sm:-top-8 right-0 flex items-center gap-2 text-sky-100 hover:text-teal-400 transition-colors bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full hover:bg-white/20 shadow-sm z-20"
        >
          <ArrowRight size={18} />
          <span className="hidden sm:inline font-medium text-sm">عودة للصفحة السابقة</span>
        </Link>

        <div className="mt-12 sm:mt-10 space-y-12 text-center relative z-10 w-full">
          {/* Optional Basmalah Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center mb-10"
          >
            <img src="/basmalah.png" alt="بسم الله الرحمن الرحيم" className="h-12 sm:h-16 opacity-80" onError={(e) => e.target.style.display = 'none'} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl text-white leading-[2.6] sm:leading-[2.8] text-center" dir="rtl" style={{ fontFamily: 'MeQuran, Arial, sans-serif' }}>
            {data.map((item) => (
              <React.Fragment key={item.number}>
                <span
                  title="انقر لقراءة التفسير"
                  className={`cursor-pointer inline transition-colors duration-200 ${activeAyah === item.number ? "text-[#144b6d] bg-teal-400 rounded px-1" : "hover:text-teal-400"
                    }`}
                  onClick={() => handleAyahClick(item.number)}
                >
                  {item.text}
                </span>
                <span
                  className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 mx-2 text-sm sm:text-base border border-white/20 rounded-full text-sky-100 bg-white/5 font-sans shadow-sm hover:border-teal-400/50 hover:text-teal-300 transition-colors"
                >
                  {item.numberInSurah}
                </span>

                {/* Inline Tafsir View directly below the active ayah */}
                <AnimatePresence>
                  {activeAyah === item.number && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: "2rem", marginBottom: "2rem" }}
                      exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }}
                      transition={{ duration: 0.3 }}
                      className="block w-full text-right font-sans overflow-hidden"
                      dir="rtl"
                    >
                      <div className="bg-[#0a2e46]/80 backdrop-blur-md border border-teal-500/30 p-5 sm:p-6 rounded-xl relative shadow-sm">
                        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                          <div className="flex items-center gap-2 text-teal-400">
                            <BookType size={20} />
                            <h4 className="font-bold text-lg text-white">التفسير الميسر</h4>
                          </div>
                          <div className="flex items-center justify-center gap-1">
                            {tafsir && (
                              <CopyIcons
                                copiedText={tafsir}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-teal-300 hover:bg-teal-500 hover:text-white transition-colors cursor-pointer"
                              />
                            )}
                            <button
                              onClick={(e) => { e.stopPropagation(); setActiveAyah(null); }}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-red-500 hover:text-white transition-colors"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </div>

                        {tafsirLoading ? (
                          <div className="py-4 text-teal-400 text-center animate-pulse">جاري تحميل التفسير...</div>
                        ) : (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <p className="text-lg sm:text-xl text-sky-50 leading-relaxed font-medium">
                              {tafsir}
                            </p>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default Sura;
