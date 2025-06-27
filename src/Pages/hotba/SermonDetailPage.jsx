import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui_hotba/card';
import { Button } from '../../components/ui_hotba/button';
import { ArrowRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import data from '../../data/hotbas.json';
import CopyIcons from '../../components/CopyIcons/CopyIcons';


function SermonDetailPage() {
  const { id } = useParams();
  const getSermonById = (id) => {
    return data.find(sermon => sermon.id === parseInt(id));
  };
  const sermon = getSermonById(id);

  if (!sermon) {
    return (
      <div className="min-h-screen dark:from-red-900 dark:to-pink-900 flex flex-col items-center justify-center p-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-red-600 dark:text-red-400 mb-4">خطأ 404</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">لم يتم العثور على الخطبة المطلوبة.</p>
          <Button asChild variant="outline" className="  text-white dark:bg-emerald-600 dark:hover:bg-emerald-700">
            <Link to="/" className="flex items-center">
              <Home size={20} className="ml-2" />
              العودة إلى الصفحة الرئيسية
            </Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mr-[60px] dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 selection:bg-emerald-500 selection:text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className=""
      >
        <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg shadow-2xl rounded-xl overflow-hidden border border-emerald-200 dark:border-gray-700">
          <CardHeader className="bg-gradient-to-br from-emerald-400 to-blue-700 dark:from-emerald-700 dark:to-teal-800 p-6">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl md:text-3xl font-bold text-white leading-tight">
                {sermon.title}
              </CardTitle>
              <span className='text-white'>

                 <CopyIcons  copiedText={sermon.content+sermon.url}/>
              </span>
            </div>
            <CardDescription className="text-emerald-200 dark:text-emerald-300 pt-2 text-base">
              فضيلة الشيخ: {sermon.shaihk_name}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-justify">
              <p className='text-[18px] md:text-[20px]'>{sermon.content}</p>
          </div>
          </CardContent>
          <CardFooter className="p-6 bg-gray-50 dark:bg-gray-700/60 border-t border-emerald-100 dark:border-gray-700 flex justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              رقم الخطبة: {sermon.id}
            </p>
            <Button asChild variant="link" className="text-blue-600 hover:text-blue-700 dark:text-emerald-400 dark:hover:text-emerald-300 p-0">
              <Link to="/hotba" className="flex items-center text-sm">
                العودة إلى قائمة الخطب
                <ArrowRight size={16} className="mr-2 transform -scale-x-100" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

export default SermonDetailPage;
