import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../api/supabase';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading/Loading';
import AddDeceasedModal from './AddDeceasedModal';

function TasbeehItem({ deceasedName, dua, count, onIncrement }) {
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
                    onClick={onIncrement}
                    className="absolute inset-0 m-auto w-36 h-36 rounded-full bg-transparent hover:bg-teal-500/10 active:bg-teal-500/20 transition-all flex flex-col items-center justify-center outline-none select-none z-10"
                    aria-label="تسبيح"
                >
                    <span className="text-5xl font-bold text-[#144b6d] dark:text-teal-400 tabular-nums">{count}</span>
                </button>
            </div>

            {/* Text */}
            <h3 className="text-2xl mt-2 font-bold text-[#144b6d] dark:text-teal-300 text-center font-['Scheherazade_New',_serif] leading-loose">
                {dua.text?.replace(/{name}/g, deceasedName)}
            </h3>
        </div>
    );
}

// ------- Tasbeeh Tab -------
const DEBOUNCE_DELAY = 2000; // ms of inactivity before saving to Supabase

function TasbeehTab({ deceased }) {
    const [duas, setDuas] = useState([]);
    const [loadingDua, setLoadingDua] = useState(true);

    // Source-of-truth counts as stored in DB (or last synced value)
    const [dbCounts, setDbCounts] = useState({});
    // Fast local counts shown in UI (includes unsaved clicks)
    const [localCounts, setLocalCounts] = useState({});

    // Refs so callbacks always see latest values without re-subscribing
    const localCountsRef = useRef({});
    const dbCountsRef = useRef({});
    // Per-dua debounce timer handles: { [duaId]: timeoutId }
    const debounceTimers = useRef({});

    const deceasedId = deceased.id;

    useEffect(() => { localCountsRef.current = localCounts; }, [localCounts]);
    useEffect(() => { dbCountsRef.current = dbCounts; }, [dbCounts]);

    // -------- Supabase helpers --------
    const upsertTasbeehCounter = useCallback(async (duaId, count) => {
        try {
            const { error } = await supabase
                .from('deceased_action_counter')
                .upsert(
                    { deceased_id: deceasedId, dua_id: duaId, total_count: count },
                    { onConflict: 'deceased_id,dua_id' }
                );
            if (error) console.error('Upsert error:', error);
        } catch (err) {
            console.error('Error saving counter:', err);
        }
    }, [deceasedId]);

    // Save every dua that has unsaved local changes
    const flushAll = useCallback(() => {
        const local = localCountsRef.current;
        const db = dbCountsRef.current;
        const timers = debounceTimers.current;

        Object.keys(local).forEach(duaId => {
            const localVal = local[duaId] ?? 0;
            const dbVal = db[duaId] ?? 0;
            if (localVal !== dbVal) {
                clearTimeout(timers[duaId]);
                delete timers[duaId];
                upsertTasbeehCounter(duaId, localVal);
                // Update dbCounts so future diffs are accurate
                dbCountsRef.current = { ...dbCountsRef.current, [duaId]: localVal };
            }
        });
    }, [upsertTasbeehCounter]);

    // -------- Initial data load --------
    const loadTasbeehData = useCallback(async () => {
        setLoadingDua(true);
        try {
            let { data: duasData, error: duasError } = await supabase
                .from('duas')
                .select('*')
                .eq('type', 'tasbeeh')
                .eq('gender', deceased.gender);

            if (duasError) throw duasError;

            if (!duasData || duasData.length === 0) {
                const res = await supabase
                    .from('duas')
                    .select('*')
                    .eq('type', 'tasbeeh')
                    .eq('gender', 'general');
                if (res.error) throw res.error;
                duasData = res.data;
            }
            setDuas(duasData || []);

            const { data: countersData, error: countersError } = await supabase
                .from('deceased_action_counter')
                .select('dua_id, total_count')
                .eq('deceased_id', deceasedId);

            if (countersError) throw countersError;

            const countsMap = {};
            (countersData || []).forEach(row => {
                countsMap[row.dua_id] = row.total_count;
            });
            setDbCounts(countsMap);
            setLocalCounts(countsMap);
        } catch (err) {
            console.error('Error loading tasbeeh data:', err);
        } finally {
            setLoadingDua(false);
        }
    }, [deceased.gender, deceasedId]);

    useEffect(() => {
        loadTasbeehData();
    }, [loadTasbeehData]);

    // -------- Realtime subscription --------
    useEffect(() => {
        if (!deceasedId) return;

        const subscription = supabase
            .channel(`tasbeeh_rt_${deceasedId}`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'deceased_action_counter',
                    filter: `deceased_id=eq.${deceasedId}`
                },
                (payload) => {
                    const row = payload.new;
                    if (!row?.dua_id) return;
                    // Only update if the incoming value is higher than what we show locally
                    // to avoid clobbering unsaved clicks from the current session
                    setDbCounts(prev => ({ ...prev, [row.dua_id]: row.total_count }));
                    setLocalCounts(prev => {
                        const current = prev[row.dua_id] ?? 0;
                        return current < row.total_count
                            ? { ...prev, [row.dua_id]: row.total_count }
                            : prev;
                    });
                }
            )
            .subscribe();

        return () => {
            flushAll();
            supabase.removeChannel(subscription);
        };
    }, [deceasedId, flushAll]);

    // -------- Save on page hide / unload --------
    useEffect(() => {
        const onHide = () => flushAll();
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') onHide();
        });
        window.addEventListener('beforeunload', onHide);
        return () => {
            document.removeEventListener('visibilitychange', onHide);
            window.removeEventListener('beforeunload', onHide);
        };
    }, [flushAll]);

    // -------- Increment with debounce --------
    const incrementTasbeeh = useCallback((duaId) => {
        // 1. Update UI immediately
        setLocalCounts(prev => {
            const next = { ...prev, [duaId]: (prev[duaId] ?? 0) + 1 };
            localCountsRef.current = next;
            return next;
        });

        // 2. Reset debounce timer for this dua
        const timers = debounceTimers.current;
        clearTimeout(timers[duaId]);
        timers[duaId] = setTimeout(() => {
            const newCount = localCountsRef.current[duaId];
            upsertTasbeehCounter(duaId, newCount);
            setDbCounts(prev => ({ ...prev, [duaId]: newCount }));
            delete timers[duaId];
        }, DEBOUNCE_DELAY);
    }, [upsertTasbeehCounter]);

    return (
        <div className="py-6">
            {loadingDua ? (
                <div className="flex flex-col items-center justify-center min-h-[200px]">
                    <Loading itemsCenter="true" />
                </div>
            ) : duas.length > 0 ? (
                <div className="flex flex-wrap justify-center gap-6">
                    {duas.map((dua, index) => (
                        <TasbeehItem
                            key={dua.id || index}
                            deceasedName={deceased.name}
                            dua={dua}
                            count={localCounts[dua.id] ?? 0}
                            onIncrement={() => incrementTasbeeh(dua.id)}
                        />
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
function DuaItem({ dua, deceasedName, count, onIncrement }) {
    return (
        <div
            onClick={onIncrement}
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
        </div>
    );
}

// ------- DuasTab -------
function DuasTab({ deceased }) {
    const [duas, setDuas] = useState([]);
    const [loading, setLoading] = useState(true);
    const ITEMS_PER_PAGE = 10;
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

    const [dbCounts, setDbCounts] = useState({});
    const [localCounts, setLocalCounts] = useState({});

    const localCountsRef = useRef({});
    const dbCountsRef = useRef({});
    const debounceTimers = useRef({});

    const deceasedId = deceased.id;

    useEffect(() => { localCountsRef.current = localCounts; }, [localCounts]);
    useEffect(() => { dbCountsRef.current = dbCounts; }, [dbCounts]);

    const loadMore = () => setVisibleCount(prev => prev + ITEMS_PER_PAGE);

    // -------- Supabase upsert --------
    const upsertDuaCounter = useCallback(async (duaId, count) => {
        try {
            const { error } = await supabase
                .from('deceased_action_counter')
                .upsert(
                    { deceased_id: deceasedId, dua_id: duaId, total_count: count },
                    { onConflict: 'deceased_id,dua_id' }
                );
            if (error) console.error('Dua upsert error:', error);
        } catch (err) {
            console.error('Error saving dua counter:', err);
        }
    }, [deceasedId]);

    // Flush all unsaved local changes to Supabase
    const flushAll = useCallback(() => {
        const local = localCountsRef.current;
        const db = dbCountsRef.current;
        const timers = debounceTimers.current;
        Object.keys(local).forEach(duaId => {
            const localVal = local[duaId] ?? 0;
            const dbVal = db[duaId] ?? 0;
            if (localVal !== dbVal) {
                clearTimeout(timers[duaId]);
                delete timers[duaId];
                upsertDuaCounter(duaId, localVal);
                dbCountsRef.current = { ...dbCountsRef.current, [duaId]: localVal };
            }
        });
    }, [upsertDuaCounter]);

    // -------- Initial data load --------
    const fetchDuas = useCallback(async () => {
        setLoading(true);
        try {
            let { data, error } = await supabase
                .from('duas')
                .select('*')
                .eq('type', 'dua')
                .eq('gender', deceased.gender);
            if (error) throw error;

            const { data: generalData, error: generalError } = await supabase
                .from('duas')
                .select('*')
                .eq('type', 'dua')
                .eq('gender', 'general');
            if (generalError) throw generalError;

            const merged = [...(data || []), ...(generalData || [])];
            merged.sort(() => Math.random() - 0.5);
            setDuas(merged);

            const duaIds = merged.map(d => d.id);
            if (duaIds.length > 0) {
                const { data: countersData, error: countersError } = await supabase
                    .from('deceased_action_counter')
                    .select('dua_id, total_count')
                    .eq('deceased_id', deceasedId)
                    .in('dua_id', duaIds);

                if (!countersError) {
                    const countsMap = {};
                    (countersData || []).forEach(row => {
                        countsMap[row.dua_id] = row.total_count;
                    });
                    setDbCounts(countsMap);
                    setLocalCounts(countsMap);
                }
            }
        } catch (err) {
            console.error('Error loading duas:', err);
        } finally {
            setLoading(false);
        }
    }, [deceased.gender, deceasedId]);

    useEffect(() => { fetchDuas(); }, [fetchDuas]);

    // -------- Realtime --------
    useEffect(() => {
        if (!deceasedId) return;

        const subscription = supabase
            .channel(`dua_rt_${deceasedId}`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'deceased_action_counter',
                    filter: `deceased_id=eq.${deceasedId}`
                },
                (payload) => {
                    const row = payload.new;
                    if (!row?.dua_id) return;
                    setDbCounts(prev => ({ ...prev, [row.dua_id]: row.total_count }));
                    setLocalCounts(prev => {
                        const current = prev[row.dua_id] ?? 0;
                        return current < row.total_count
                            ? { ...prev, [row.dua_id]: row.total_count }
                            : prev;
                    });
                }
            )
            .subscribe();

        return () => {
            flushAll();
            supabase.removeChannel(subscription);
        };
    }, [deceasedId, flushAll]);

    // -------- Save on page hide / unload --------
    useEffect(() => {
        const onHide = () => flushAll();
        const onVisibility = () => { if (document.visibilityState === 'hidden') onHide(); };
        document.addEventListener('visibilitychange', onVisibility);
        window.addEventListener('beforeunload', onHide);
        return () => {
            document.removeEventListener('visibilitychange', onVisibility);
            window.removeEventListener('beforeunload', onHide);
        };
    }, [flushAll]);

    // -------- Increment with debounce --------
    const incrementDua = useCallback((duaId) => {
        setLocalCounts(prev => {
            const next = { ...prev, [duaId]: (prev[duaId] ?? 0) + 1 };
            localCountsRef.current = next;
            return next;
        });

        const timers = debounceTimers.current;
        clearTimeout(timers[duaId]);
        timers[duaId] = setTimeout(() => {
            const newCount = localCountsRef.current[duaId];
            upsertDuaCounter(duaId, newCount);
            setDbCounts(prev => ({ ...prev, [duaId]: newCount }));
            delete timers[duaId];
        }, DEBOUNCE_DELAY);
    }, [upsertDuaCounter]);

    if (loading) return <div className="py-12"><Loading /></div>;

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
                <DuaItem
                    key={dua.id}
                    dua={dua}
                    deceasedName={deceased.name}
                    count={localCounts[dua.id] ?? 0}
                    onIncrement={() => incrementDua(dua.id)}
                />
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
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleAddSuccess = (newDeceased) => {
        setIsModalOpen(false);
        navigate(`/deceased/${newDeceased.id}`);
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center"><Loading itemsCenter="true" /></div>;
    }

    if (!deceased) return null;

    return (
        <div className="min-h-screen pt-[68px] pb-12 w-full transition-all duration-300 pr-[75px] sm:pr-[85px] md:pr-[100px] pl-[15px] sm:pl-[25px]" dir="rtl">
            <div className="max-w-[900px] mx-auto">

                {/* Header Section */}
                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-teal-400 hover:text-teal-600 dark:hover:text-teal-300 transition-colors font-bold text-lg w-fit"
                    >
                        <i className="bi bi-arrow-right"></i>
                        العودة
                    </button>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white px-5 py-2 rounded-full font-bold shadow-lg shadow-teal-500/30 transition-all hover:scale-105 text-sm sm:text-base"
                    >
                        <i className="bi bi-plus-lg text-lg"></i>
                        <span>إضافة حبيب</span>
                    </button>
                </div>

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

            <AddDeceasedModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleAddSuccess}
            />
        </div>
    );
}
