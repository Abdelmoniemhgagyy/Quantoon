import React, { useState, useEffect } from 'react';
import { supabase } from '../../api/supabase';
import { toast } from 'react-toastify';

export default function AddDeceasedModal({ isOpen, onClose, onSuccess }) {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('male');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setName('');
            setGender('male');
        }
    }, [isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;

        const addedCount = parseInt(localStorage.getItem('addedDeceasedCount') || '0', 10);
        if (addedCount >= 7) {
            toast.error('عذراً، لا يمكنك إضافة أكثر من 7 متوفين من نفس الجهاز.');
            return;
        }

        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('deceased')
                .insert([{ name: name.trim(), gender }])
                .select();

            if (error) throw error;

            localStorage.setItem('addedDeceasedCount', (addedCount + 1).toString());
            toast.success('تم الإضافة بنجاح');
            if (onSuccess && data) {
                onSuccess(data[0]);
            }
            onClose();
        } catch (err) {
            toast.error('حدث خطأ أثناء الإضافة. تأكد من أن قاعدة البيانات متصلة.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="mr-[60px] sm:mr-0 bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md max-h-[95vh] overflow-y-auto" dir="rtl">
                <div className="p-6 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center bg-gray-50 dark:bg-slate-800/50">
                    <h2 className="text-xl font-bold text-[#144b6d] dark:text-teal-400 font-['Marhey']">إضافة حبيب</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                        <i className="bi bi-x-lg text-xl"></i>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">اسم المتوفى</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="اكتب الاسم رباعي أو ثلاثي..."
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-slate-700 text-slate-800 dark:text-white transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">النوع</label>
                        <div className="flex gap-4">
                            <label className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl cursor-pointer border transition-all ${gender === 'male' ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 font-bold' : 'border-gray-200 dark:border-slate-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700'}`}>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    checked={gender === 'male'}
                                    onChange={() => setGender('male')}
                                    className="hidden"
                                />
                                <i className="bi bi-gender-male"></i>
                                ذكر
                            </label>
                            <label className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl cursor-pointer border transition-all ${gender === 'female' ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 font-bold' : 'border-gray-200 dark:border-slate-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700'}`}>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    checked={gender === 'female'}
                                    onChange={() => setGender('female')}
                                    className="hidden"
                                />
                                <i className="bi bi-gender-female"></i>
                                أنثى
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3.5 px-4 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-teal-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        {isLoading ? <i className="bi bi-arrow-repeat animate-spin block text-2xl h-7"></i> : 'إضافة المتوفى'}
                    </button>
                </form>
            </div>
        </div>
    );
}
