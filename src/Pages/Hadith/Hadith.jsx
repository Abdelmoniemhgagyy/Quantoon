import { useEffect, useState, useCallback } from 'react';
import './Hadith.css';
import Loading from '../../components/Loading/Loading';
import { motion } from 'framer-motion';
import call from '../../api/call';
import CopyIcons from '../../components/CopyIcons/CopyIcons';

function Hadith() {
  const [data, setData] = useState([]);
  const [book, setBook] = useState('bukhari');
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const limit = 50;

  const changeBook = (nameOfBook) => {
    if (nameOfBook === book) return;
    setBook(nameOfBook);
    setOffset(0);
    setData([]);
    setSearchTerm('');
  };
  const handleData = useCallback(async () => {
    setLoading(true);
    const newData = await call.hadithData(book, offset, offset + limit);
setData((prev) => {
  const combined = [...prev, ...newData];
  const unique = combined.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.number === item.number)
  );
  return unique;
});

    setLoading(false);
  }, [book, offset]);

  useEffect(() => {
    handleData();
  }, [handleData]);

  const handleLoadMore = () => {
    setOffset((prev) => prev + limit);
  };

  useEffect(() => {
    window.scroll({ top: 0 });
  }, [book]);

const removeDiacritics = (text) => {
  return text.normalize("NFD").replace(/[\u064B-\u065F]/g, "");
};

const filteredData = data.filter((item) =>
  removeDiacritics(item.arab).includes(removeDiacritics(searchTerm))
);
  return (
    <motion.div
      initial={{ y: '60vh' }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7 }}
      exit={{ x: '-100vw' }}
      className="ahadith-container"
    >
      {/* Navbar */}
      <nav className="hadith">
        <div className="btn-conntainer">
          <button onClick={() => changeBook('bukhari')}>صحيح البخاري</button>
          <button onClick={() => changeBook('muslim')}>صحيح مسلم</button>
          <button onClick={() => changeBook('nasai')}>سنن النسائي</button>
          <button onClick={() => changeBook('abu_dawud')}>سنن أبي داود</button>
          <button onClick={() => changeBook('tirmidzi')}>سنن الترمذي</button>
          <button onClick={() => changeBook('ibnu_majah')}>سنن ابن ماجه</button>
          <button onClick={() => changeBook('malik')}>موطأ مالك</button>
          <button onClick={() => changeBook('ahmad')}>مسند الإمام أحمد</button>
        </div>
      </nav>

      {/* ✅ Search Box */}
      <div className="text-center mt-5">
        <input
          type="text"
          placeholder="ابحث داخل الكتاب..."
          className="w-[80%] max-w-md border outline-none rounded-full p-2 text-center"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Loading */}
      {loading && offset === 0 ? (
        <Loading />
      ) : (
        <div>
          {/* Show data */}
          {filteredData.length > 0 ? (
            filteredData.map((item, i) => (
              <div key={i} className="hadith-content relative">
                <p className="pl-[8px] mb-1">{item.arab}</p>
                <h6 className="text-center mt-4 ">
                  <span className="bg-gradient-to-br from-emerald-400 to-blue-700 text-white px-3 rounded-full">
                    {item.number}
                  </span>
                </h6>
                <CopyIcons copiedText={item.arab} />
              </div>
            ))
          ) : (
            <p className="text-center text-white mt-5">لا توجد نتائج مطابقة للبحث</p>
          )}

          {/* Load More */}
          {!loading && !searchTerm && (
            <div className="text-center mt-[22px]">
              <button
                onClick={handleLoadMore}
                className="px-6 py-2 bg-gradient-to-br from-emerald-400 to-blue-700 hover:bg-emerald-700 text-white rounded-lg transition"
              >
                تحميل المزيد
              </button>
            </div>
          )}

          {loading && offset > 0 && <Loading />}
        </div>
      )}

    </motion.div>
  );
}

export default Hadith;
