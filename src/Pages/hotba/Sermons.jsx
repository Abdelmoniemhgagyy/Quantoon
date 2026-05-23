// HomePage.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui_hotba/card';
import { BookOpen, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import data from '../../data/hotbas.json';

const ITEMS_PER_PAGE = 15;

function Sermons() {
  //search
  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = data.filter((sermon) =>
    sermon.shaihk_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sermon.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const visibleData = filteredData.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount(prev => prev + ITEMS_PER_PAGE);
  };



  return (
    <div className="min-h-screen bg-transparent w-full overflow-x-hidden transition-all duration-300 pr-[75px] sm:pr-[85px] md:pr-[100px] pl-[15px] sm:pl-[25px] flex flex-col items-center pt-[60px] pb-12 selection:bg-cyan-500 selection:text-white">
      <header className="mb-12 text-center w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-20 h-20 bg-white/5 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10 shadow-xl">
            <BookOpen className="text-cyan-400 h-10 w-10" />
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-8 bg-gradient-to-r from-cyan-300 via-white to-blue-400 bg-clip-text text-transparent italic drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" style={{ fontFamily: "'Marhey', sans-serif" }}>
            خطب
          </h1>

          <div className="relative group max-w-2xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
            <input
              type="text"
              placeholder="ابحث باسم الخطبة أو الشيخ..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setVisibleCount(ITEMS_PER_PAGE);
              }}
              className="relative w-full px-6 py-4 bg-[#1e3a5f]/40 backdrop-blur-2xl border border-white/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-300 text-lg sm:text-xl"
              style={{ fontFamily: "'Marhey', sans-serif" }}
            />
          </div>
        </motion.div>
      </header>

      <div className="w-full max-w-7xl grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-2">
        {visibleData.map((sermon, index) => (
          <motion.div
            key={sermon.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <Link to={`/hotba/sermon/${sermon.id}`} className="block h-full">
              <Card className="h-full flex flex-col bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl hover:shadow-cyan-500/10 rounded-3xl overflow-hidden group transition-all duration-500 hover:-translate-y-2 hover:border-white/20">
                <CardHeader className="bg-gradient-to-br from-cyan-600/80 to-blue-800/80 p-6 border-b border-white/10">
                  <CardTitle className="text-xl font-bold text-white leading-tight mb-2 group-hover:text-cyan-200 transition-colors">
                    {sermon.title}
                  </CardTitle>
                  <CardDescription className="text-cyan-100/80 pt-1 text-base font-medium" style={{ fontFamily: "'Marhey', sans-serif" }}>
                    فضيلة الشيخ: {sermon.shaihk_name}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-6 flex-grow">
                  <div className="text-slate-300 leading-relaxed line-clamp-4 text-sm sm:text-base">
                    {sermon.content}
                  </div>
                </CardContent>

                <CardFooter className="p-5 bg-white/5 border-t border-white/10 flex justify-between items-center group-hover:bg-white/10 transition-colors">
                  <p className="text-xs text-slate-400 font-mono">
                    #{sermon.id}
                  </p>
                  <span className="text-sm font-bold text-cyan-400 flex items-center group-hover:text-cyan-300 transition-colors">
                    اقرأ المزيد
                    <ArrowLeft size={16} className="mr-2 transition-transform group-hover:-translate-x-1" />
                  </span>
                </CardFooter>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {visibleCount < filteredData.length && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mt-12"
        >
          {visibleData.length ?
            <button
              onClick={loadMore}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-cyan-500/20 transition-all duration-300 transform hover:scale-105 active:scale-95"
              style={{ fontFamily: "'Marhey', sans-serif" }}
            >
              تحميل المزيد
            </button> : <p className='text-slate-400 text-xl' style={{ fontFamily: "'Marhey', sans-serif" }}>لا توجد محاضرات</p>
          }
        </motion.div>
      )}
    </div>
  );
}

export default Sermons;
