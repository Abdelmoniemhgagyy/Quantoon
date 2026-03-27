import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../api/supabase';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading/Loading';

const getStorageKey = (deceasedId, duaId) => `tasbeeh_${deceasedId}_${duaId}`;

function TasbeehItem({ deceasedId, deceasedName, dua }) {
    const storageKey = getStorageKey(deceasedId, dua.id);
    const [count, setCount] = useState(() => {
        const saved = localStorage.getItem(storageKey);
        return saved ? parseInt(saved, 10) : 0;
    });

    const handleIncrement = () => {
        const newCount = count + 1;
        setCount(newCount);
        localStorage.setItem(storageKey, newCount);
    };

    const handleReset = () => {
        setCount(0);
        localStorage.setItem(storageKey, 0);
    };

    const fillPercentage = count === 0 ? 0 : ((count % 10) === 0 ? 100 : (count % 10) * 10);
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (fillPercentage / 100) * circumference;

    return (
        <div className="flex flex-col items-center bg-white dark:bg-[transparent] dark:hover:bg-slate-800/50 rounded-3xl p-6 shadow-sm border border-teal-50 dark:border-slate-700 w-full max-w-sm hover:border-teal-200 hover:shadow-teal-500/5 hover:shadow-xl dark:hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">

            {/* Counter Ring */}
            <div className="relative flex justify-center items-center my-2 w-48 h-48">
                <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                    <circle
                        cx="100"
                        cy="100"
                        r={radius}
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-gray-200 dark:text-slate-700"
                    />
                    <circle
                        cx="100"
                        cy="100"
                        r={radius}
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                        className="text-teal-500 transition-all duration-300 ease-linear"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                    />
                </svg>
                <button
                    onClick={handleIncrement}
                    className="absolute inset-0 m-auto w-36 h-36 rounded-full bg-transparent hover:bg-teal-500/10 active:bg-teal-500/20 transition-all flex flex-col items-center justify-center outline-none select-none z-10"
                    aria-label="تسبيح"
                >
                    <span className="text-5xl font-bold text-[#144b6d] dark:text-teal-400 tabular-nums">{count}</span>
                </button>
            </div>

            {/* Reset Button */}
            <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-500 dark:text-red-400 text-sm font-medium transition-all mb-4"
            >
                <i className="bi bi-arrow-counterclockwise"></i>
                إعادة تعين
            </button>

            {/* Text */}
            <h3 className="text-2xl mt-2 font-bold text-[#144b6d] dark:text-teal-300 text-center font-['Scheherazade_New',_serif] leading-loose">
                {dua.text?.replace(/{name}/g, deceasedName)}
            </h3>
        </div>
    );
}

// ------- Tasbeeh Tab -------
function TasbeehTab({ deceased }) {
    const [duas, setDuas] = useState([]);
    const [loadingDua, setLoadingDua] = useState(true);

    const fetchTasbeehDuas = useCallback(async () => {
        setLoadingDua(true);
        try {
            let { data, error } = await supabase
                .from('duas')
                .select('*')
                .eq('type', 'tasbeeh')
                .eq('gender', deceased.gender);

            if (error) throw error;

            if (!data || data.length === 0) {
                const res = await supabase
                    .from('duas')
                    .select('*')
                    .eq('type', 'tasbeeh')
                    .eq('gender', 'general');
                if (res.error) throw res.error;
                data = res.data;
            }
            setDuas(data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingDua(false);
        }
    }, [deceased.gender]);

    useEffect(() => {
        fetchTasbeehDuas();
    }, [fetchTasbeehDuas]);

    return (
        <div className="py-6">
            {loadingDua ? (
                <div className="flex flex-col items-center justify-center min-h-[200px]">
                    <Loading itemsCenter="true" />
                </div>
            ) : duas.length > 0 ? (
                <div className="flex flex-wrap justify-center gap-6">
                    {duas.map((dua, index) => (
                        <TasbeehItem key={dua.id || index} deceasedId={deceased.id} deceasedName={deceased.name} dua={dua} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <i className="bi bi-circle text-5xl text-gray-300 dark:text-slate-600 block mb-4"></i>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">لا توجد أذكار متاحة</p>
                </div>
            )}
        </div>
    );
}
// ------- Dua Item -------
function DuaItem({ dua, deceasedName }) {
    const [count, setCount] = useState(0);

    return (
        <div
            onClick={() => setCount(prev => prev + 1)}
            className="cursor-pointer relative overflow-hidden bg-gradient-to-br from-white to-teal-50/30 hover:to-teal-50/60 dark:from-slate-800 dark:to-slate-800/50 dark:hover:from-slate-800/80 dark:hover:to-slate-800/80 rounded-2xl p-6 border border-teal-50 dark:border-slate-700 shadow-sm hover:shadow-teal-500/5 hover:shadow-xl dark:hover:shadow-xl hover:border-teal-200 dark:hover:border-teal-700 transition-all duration-500 transform hover:-translate-y-1 select-none text-center sm:text-right"
        >
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <span className="flex-shrink-0 w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 flex items-center justify-center text-xl font-bold transition-all duration-300">
                    {count}
                </span>
                <p className="text-lg text-[#144b6d] dark:text-gray-200 leading-loose font-['Scheherazade_New',_serif] mt-2 sm:mt-0">
                    {dua.text?.replace(/{name}/g, deceasedName)}
                </p>
            </div>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setCount(0);
                }}
                className="absolute left-0 bottom-[1px] rounded-tl-[20px] w-[35px] py-1 text-black bg-[#fff]"
            >
                <i className="bi bi-arrow-counterclockwise text-[#262639]"></i>
            </button>
        </div>
    );
}

// ------- DuasTab -------
function DuasTab({ deceased }) {
    const [duas, setDuas] = useState([]);
    const [loading, setLoading] = useState(true);
    const ITEMS_PER_PAGE = 10;
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

    const loadMore = () => {
        setVisibleCount(prev => prev + ITEMS_PER_PAGE);
    };

    const fetchDuas = useCallback(async () => {
        setLoading(true);
        try {
            // Try gender-specific
            let { data, error } = await supabase
                .from('duas')
                .select('*')
                .eq('type', 'dua')
                .eq('gender', deceased.gender);

            if (error) throw error;

            // Fallback: also fetch general duas
            const { data: generalData, error: generalError } = await supabase
                .from('duas')
                .select('*')
                .eq('type', 'dua')
                .eq('gender', 'general');

            if (generalError) throw generalError;

            // Merge gender-specific + general
            const merged = [...(data || []), ...(generalData || [])];
            // Shuffle initially
            merged.sort(() => Math.random() - 0.5);
            setDuas(merged);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [deceased.gender]);

    useEffect(() => {
        fetchDuas();
    }, [fetchDuas]);

    if (loading) {
        return <div className="py-12"><Loading /></div>;
    }

    if (duas.length === 0) {
        return (
            <div className="text-center py-16">
                <i className="bi bi-moon-stars text-5xl text-gray-300 dark:text-slate-600 block mb-4"></i>
                <p className="text-gray-500 dark:text-gray-400">لا توجد أدعية متاحة حالياً</p>
            </div>
        );
    }

    const visibleDuas = duas.slice(0, visibleCount);

    return (
        <div className="space-y-4 py-4">
            {visibleDuas.map((dua) => (
                <DuaItem key={dua.id} dua={dua} deceasedName={deceased.name} />
            ))}

            {visibleCount < duas.length && (
                <div className="flex justify-center mt-8 pb-4">
                    <button
                        onClick={loadMore}
                        className="px-8 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-teal-500/30 transition-all duration-300 transform hover:scale-105 active:scale-95"
                        style={{ fontFamily: "'Marhey', sans-serif" }}
                    >
                        عرض المزيد
                    </button>
                </div>
            )}
        </div>
    );
}

// ------- Main Details Page -------
export default function DeceasedDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [deceased, setDeceased] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('tasbeeh');

    useEffect(() => {
        const fetchDeceased = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('deceased')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error || !data) {
                    toast.error('لم يتم العثور على المتوفى');
                    navigate('/deceased');
                    return;
                }
                setDeceased(data);
            } catch (err) {
                console.error(err);
                navigate('/deceased');
            } finally {
                setLoading(false);
            }
        };

        fetchDeceased();
    }, [id, navigate]);

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            toast.success('تم نسخ الرابط بنجاح');
        } catch (err) {
            console.error(err);
            toast.error('حدث خطأ أثناء النسخ');
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center"><Loading itemsCenter="true" /></div>;
    }

    if (!deceased) return null;

    return (
        <div className="min-h-screen pt-[60px] pb-12 w-full transition-all duration-300 pr-[75px] sm:pr-[85px] md:pr-[100px] pl-[15px] sm:pl-[25px]" dir="rtl">
            <div className="max-w-[900px] mx-auto">

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-teal-400 hover:text-teal-600 dark:hover:text-teal-300 transition-colors mb-6 font-bold text-lg w-fit"
                >
                    <i className="bi bi-arrow-right"></i>
                    العودة
                </button>

                {/* Hero Card */}
                <div className="relative bg-gradient-to-br from-[#144b6d] to-teal-700 dark:from-slate-800 dark:to-[#0f3a52] rounded-3xl p-8 sm:p-10 mb-8 shadow-2xl overflow-hidden text-center">
                    {/* Decorative circles */}
                    <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-teal-500/20 blur-2xl z-0"></div>
                    <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-emerald-400/20 blur-2xl z-0"></div>

                    {/* Action Buttons Container */}
                    <div className="absolute top-4 sm:top-6 left-4 sm:left-6 flex items-center gap-3 z-20">
                        {/* WhatsApp button */}
                        <a
                            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`ادعُ لـ ${deceased.name}: ${window.location.href}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-white/10 hover:bg-green-500 border border-white/20 flex items-center justify-center text-white transition-all hover:scale-110 shadow-md backdrop-blur-md"
                            title="مشاركة عبر واتساب"
                        >
                            <i className="bi bi-whatsapp text-lg"></i>
                        </a>

                        {/* Copy Link button */}
                        <button
                            onClick={handleCopyLink}
                            className="w-10 h-10 rounded-full bg-white/10 hover:bg-teal-500 border border-white/20 flex items-center justify-center text-white transition-all hover:scale-110 shadow-md backdrop-blur-md"
                            title="نسخ الرابط"
                        >
                            <i className="bi bi-copy text-sm"></i>
                        </button>
                    </div>

                    <div className="relative z-10 mt-[50px] sm:mt-[0px]">
                        <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-4xl mx-auto mb-4 border border-white/20">
                            🕌
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-white font-['Marhey'] mb-3">
                            {deceased.name}</h1>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-8 bg-white/60 dark:bg-slate-800/60 rounded-2xl p-1.5 shadow-sm backdrop-blur-sm border border-teal-50 dark:border-slate-700">
                    {[
                        { id: 'tasbeeh', label: 'السبحة', icon: 'bi-circle-fill' },
                        { id: 'duas', label: 'الأدعية', icon: 'bi-moon-stars-fill' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold transition-all duration-300 text-sm sm:text-base ${activeTab === tab.id
                                ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg shadow-teal-500/30 scale-[1.02]'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-teal-50 dark:hover:bg-slate-700'
                                }`}
                        >
                            <i className={`bi ${tab.icon} text-xs`}></i>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="transition-all duration-300">
                    {activeTab === 'tasbeeh' && <TasbeehTab deceased={deceased} />}
                    {activeTab === 'duas' && <DuasTab deceased={deceased} />}
                </div>

            </div>
        </div>
    );
}
