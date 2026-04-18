import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { supabase } from '../../api/supabase';

// Components
import { FeedbackView } from './components/SharedComponents';
import JannahGrid from './components/JannahGrid';
import JannahDetails from './components/JannahDetails';
import { getInitialCounters } from './utils';

export default function BuildJannah() {
  const [counters, setCounters] = useState(getInitialCounters);
  const [jannahItems, setJannahItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMSG, setErrorMSG] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    localStorage.setItem('jannah_counters', JSON.stringify(counters));
  }, [counters]);

  useEffect(() => {
    let isMounted = true;
    const fetchItems = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('jannah_items')
          .select('*')
          .order('sort_order', { ascending: true });

        if (error) throw error;
        if (data && isMounted) setJannahItems(data);
      } catch (err) {
        console.error("Error fetching jannah items:", err.message);
        if (isMounted) setErrorMSG("عفواً، حدث خطأ أثناء تحميل البيانات. يرجى المحاولة لاحقاً.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchItems();
    return () => { isMounted = false; };
  }, []);

  const handleIncrement = (key) =>
    setCounters(prev => ({ ...prev, [key]: (prev[key] || 0) + 1 }));

  const clearCounters = () =>
    setCounters(prev => Object.keys(prev).reduce((acc, k) => ({ ...acc, [k]: 0 }), {}));

  // Render logic
  if (loading) {
    return (
      <FeedbackView>
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-500 mb-4"></div>
          <p className="text-teal-600 dark:text-teal-400 font-bold font-['Marhey'] text-xl">جاري تحميل الجنة...</p>
        </div>
      </FeedbackView>
    );
  }

  if (errorMSG) {
    return (
      <FeedbackView>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-red-200 dark:border-red-800 text-center max-w-md mx-4 shadow-xl">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4 font-['Marhey']">خطأ!</h2>
          <p className="text-slate-700 dark:text-slate-300 mb-6">{errorMSG}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full transition-colors shadow-lg"
          >
            إعادة المحاولة
          </button>
        </div>
      </FeedbackView>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {selectedItem ? (
        <JannahDetails
          key="details"
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          counter={counters[selectedItem.id]}
          onIncrement={handleIncrement}
        />
      ) : (
        <JannahGrid
          key="grid"
          items={jannahItems}
          counters={counters}
          setSelectedItem={setSelectedItem}
          clearCounters={clearCounters}
        />
      )}
    </AnimatePresence>
  );
}