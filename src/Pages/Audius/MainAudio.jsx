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
    <div className='mt-[40px] text-center'>
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
        المكتبة <span className="text-gradient"> الصوتية</span>
      </h1>
      <input
            type="text"
            className="m-2 h-[35px] md:w-[500px] rounded-full outline-none pr-5 text-right"
            placeholder=" ... أبحث عن الدورة "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
      <div className=" mt-[40px] flex flex-wrap justify-center gap-[40px] ">
       
        {visibleData.length === 0 ? (
            <p className="text-center text-white col-span-full">لا توجد نتائج للبحث.</p>
          ) : visibleData.map((item) => (
          <Itemcard ket={item.id} Ele={item} />
        ))}
      </div>
      {visibleCount < filteredData.length && (
          <div className="text-center mt-8">
            <button
              onClick={loadMore}
              className="px-6 py-2 mb-4 bg-[#0f0f1975] text-white rounded-full hover:bg-teal-600 transition"
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