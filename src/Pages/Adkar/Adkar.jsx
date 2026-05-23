import React, { useEffect, useState } from "react";
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

const getAdkarKey = (category, item, index) =>
  `${category}-${index}-${item.content?.slice(0, 24) || "adkar"}`;

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
  const selectedAdkar = data[selectedCategory] || [];

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
      <div className="btn-conntainer" aria-label="أقسام الأذكار">
        {visibleCategories.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            aria-pressed={selectedCategory === value}
            onClick={() => setSelectedCategory(value)}
            className={selectedCategory === value ? "active-btn" : ""}
          >
            {label}
          </button>
        ))}
      </div>
      {selectedAdkar.map((item, index) => {
        const adkarKey = getAdkarKey(selectedCategory, item, index);

        return (
          <article key={adkarKey} className="dakr relative">
            <p className="adkar-content">{item.content}</p>
            {item.description && (
              <div className="adkar-meta">
                <p className="adkar-description">{item.description}</p>
              </div>
            )}
            <Counter
              key={adkarKey}
              repeatNumber={item.count}
              resetKey={adkarKey}
            />
            <CopyIcons copiedText={item.content} className="adkar-copy" />
          </article>
        );
      })}
    </motion.div>
  );
}

export default Adkar;
