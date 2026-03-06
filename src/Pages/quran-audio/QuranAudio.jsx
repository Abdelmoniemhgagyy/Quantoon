import { Link } from "react-router-dom";
import Qurai from "../../data/quran/qurai";
import { useState } from "react";
import { useContext } from "react";
import GloableContext from "../../store/GloableContext";

function QuranAudio() {
  const { setNameOfQarui, setUrl, setRewaya } = useContext(GloableContext);
  const [searchVal, setSearchVal] = useState("");
  const dataSearch = Qurai.filter((item) => item.name.includes(searchVal));

  // set url of quri and name of quri
  const handelLinkQuari = (itemurl, name, rewaya) => {
    localStorage.setItem("currentUrl", itemurl);
    setUrl(
      localStorage.getItem("currentUrl"),
      localStorage.setItem("nameOfQauri", name),
      setNameOfQarui(localStorage.getItem("nameOfQauri")),
      localStorage.setItem("rewaya", rewaya),
      setRewaya(localStorage.getItem("rewaya"))
    );
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
          {dataSearch.map((item) => {
            return (
              <div key={item.id} className="h-full">
                <Link
                  to="/quran/player"
                  onClick={() =>
                    handelLinkQuari(item.url_audio, item.name, item.rewaya)
                  }
                  className="rounded-2xl p-5 text-white bg-white/5 backdrop-blur-sm border border-white/10 block cursor-pointer text-center hover:-translate-y-1 hover:border-teal-400/50 hover:shadow-md hover:text-teal-300 hover:bg-white/10 transition-all duration-300 font-bold text-sm md:text-base h-full flex items-center justify-center min-h-[80px]"
                >
                  {item.name}
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
