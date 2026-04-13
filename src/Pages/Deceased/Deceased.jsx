import React, { useState, useEffect } from 'react';
import { supabase } from '../../api/supabase';
import { Link, useNavigate } from 'react-router-dom';
import AddDeceasedModal from './AddDeceasedModal';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading/Loading';

export default function Deceased() {
    const [deceasedList, setDeceasedList] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDeceased();
    }, []);

    const fetchDeceased = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('deceased')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            const list = data || [];
            // Randomize the order
            const randomizedList = [...list].sort(() => Math.random() - 0.5);
            setDeceasedList(randomizedList);
        } catch (err) {
            console.error(err);
            toast.error('حدث خطأ أثناء تحميل البيانات');
        } finally {
            setLoading(false);
        }
    };

    const handleAddSuccess = (newDeceased) => {
        navigate(`/deceased/${newDeceased.id}`);
    };

    const filteredList = deceasedList.filter(person =>
        person.name.includes(search)
    );

    return (
        <div className="min-h-screen pt-[100px] pb-12 w-full transition-all duration-300 pr-[75px] sm:pr-[85px] md:pr-[100px] pl-[15px] sm:pl-[25px]" dir="rtl">
            <div className="max-w-[1400px] mx-auto">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                    <div className="text-center md:text-right">
                        <h1 className="text-3xl sm:text-4xl font-bold font-['Marhey'] text-teal-400 mb-2">الدعاء لاخواننا</h1>
                        <p className=" text-gray-300">نسأل الله أن يتغمدهم بواسع رحمته</p>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-teal-500/30 transition-all hover:scale-105"
                    >
                        <i className="bi bi-plus-lg text-xl"></i>
                        <span>إضافة حبيب</span>
                    </button>
                </div>

                {/* Search Bar */}
                <div className="relative mb-10 max-w-2xl mx-auto md:mx-0">
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                        <i className="bi bi-search text-gray-400"></i>
                    </div>
                    <input
                        type="text"
                        className="w-full bg-white dark:bg-slate-800/80 border border-teal-100 dark:border-slate-700 text-gray-900 dark:text-white rounded-full focus:ring-2 focus:ring-teal-500 focus:border-teal-500 block w-full pr-12 p-3.5 shadow-sm transition-all placeholder-gray-400 dark:placeholder-gray-500"
                        placeholder="ابحث عن اسم المتوفى..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* List Section */}
                {loading ? (
                    <Loading itemsCenter="true" />
                ) : filteredList.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredList.map((person) => (
                            <Link
                                to={`/deceased/${person.id}`}
                                key={person.id}
                                className="group bg-white dark:bg-slate-800/60 dark:hover:bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 border border-teal-50 dark:border-slate-700 hover:border-teal-200 dark:hover:border-teal-400 shadow-sm hover:shadow-teal-500/5 dark:hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-xl px-[0.8px] font-bold text-[#144b6d] dark:text-white mb-2 line-clamp-2">{person.name}</h3>
                                    </div>
                                    <div className="w-12 h-12 rounded-full bg-teal-50 dark:bg-slate-700 flex items-center justify-center text-teal-500 dark:text-teal-400 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                                        <i className="bi bi-chevron-left text-lg"></i>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <i className="bi bi-folder2-open text-6xl text-gray-300 dark:text-slate-600 mb-4 block"></i>
                        <p className="text-xl text-gray-500 dark:text-gray-400 mb-6">لم يتم العثور على نتائج</p>
                        {search && (
                            <button
                                onClick={() => setSearch('')}
                                className="text-teal-500 hover:text-teal-600 font-medium"
                            >
                                مسح البحث
                            </button>
                        )}
                    </div>
                )}

            </div>

            <AddDeceasedModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleAddSuccess}
            />
        </div>
    );
}
