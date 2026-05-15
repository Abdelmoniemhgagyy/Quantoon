import { useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play, Radio as RadioIcon, RefreshCw, Search } from "lucide-react";

const RADIO_API_URL = "https://www.mp3quran.net/api/radio/radio_ar.json";
const RADIO_CARD_IMAGE = "https://images.unsplash.com/photo-1689125220678-7a8393658449";

function Radio() {
  const [stations, setStations] = useState([]);
  const [currentStation, setCurrentStation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(32);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchRadios() {
      try {
        setIsLoading(true);
        setError("");
        const response = await fetch(RADIO_API_URL, { signal: controller.signal });

        if (!response.ok) {
          throw new Error("تعذر تحميل محطات الراديو");
        }

        const data = await response.json();
        const radioStations = Array.isArray(data.Radios) ? data.Radios : [];
        setStations(radioStations);
        setCurrentStation(radioStations[0] || null);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("حدث خطأ أثناء تحميل محطات الراديو. حاول مرة أخرى.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    fetchRadios();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    setVisibleCount(32);
  }, [searchTerm]);

  const filteredStations = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return stations;
    }

    return stations.filter((station) =>
      String(station.Name || "").toLowerCase().includes(normalizedSearch)
    );
  }, [searchTerm, stations]);

  const visibleStations = filteredStations.slice(0, visibleCount);

  const cleanStationName = (name) => String(name || "").replace(/^[-*\s]+|[-*\s]+$/g, "");

  const playStation = (station) => {
    setCurrentStation(station);
    setIsPlaying(true);

    window.setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.load();
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }, 0);
  };

  const togglePlay = () => {
    if (!audioRef.current || !currentStation) return;

    if (audioRef.current.paused) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="min-h-screen mr-[60px] px-4 pb-28 pt-[40px] text-center">
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white transition-colors">
        الراديو <span className="text-teal-600 dark:text-gradient">الإسلامى</span>
      </h1>

      <div className="relative mx-auto w-[90%] md:w-[500px]">
        <Search className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          className="m-2 h-[45px] w-full rounded-2xl border border-slate-200 bg-white pr-12 text-right text-slate-900 shadow-sm outline-none transition-all focus:ring-2 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          placeholder=" ... أبحث عن إذاعة "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading && (
        <div className="mt-16 flex flex-col items-center justify-center gap-4 text-white">
          <RefreshCw className="h-9 w-9 animate-spin text-teal-300" />
          <p className="font-bold">جاري تحميل محطات الراديو...</p>
        </div>
      )}

      {error && !isLoading && (
        <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-red-200 bg-white p-6 text-red-700 shadow-lg dark:border-red-900/50 dark:bg-[#0f0f1975] dark:text-red-300">
          {error}
        </div>
      )}

      {!isLoading && !error && (
        <>
          <div className="mt-[40px] flex flex-wrap justify-center gap-[40px]">
            {visibleStations.length === 0 ? (
              <p className="col-span-full text-center text-slate-500 dark:text-slate-400">
                لا توجد نتائج للبحث.
              </p>
            ) : (
              visibleStations.map((station, index) => (
                  <button
                    key={`${station.Id}-${index}`}
                    type="button"
                    onClick={() => playStation(station)}
                    className="pt-[20px] pb-4 shadow-lg flex flex-col bg-white dark:bg-[#0f0f1975] rounded-3xl w-[80%] md:w-[270px] h-auto cursor-pointer transition duration-500 transform hover:scale-105 hover:shadow-2xl border border-slate-100 dark:border-transparent backdrop-blur-sm"
                  >
                    <div className="relative mx-auto mb-4 group">
                      <img
                        alt=">>"
                        className="w-32 h-32 rounded-full object-cover border-4 border-teal-500 dark:border-blue-500 shadow-xl transition-transform duration-500 group-hover:rotate-6"
                        src={RADIO_CARD_IMAGE}
                      />
                      <div className="absolute inset-0 rounded-full bg-teal-500/10 dark:bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="font-bold pb-2 px-4 text-slate-800 dark:text-white mt-2 text-center text-sm sm:text-base line-clamp-2 leading-relaxed">
                      {cleanStationName(station.Name)}
                    </h3>
                  </button>
                ))
            )}
          </div>

          {visibleCount < filteredStations.length && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setVisibleCount((prev) => prev + 16)}
                className="mb-8 rounded-2xl border border-slate-200 bg-white px-8 py-3 font-bold text-slate-700 shadow-md transition-all hover:bg-teal-50 dark:border-transparent dark:bg-[#0f0f1975] dark:text-white dark:hover:bg-teal-600"
                aria-label="تحميل المزيد من محطات الراديو"
              >
                المزيد من المحطات
              </button>
            </div>
          )}
        </>
      )}

      {currentStation && (
        <div className="fixed bottom-0 left-0 right-[60px] z-[9999] border-t border-white/10 bg-white/95 px-4 py-3 shadow-2xl backdrop-blur-xl dark:bg-slate-950/95">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 md:flex-row md:justify-between">
            <div className="flex min-w-0 items-center gap-3 text-right">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700 dark:bg-teal-500/20 dark:text-teal-300">
                <RadioIcon className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-900 dark:text-white sm:text-base">
                  {cleanStationName(currentStation.Name)}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">بث مباشر</p>
              </div>
            </div>

            <div className="flex w-full items-center gap-3 md:w-auto">
              <button
                type="button"
                onClick={togglePlay}
                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-teal-600 text-white shadow-md transition hover:bg-teal-700 active:scale-95"
                aria-label={isPlaying ? "إيقاف الراديو" : "تشغيل الراديو"}
              >
                {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current" />}
              </button>
              <audio
                ref={audioRef}
                className="w-full md:w-[380px]"
                controls
                src={currentStation.URL}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
              >
                متصفحك لا يدعم تشغيل الصوت.
              </audio>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Radio;
