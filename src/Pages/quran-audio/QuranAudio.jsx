import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";
import GloableContext from "../../store/GloableContext";

const QURAN_AUDIO_API = "https://www.mp3quran.net/api/_arabic.json";

const normalizeServerUrl = (url) => {
  if (!url) return "";
  return url.endsWith("/") ? url : `${url}/`;
};

function QuranAudio() {
  const { setNameOfQarui, setUrl, setRewaya } = useContext(GloableContext);
  const [reciters, setReciters] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReciters = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(QURAN_AUDIO_API);
        if (!response.ok) {
          throw new Error("Failed to fetch reciters");
        }

        const data = await response.json();
        setReciters(Array.isArray(data.reciters) ? data.reciters : []);
      } catch (err) {
        console.error("Error fetching Quran audio reciters:", err);
        setError("تعذر تحميل القراء الآن. حاول مرة أخرى.");
      } finally {
        setLoading(false);
      }
    };

    fetchReciters();
  }, []);

  const dataSearch = reciters.filter((item) =>
    item.name?.includes(searchVal.trim())
  );

  // set url of quri and name of quri
  const handelLinkQuari = (item) => {
    const serverUrl = normalizeServerUrl(item.Server);

    localStorage.setItem("currentUrl", serverUrl);
    localStorage.setItem("nameOfQauri", item.name || "");
    localStorage.setItem("rewaya", item.rewaya || "");
    localStorage.setItem("quranAudioSuras", item.suras || "");

    setUrl(serverUrl);
    setNameOfQarui(item.name || "");
    setRewaya(item.rewaya || "");
  };

  return (
    <>
      <div className="min-h-screen pb-8 w-full md:w-[90%] mx-auto text-white text-center">
        {/* Start search  */}
        <div className="mt-8 w-[90%] md:w-[500px] mx-auto relative">
          <input
            type="text"
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder="ابحث عن قاريء..."
            className="w-full p-4 px-6 text-center text-white text-md rounded-2xl bg-white/5 hover:bg-white/10 focus:bg-white/15 outline-none transition-all duration-300 shadow-lg placeholder:text-sky-200/50 font-medium backdrop-blur-sm border-none ring-0"
            dir="rtl"
          />
        </div>
        {/* End Search  */}

        {/* download icon */}
        <Link
          to="/quran/download"
          className="flex items-center justify-center gap-2 mt-6 w-[90%] md:w-[500px] mx-auto text-teal-400 bg-white/5 backdrop-blur-sm rounded-2xl p-4 hover:scale-[1.02] hover:bg-white/10 hover:text-teal-300 transition-all duration-300 shadow-lg border-none"
        >
          <i className="bi bi-download"></i>
          <span className="font-bold">تحميل القران</span>
        </Link>
        {/* End download icon */}
        {/* show Data  */}
        <div
          className="pt-10 px-4 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-center"
          dir="rtl"
        >
          {loading && (
            <div className="col-span-full py-10 text-teal-300 font-bold">
              جاري تحميل القراء...
            </div>
          )}

          {error && !loading && (
            <div className="col-span-full py-10 text-red-300 font-bold">
              {error}
            </div>
          )}

          {!loading && !error && dataSearch.length === 0 && (
            <div className="col-span-full py-10 text-white/70 font-bold">
              لا يوجد قارئ بهذا الاسم
            </div>
          )}

          {dataSearch.map((item) => {
            return (
              <div key={item.id} className="h-full">
                <Link
                  to="/quran/player"
                  onClick={() => handelLinkQuari(item)}
                  className="rounded-2xl p-5 text-white bg-white/5 backdrop-blur-sm border border-white/10 block cursor-pointer text-center hover:-translate-y-1 hover:border-teal-400/50 hover:shadow-md hover:text-teal-300 hover:bg-white/10 transition-all duration-300 font-bold text-sm md:text-base h-full flex items-center justify-center min-h-[80px]"
                >
                  <span>
                    {item.name}
                    {item.rewaya && (
                      <span className="block mt-2 text-xs text-white/50 font-normal">
                        {item.rewaya}
                      </span>
                    )}
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
        {/* End show Data  */}
      </div>
    </>
  );
}

export default QuranAudio;
