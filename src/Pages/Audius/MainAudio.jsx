import { useEffect, useMemo, useState } from "react";
import Itemcard from "../../components/Audio/Itemcard"
import data from "../../data/Audio/all_lectures_combined.json"
import shuffleArray from "../../components/shuffleArray"
function MainAudio() {
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(32);

  const filteredData = useMemo(() => {
    const filtered = data.filter(reciter =>
      reciter.seriesTitle &&
      String(reciter.seriesTitle).toLowerCase().includes(searchTerm.toLowerCase())
    );
    return shuffleArray(filtered);
  }, [searchTerm]);

  const visibleData = filteredData.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount(prev => prev + 16);
  };

  // إذا غيرت كلمة البحث أرجع عدد العناصر للعرض إلى 32
  useEffect(() => {
    setVisibleCount(32);
  }, [searchTerm]);

  return (
    <div className='mt-[40px] text-center px-4'>
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white transition-colors">
        المكتبة <span className="text-teal-600 dark:text-gradient"> الصوتية</span>
      </h1>
      <input
        type="text"
        className="m-2 h-[45px] w-[90%] md:w-[500px] rounded-2xl outline-none pr-5 text-right border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:ring-2 focus:ring-teal-500 transition-all"
        placeholder=" ... أبحث عن الدورة "
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className=" mt-[40px] flex flex-wrap justify-center gap-[40px] ">

        {visibleData.length === 0 ? (
          <p className="text-center text-slate-500 dark:text-slate-400 col-span-full">لا توجد نتائج للبحث.</p>
        ) : visibleData.map((item) => (
          <Itemcard key={item.id} Ele={item} />))}
      </div>
      {visibleCount < filteredData.length && (
        <div className="text-center mt-8">
          <button
            onClick={loadMore}
            className="px-8 py-3 mb-8 bg-white dark:bg-[#0f0f1975] text-slate-700 dark:text-white rounded-2xl shadow-md border border-slate-200 dark:border-transparent hover:bg-teal-50 dark:hover:bg-teal-600 transition-all font-bold"
            aria-label="تحميل المزيد من الدورات"
          >
            المزيد من الدورات
          </button>
        </div>
      )}
    </div>
  );
}

export default MainAudio