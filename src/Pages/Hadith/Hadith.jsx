import { useEffect, useState, useCallback } from 'react';
import './Hadith.css';
import Loading from '../../components/Loading/Loading';
import { motion } from 'framer-motion';
import call from '../../api/call';
import CopyIcons from '../../components/CopyIcons/CopyIcons';

const books = [
  { value: 'bukhari', label: 'صحيح البخاري' },
  { value: 'muslim', label: 'صحيح مسلم' },
  { value: 'nasai', label: 'سنن النسائي' },
  { value: 'abu_dawud', label: 'سنن أبي داود' },
  { value: 'tirmidzi', label: 'سنن الترمذي' },
  { value: 'ibnu_majah', label: 'سنن ابن ماجه' },
  { value: 'malik', label: 'موطأ مالك' },
  { value: 'ahmad', label: 'مسند الإمام أحمد' },
];

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
  const selectedBookLabel =
    books.find(({ value }) => value === book)?.label || 'الأحاديث';

  return (
    <motion.div
      initial={{ y: '60vh' }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7 }}
      exit={{ x: '-100vw' }}
      className="ahadith-container"
    >
      <div className="m-2 btn">
        <h1 className="hadith-title">{selectedBookLabel}</h1>
      </div>

      <nav className="hadith">
        <div className="btn-conntainer" aria-label="كتب الحديث">
          {books.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              aria-pressed={book === value}
              onClick={() => changeBook(value)}
              className={book === value ? 'active-btn' : ''}
            >
              {label}
            </button>
          ))}
        </div>
      </nav>

      <div className="hadith-search">
        <input
          type="text"
          placeholder="ابحث داخل الكتاب..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading && offset === 0 ? (
        <Loading />
      ) : (
        <div className="hadith-list">
          {filteredData.length > 0 ? (
            filteredData.map((item, i) => (
              <article
                key={`${book}-${item.number}-${i}`}
                className="hadith-content relative"
              >
                <p>{item.arab}</p>
                <span className="hadith-number">{item.number}</span>
                <CopyIcons copiedText={item.arab} className="hadith-copy" />
              </article>
            ))
          ) : (
            <p className="hadith-empty">لا توجد نتائج مطابقة للبحث</p>
          )}

          {!loading && !searchTerm && (
            <div className="hadith-load-more">
              <button
                type="button"
                onClick={handleLoadMore}
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
