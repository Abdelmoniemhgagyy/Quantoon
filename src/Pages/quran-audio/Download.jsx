import { useState } from "react";
import { Link } from "react-router-dom";
import data from "../../data/quran/downloadQuran";

function Download() {
  const [searchVal, setSearchVal] = useState("");
  const dataSearch = data.filter((item) => item.name.includes(searchVal));

  return (
    <div className="min-h-screen pb-8 w-full md:w-[90%] mx-auto text-white text-center relative">
      {/* back icon */}
      <div className="absolute right-4 md:right-0 top-6 text-3xl z-10 transition-transform hover:-translate-x-1 duration-300">
        <Link to="/quran/audio" className="text-white/70 hover:text-teal-400 transition-colors">
          <i className="bi bi-arrow-right-circle-fill shadow-lg rounded-full"></i>
        </Link>
      </div>
      {/* End back icon */}

      {/* Start search */}
      <div className="mt-8 w-[90%] md:w-[500px] mx-auto relative pt-4 md:pt-0">
        <input
          type="text"
          onChange={(e) => setSearchVal(e.target.value)}
          placeholder="ابحث عن قاريء..."
          className="w-full p-4 px-6 text-center text-white text-md rounded-2xl bg-white/5 hover:bg-white/10 focus:bg-white/15 outline-none transition-all duration-300 shadow-lg placeholder:text-sky-200/50 font-medium backdrop-blur-sm border-none ring-0"
          dir="rtl"
        />
      </div>
      {/* End Search */}

      {/* Title */}
      <div className="mt-8 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-sky-300">
          تحميل القران الكريم كامل
        </h1>
        <p className="text-white/60 mt-2 text-sm md:text-base">
          اختر القارئ لتحميل المصحف المرتل برابط مباشر
        </p>
      </div>
      {/* End Title */}

      {/* show Data */}
      <div
        className="pt-6 px-4 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-center"
        dir="rtl"
      >
        {dataSearch.map((item) => {
          return (
            <div key={item.id} className="h-full">
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl p-5 text-white bg-white/5 backdrop-blur-sm border border-white/10 block cursor-pointer text-center hover:-translate-y-1 hover:border-teal-400/50 hover:shadow-md hover:text-teal-300 hover:bg-white/10 transition-all duration-300 font-bold text-sm md:text-base h-full flex items-center justify-between min-h-[80px] group"
              >
                <span className="flex-1 right-0 text-right pr-2">{item.name}</span>
                <i className="bi bi-cloud-arrow-down-fill text-xl text-teal-400/70 group-hover:text-teal-300 transition-colors"></i>
              </a>
            </div>
          );
        })}
      </div>
      {/* End show Data */}
    </div>
  );
}

export default Download;