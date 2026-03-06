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
    <div className="min-h-screen bg-transparent w-full overflow-x-hidden transition-all duration-300 pr-[75px] sm:pr-[85px] md:pr-[100px] pl-[15px] sm:pl-[25px] flex flex-col items-center pt-[60px] pb-12 selection:bg-cyan-500 selection:text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl"
      >
        <Card className="bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-br from-cyan-600 to-blue-800 p-8 border-b border-white/10">
            <div className="flex-grow">
              <CardTitle className="text-2xl md:text-4xl font-black text-white leading-tight mb-4" style={{ fontFamily: "'Marhey', sans-serif" }}>
                {sermon.title}
              </CardTitle>
              <CardDescription className="text-cyan-100/90 text-lg md:text-xl font-medium" style={{ fontFamily: "'Marhey', sans-serif" }}>
                فضيلة الشيخ: {sermon.shaihk_name}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="p-8 md:p-10 relative">
            <div className="text-slate-200 leading-[1.8] text-justify whitespace-pre-line text-lg md:text-2xl font-medium pb-12">
              {sermon.content}
            </div>

            {/* Relocated Copy Button as a Floating Action */}
            <div className="absolute bottom-6 left-8 sm:bottom-8 sm:left-10">
              <div className="group relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative bg-white/10 backdrop-blur-xl p-3 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110 shadow-lg">
                  <CopyIcons copiedText={`${sermon.title}\n\n${sermon.content}`} />
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-6 bg-white/5 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-400 font-mono">
              رقم الخطبة: #{sermon.id}
            </p>
            <Link to="/hotba">
              <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300 hover:bg-white/5 font-bold flex items-center gap-2 text-lg" style={{ fontFamily: "'Marhey', sans-serif" }}>
                العودة إلى قائمة الخطب
                <ArrowRight size={20} className="transform -scale-x-100" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

export default SermonDetailPage;
