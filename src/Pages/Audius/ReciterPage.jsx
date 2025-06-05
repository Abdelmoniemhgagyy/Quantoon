import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import AudioPlayer from '../../components/Audio/AudioPlayer';
import { ArrowRight } from 'lucide-react';
import { Button } from '../../components/Audio/ui/button';
import data from "../../data/Audio/all_lectures_combined.json"
// r.seriesTitle === parseInt(reciterId)

const ReciterPage = () => {
  const { reciterId } = useParams();
const reciter = data.find(r => r.seriesTitle === decodeURIComponent(reciterId ));


console.log(reciter)
  if (!reciter) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#144b6d] p-4 text-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-red-600 mb-4">خطأ</h1>
          <p className="text-xl text-white mb-8">لم يتم العثور على الدورة المطلوبة.</p>
          <Button asChild className="bg-teal-500 hover:bg-teal-600">
            <RouterLink to="/audio">
              <ArrowRight className="ml-2 h-4 w-4" />
            العودة إلى المكتبة الصوتية
            </RouterLink>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className=" lg:mr-[60px] md:mx-auto ">
    <div className=" min-h-screen  from-green-100 via-teal-50 to-cyan-100 hero-pattern flex flex-col items-center justify-center p-4 pt-24 md:pt-28">
       <div className="absolute top-6 right-6">
       </div>
      <AudioPlayer reciter={reciter} />
    </div>
    </div>

  );
};

export default ReciterPage;
