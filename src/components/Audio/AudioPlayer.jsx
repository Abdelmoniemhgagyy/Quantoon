import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  PlayCircle,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  RotateCcw,
  List,
  Download,
  ArrowRight,
} from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { Button } from './ui/button';
import { Slider } from './ui/slider';

const AudioPlayer = ({ reciter }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLectureIndex, setCurrentLectureIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.75);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const audioRef = useRef(null);

  const lectures = reciter.lectures || [];
  const currentLecture = lectures[currentLectureIndex];
  const audioSrc = currentLecture ? currentLecture.url : '';

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioSrc) return;

    audio.src = audioSrc;
    audio.load();

    if (isPlaying) {
      audio.play().catch(error => {
        if (error.name !== 'AbortError') {
          console.error('Error playing audio:', error);
        }
      });
    }
  }, [currentLectureIndex, audioSrc, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const setAudioDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (currentLectureIndex < lectures.length - 1) {
        setCurrentLectureIndex(prev => prev + 1);
      } else {
        setIsPlaying(false);
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', setAudioDuration);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    audio.volume = isMuted ? 0 : volume;

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', setAudioDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [volume, isMuted, currentLectureIndex, lectures.length]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(error => {
          if (error.name !== 'AbortError') {
            console.error('Error playing audio:', error);
          }
        });
    }
  };

  const handleSeek = value => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = value => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.volume = !isMuted ? 0 : volume;
    }
  };

  const playNext = () => {
    setCurrentLectureIndex((prev) => (prev + 1) % lectures.length);
  };

  const playPrev = () => {
    setCurrentLectureIndex((prev) => (prev - 1 + lectures.length) % lectures.length);
  };

  const replayLecture = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => {
        if (error.name !== 'AbortError') {
          console.error('Error playing audio:', error);
        }
      });
    }
  };

  const formatTime = (time) => {
    if (isNaN(time) || time === Infinity) return '0:00';
    const totalSeconds = Math.floor(time);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds}`;
    } else {
      return `${minutes}:${seconds}`;
    }
  };

  const selectLecture = (index) => {
    setCurrentLectureIndex(index);
    setShowPlaylist(false);
  };

  return (
    <motion.div
      className="bg-white/80 backdrop-blur-md shadow-2xl rounded-xl p-6 md:p-8 w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
                 <RouterLink to="/audio">
                   <ArrowRight className="ml-1 h-4 w-4" />
                 </RouterLink>
      <audio ref={audioRef} preload="metadata" />
      <div className="text-center mb-6">
        <img
          alt={`${reciter.title}`}
          className="w-32 h-32 rounded-full object-cover mx-auto mb-3 border-4 border-teal-500 shadow-lg"
          src="https://images.unsplash.com/photo-1689125220678-7a8393658449"
        />
        <h2 className="text-2xl font-bold text-gray-800">{reciter.title}</h2>
        <p className="text-xl font-semibold text-gray-700 mt-2">
          {currentLecture ? currentLecture.title : 'لا يوجد محاضرة'}
        </p>
      </div>

      <div className="mb-4">
        <Slider
          min={0}
          max={duration || 0}
          step={1}
          value={[currentTime]}
          onValueChange={handleSeek}
          className="w-full [&>span:first-child]:h-2 [&>span:first-child>span]:bg-teal-500"
          aria-label="شريط التقدم للمحاضرة"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-2 space-x-reverse mb-6">
        <Button variant="ghost" size="icon" onClick={playPrev} className="text-teal-600 hover:bg-teal-100" aria-label="المحاضرة السابقة">
          <SkipBack className="h-6 w-6" />
        </Button>
        <Button
          variant="default"
          size="lg"
          onClick={togglePlayPause}
          className="bg-teal-500 hover:bg-teal-600 text-white rounded-full w-16 h-16 shadow-md flex items-center justify-center"
          aria-label={isPlaying ? "إيقاف مؤقت" : "تشغيل"}
        >
          {isPlaying ? <Pause className="h-8 w-8" /> : <PlayCircle className="h-8 w-8" />}
        </Button>
        <Button variant="ghost" size="icon" onClick={playNext} className="text-teal-600 hover:bg-teal-100" aria-label="المحاضرة التالية">
          <SkipForward className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" onClick={replayLecture} className="text-teal-600 hover:bg-teal-100" aria-label="إعادة المحاضرة">
          <RotateCcw className="h-5 w-5" />
        </Button>
        {currentLecture?.url && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.open(currentLecture.url, "_blank")}
            className="text-teal-600 hover:bg-teal-100"
            aria-label="تحميل المحاضرة"
          >
            <Download className="h-5 w-5" />
          </Button>
        )}
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 space-x-reverse w-full md:w-auto">
          <Button variant="ghost" size="icon" onClick={toggleMute} className="text-gray-600 hover:bg-gray-200" aria-label={isMuted ? "تشغيل الصوت" : "كتم الصوت"}>
            {isMuted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>
          <Slider
            min={0}
            max={1}
            step={0.01}
            value={[isMuted ? 0 : volume]}
            onValueChange={handleVolumeChange}
            className="w-full md:w-48 [&>span:first-child]:h-1 [&>span:first-child>span]:bg-teal-500"
            aria-label="مستوى الصوت"
          />
        </div>
        <Button className="mr-4 flex items-center whitespace-nowrap" variant="outline" size="sm" onClick={() => setShowPlaylist(!showPlaylist)} aria-label="عرض قائمة المحاضرات">
          <List className="h-5 w-5" />
          <span className="mr-2">قائمة المحاضرات</span>
        </Button>
      </div>

      {showPlaylist && (
        <ul className="max-h-56 overflow-auto rounded-md border border-gray-200 bg-white p-4 shadow-inner">
          {lectures.map((lecture, index) => (
            <li
              key={lecture.id || index}
              className={`cursor-pointer rounded-md p-2 mb-1 transition-colors hover:bg-teal-100 ${index === currentLectureIndex ? "bg-teal-200 font-semibold" : ""}`}
              onClick={() => selectLecture(index)}
            >
              {lecture.title}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};

export default AudioPlayer;
