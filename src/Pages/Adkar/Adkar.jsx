import React, { useEffect, useMemo, useState } from "react";
import data from "../../data/adkar.json";
import "./adkar.css";
import { motion } from "framer-motion";
import CopyIcons from "../../components/CopyIcons/CopyIcons";
import Counter from "./Counter";

const categories = Object.keys(data);

const categoryLabels = {
  "أذكار بعد السلام من الصلاة المفروضة": "أذكار بعد السلام من الصلاة",
  "أذكار الاستيقاظ": "أذكار الأستيقاظ",
};

const normalizeAdkarContent = (content = "") =>
  content.replace(/\s+/g, " ").trim();

const getAdkarKey = (category, item, index) =>
  `${category}-${index}-${normalizeAdkarContent(item.content).slice(0, 32)}`;

const getUniqueAdkar = (items = []) => {
  const seen = new Set();

  return items.filter((item) => {
    const contentKey = normalizeAdkarContent(item.content);

    if (!contentKey || seen.has(contentKey)) {
      return false;
    }

    seen.add(contentKey);
    return true;
  });
};

const categoryTabs = categories.map((category) => ({
  value: category,
  label: categoryLabels[category] || category,
}));

const fallbackCategories = [
  "أذكار الصباح",
  "أذكار المساء",
  "أذكار بعد السلام من الصلاة المفروضة",
  "تسابيح",
  "أذكار النوم",
  "أذكار الاستيقاظ",
  "أدعية قرآنية",
  "أدعية الأنبياء",
];

function Adkar() {
  const visibleCategories = categoryTabs.length
    ? categoryTabs
    : fallbackCategories.map((category) => ({
        value: category,
        label: categoryLabels[category] || category,
      }));
  const [selectedCategory, setSelectedCategory] = useState(
    visibleCategories[0]?.value || ""
  );
  const selectedAdkar = useMemo(
    () => getUniqueAdkar(data[selectedCategory] || []),
    [selectedCategory]
  );

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [selectedCategory]);

  return (
    <motion.div
      initial={{ opacity: 0, y: "100vh" }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      exit={{ y: "-100vh" }}
      className="adkar-container"
    >
      <div className="m-2 btn ">
        <h1 className="text-[30px] text-[white] title-adkar ">
          {selectedAdkar[0]?.category || selectedCategory}
        </h1>
      </div>
      <div className="btn-conntainer" role="tablist" aria-label="أقسام الأذكار">
        {visibleCategories.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={selectedCategory === value}
            onClick={() => setSelectedCategory(value)}
            className={selectedCategory === value ? "active-btn" : ""}
          >
            {label}
          </button>
        ))}
      </div>
      <React.Fragment key={selectedCategory}>
        {selectedAdkar.length ? (
          selectedAdkar.map((item, index) => {
            const adkarKey = getAdkarKey(selectedCategory, item, index);

            return (
              <article key={adkarKey} className="dakr relative">
                <p className="adkar-content">{item.content}</p>
                {(item.description || item.reference) && (
                  <div className="adkar-meta">
                    {item.description && (
                      <p className="adkar-description">{item.description}</p>
                    )}
                    {item.reference && (
                      <p className="adkar-reference">{item.reference}</p>
                    )}
                  </div>
                )}
                <Counter
                  repeatNumber={item.count}
                  resetKey={adkarKey}
                />
                <CopyIcons copiedText={item.content} className="adkar-copy" />
              </article>
            );
          })
        ) : (
          <p className="adkar-empty">لا توجد أذكار في هذا القسم حالياً.</p>
        )}
      </React.Fragment>
    </motion.div>
  );
}

export default Adkar;
