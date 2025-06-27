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
    sermon.shaihk_name.toLowerCase().includes(searchTerm.toLowerCase())||
    sermon.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const visibleData = filteredData.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount(prev => prev + ITEMS_PER_PAGE);
  };



  return (
    <div className="min-h-screen mr-[60px] from-blue-100 via-teal-50 to-emerald-100 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 flex flex-col items-center p-4 sm:p-6 md:p-8 selection:bg-emerald-500 selection:text-white">


      <header className="mb-9 text-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <BookOpen className="mx-auto text-blue-400 h-16 w-16 mb-3" />
          <h1 className="text-2xl  sm:text-4xl md:text-5xl font-bold mb-4 text-white">
          خطب
             </h1>
          <input
              type="text"
              placeholder="ابحث بأسم الخطبة أو الشيخ..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setVisibleCount(ITEMS_PER_PAGE); 
              }}
              className="my-2 p-2 w-full md:min-w-[400px] rounded-lg border border-gray-300 focus:outline-none "
            />
        </motion.div>
      </header>

      <div className="w-full max-w-7xl grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {visibleData.map((sermon, index) => (
          <motion.div
            key={sermon.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.03 }}
          >
            <Link to={`/hotba/sermon/${sermon.id}`} className="block h-full">
              <Card className="h-full flex flex-col bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg shadow-xl hover:shadow-2xl rounded-xl overflow-hidden transform transition-all hover:scale-[1.03] duration-300 border border-emerald-200 dark:border-gray-700">
                <CardHeader className="bg-gradient-to-br from-emerald-400 to-blue-700 dark:from-emerald-700 dark:to-teal-800 p-5">
                  <CardTitle className="text-xl font-bold text-white leading-tight">
                    {sermon.title}
                  </CardTitle>
                  <CardDescription className="text-emerald-200 dark:text-emerald-300 pt-1 text-sm">
                    فضيلة الشيخ: {sermon.shaihk_name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-5 flex-grow">
                  <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line line-clamp-5">
                    <p>{sermon.content}</p>
                  </div>
                </CardContent>
                <CardFooter className="p-4 bg-gray-50 dark:bg-gray-700/60 border-t border-emerald-100 dark:border-gray-700 mt-auto flex justify-between items-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    رقم الخطبة: {sermon.id}
                  </p>
                  <span className="text-xs text-blue-600 dark:text-emerald-400 font-semibold flex items-center">
                    اقرأ المزيد <ArrowLeft size={14} className="mr-1 transform -scale-x-100" />
                  </span>
                </CardFooter>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {visibleCount < data.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: visibleCount * 0.02 }}
          className=" text-white "
        >
          { visibleData.length ?
                   <button
                      onClick={loadMore}
                      className="px-6  py-2 mt-[20px] text bg-gradient-to-br from-emerald-400 to-blue-700 hover:bg-emerald-700 text-white rounded-lg transition"
                    >
                      تحميل المزيد
                   </button> : <p className='md:text-xl'> لا توجد محاضرات</p>
          }

        </motion.div>
      )}


    </div>
  );
}

export default Sermons;
