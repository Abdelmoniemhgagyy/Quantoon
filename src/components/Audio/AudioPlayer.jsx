import React, { useState, useRef, useEffect, useContext } from 'react';
import GloableContext from '../../store/GloableContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Shuffle,
  Repeat,
  Heart,
  ListMusic,
  Download,
  ArrowRight,
  Share2,
} from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { Slider } from './ui/slider';

const AudioPlayer = ({ reciter }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLectureIndex, setCurrentLectureIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.75);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState('none'); // none, one, all
  const [isLiked, setIsLiked] = useState(false);
  const audioRef = useRef(null);
  const isPlayingRef = useRef(false);

  const lectures = reciter.lectures || [];
  const currentLecture = lectures[currentLectureIndex];
  const audioSrc = currentLecture ? currentLecture.url : '';

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioSrc) return;

    audio.src = audioSrc;
    audio.load();

    if (isPlayingRef.current) {
      audio.play().catch(error => {
        if (error.name !== 'AbortError') {
          console.error('Error playing audio:', error);
        }
      });
    }
  }, [currentLectureIndex, audioSrc]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const setAudioDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (repeatMode === 'one') {
        audio.currentTime = 0;
        audio.play();
      } else if (isShuffle) {
        const nextIndex = Math.floor(Math.random() * lectures.length);
        setCurrentLectureIndex(nextIndex);
      } else if (currentLectureIndex < lectures.length - 1) {
        setCurrentLectureIndex(prev => prev + 1);
      } else if (repeatMode === 'all') {
        setCurrentLectureIndex(0);
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
  }, [volume, isMuted, currentLectureIndex, lectures.length, isShuffle, repeatMode]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(console.error);
    }
  };

  const handleSeek = (value) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value) => {
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
    if (isShuffle) {
      setCurrentLectureIndex(Math.floor(Math.random() * lectures.length));
    } else {
      setCurrentLectureIndex((prev) => (prev + 1) % lectures.length);
    }
  };

  const playPrev = () => {
    setCurrentLectureIndex((prev) => (prev - 1 + lectures.length) % lectures.length);
  };

  const formatTime = (time) => {
    if (isNaN(time) || time === Infinity) return '0:00';
    const totalSeconds = Math.floor(time);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const { theme } = useContext(GloableContext);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 dark:bg-black transition-colors duration-500 flex flex-col items-center justify-center">
      {/* Background Image with Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{
          backgroundImage: `url('${reciter.image || "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?q=80&w=2070&auto=format&fit=crop"}')`,
          filter: theme === 'dark' ? 'brightness(0.4) blur(10px)' : 'blur(40px) opacity(0.4)',
          transform: 'scale(1.1)'
        }}
      />
      <div className="absolute inset-0 bg-white/20 dark:bg-transparent transition-colors duration-500" />

      {/* Glass Overlay for safe areas */}
      <div className="relative z-10 w-full max-w-lg min-h-screen flex flex-col p-4 sm:p-6 md:p-10 text-slate-900 dark:text-white">

        {/* Header */}
        <div className="flex justify-between items-center mb-6 md:mb-12 pt-2 gap-4">
          <RouterLink to="/audio" className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-full transition-colors flex-shrink-0">
            <ArrowRight className="h-6 w-6" />
          </RouterLink>
          <div className="text-center flex-grow min-w-0">
            <h1 className="text-xs sm:text-sm font-bold truncate">{reciter.seriesTitle}</h1>
          </div>
          <button
            onClick={() => {
              const text = `استمع إلى ${currentLecture?.title} من سلسلة ${reciter.seriesTitle}: ${window.location.href}`;
              window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
            }}
            className=" p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-full transition-colors flex-shrink-0"
          >
            <Share2 className="h-5 w-5" />
          </button>
        </div>

        {/* Album Art Section */}
        <div className="flex-grow flex flex-col items-center justify-center mb-8 px-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full aspect-square max-w-[250px] sm:max-w-[320px] shadow-2xl rounded-2xl overflow-hidden border border-white/20"
          >
            <img
              alt={`${reciter.seriesTitle}`}
              className="w-full h-full object-cover"
              src={reciter.image || "https://images.unsplash.com/photo-1689125220678-7a8393658449?q=80&w=1000&auto=format&fit=crop"}
            />
            {/* White Stroke Frame from Reference */}
            <div className="absolute inset-6 border border-slate-900/10 dark:border-white/30 pointer-events-none" />
          </motion.div>
        </div>

        {/* Info Section */}
        <div className="mb-8 w-full">
          <div className="flex justify-between items-end mb-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-1 tracking-tight text-slate-900 dark:text-white">{currentLecture ? currentLecture.title : 'لا يوجد محاضرة'}</h2>
              <p className="text-slate-600 dark:text-white/70 text-base">{reciter.seriesTitle}</p>
            </div>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="p-2 transition-all active:scale-95"
            >
              <Heart className={`h-7 w-7 transition-colors ${isLiked ? 'fill-green-500 stroke-green-500' : 'stroke-slate-400 dark:stroke-white/80'}`} />
            </button>
          </div>
        </div>

        {/* Player Controls Section */}
        <div className="w-full space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <Slider
              min={0}
              max={duration || 0}
              step={1}
              value={[currentTime]}
              onValueChange={handleSeek}
              className="w-full h-1 cursor-pointer [&>span:first-child]:bg-slate-300 dark:[&>span:first-child]:bg-white/30 [&>span:first-child>span]:bg-teal-600 dark:[&>span:first-child>span]:bg-white [&_span[role=slider]]:bg-teal-600 dark:[&_span[role=slider]]:bg-white [&_span[role=slider]]:border-none [&_span[role=slider]]:w-3 [&_span[role=slider]]:h-3"
            />
            <div className="flex justify-between text-xs font-medium text-slate-500 dark:text-white/60">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Main Controls */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsShuffle(!isShuffle)}
              className={`p-2 transition-colors ${isShuffle ? 'text-teal-600 dark:text-green-500' : 'text-slate-400 dark:text-white/60 hover:text-slate-900 dark:hover:text-white'}`}
            >
              <Shuffle className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-6">
              <button onClick={playPrev} className="p-2 text-slate-800 dark:text-white hover:opacity-80 transition-opacity active:scale-90">
                <SkipBack className="h-8 w-8 fill-current" />
              </button>

              <button
                onClick={togglePlayPause}
                className="bg-white text-black p-4 rounded-full shadow-lg hover:scale-105 transition-transform active:scale-95"
              >
                {isPlaying ? (
                  <Pause className="h-8 w-8 fill-current" />
                ) : (
                  <Play className="h-8 w-8 fill-current translate-x-0.5" />
                )}
              </button>

              <button onClick={playNext} className="p-2 text-slate-800 dark:text-white hover:opacity-80 transition-opacity active:scale-90">
                <SkipForward className="h-8 w-8 fill-current" />
              </button>
            </div>

            <button
              onClick={() => setRepeatMode(prev => prev === 'none' ? 'all' : prev === 'all' ? 'one' : 'none')}
              className={`p-2 transition-colors ${repeatMode !== 'none' ? 'text-teal-600 dark:text-green-500' : 'text-slate-400 dark:text-white/60 hover:text-slate-900 dark:hover:text-white'}`}
            >
              <div className="relative">
                <Repeat className="h-5 w-5" />
                {repeatMode === 'one' && <span className="absolute -top-1 -right-1 text-[8px] font-bold">1</span>}
              </div>
            </button>
          </div>

          {/* Bottom Footer Controls */}
          <div className="flex justify-between items-center pt-4">
            <div className="flex items-center gap-4 text-slate-400 dark:text-white/60">
              <button onClick={() => setShowPlaylist(!showPlaylist)} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                <ListMusic className="h-6 w-6" />
              </button>
              {currentLecture?.url && (
                <button onClick={() => window.open(currentLecture.url, "_blank")} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  <Download className="h-5 w-5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 group min-w-[120px]">
              <button onClick={toggleMute} className="text-slate-400 dark:text-white/60 hover:text-slate-900 dark:hover:text-white transition-colors">
                {isMuted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>
              <Slider
                min={0}
                max={1}
                step={0.01}
                value={[isMuted ? 0 : volume]}
                onValueChange={handleVolumeChange}
                className="w-24 h-1 cursor-pointer [&>span:first-child]:bg-slate-300 dark:[&>span:first-child]:bg-white/20 [&>span:first-child>span]:bg-teal-600 dark:[&>span:first-child>span]:bg-white"
              />
            </div>
          </div>
        </div>

        <audio ref={audioRef} preload="metadata" />

        {/* Playlist Overlay */}
        <AnimatePresence>
          {showPlaylist && (
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute inset-0 z-20 bg-white/95 dark:bg-black/90 backdrop-blur-xl p-4 pt-4 mt-[90px] rounded-t-[40px] shadow-2xl border-t border-slate-200 dark:border-white/10 flex flex-col"
            >
              {/* Close button - now with more top spacing and rounded top */}
              <div className="flex justify-between items-center mb-6 px-2">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">قائمة المحاضرات</h3>
                <button
                  onClick={() => setShowPlaylist(false)}
                  className="p-2.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-white/60 hover:bg-slate-200 dark:hover:bg-white/20 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>
              <ul className="flex-grow overflow-auto space-y-2 pb-10">
                {lectures.map((lecture, index) => (
                  <motion.li
                    key={lecture.id || index}
                    whileHover={{ x: 5 }}
                    className={`cursor-pointer p-3 rounded-lg flex items-center gap-4 transition-colors ${index === currentLectureIndex ? "bg-teal-100 dark:bg-white/20 text-teal-800 dark:text-white" : "text-slate-600 dark:text-white/60 hover:bg-slate-100 dark:hover:bg-white/5"}`}
                    onClick={() => {
                      setCurrentLectureIndex(index);
                      setShowPlaylist(false);
                    }}
                  >
                    <div className="w-8 text-xs font-mono opacity-50">{index + 1}</div>
                    <div className="flex-grow">
                      <div className="font-medium text-sm line-clamp-1">{lecture.title}</div>
                      <div className="text-xs opacity-60">{reciter.seriesTitle}</div>
                    </div>
                    {index === currentLectureIndex && isPlaying && (
                      <div className="flex gap-1 items-end h-3">
                        <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-0.5 bg-teal-500 dark:bg-green-500" />
                        <motion.div animate={{ height: [8, 4, 8] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-0.5 bg-teal-500 dark:bg-green-500" />
                        <motion.div animate={{ height: [4, 10, 4] }} transition={{ repeat: Infinity, duration: 0.4 }} className="w-0.5 bg-teal-500 dark:bg-green-500" />
                      </div>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AudioPlayer;
