import React, { useEffect, useState } from "react";
import axios from "axios";

// ترجمة أسماء الصلوات للعربية
const prayerNamesArabic = {
  Fajr: "الفجر",
  Sunrise: "الشروق",
  Dhuhr: "الظهر",
  Asr: "العصر",
  Maghrib: "المغرب",
  Isha: "العشاء",
};
// تحويل من 24 ساعة إلى 12 ساعة مع AM/PM
function formatTo12Hour(time24) {
  const [hour, minute] = time24.split(":").map(Number);
  const period = hour >= 12 ? "م" : "ص"; // م = مساء، ص = صباح
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${minute.toString().padStart(2, "0")} ${period}`;
}

function PrayerTimes() {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [locationName, setLocationName] = useState("جارٍ تحديد الموقع...");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrayerTimes = async (lat, long) => {
      try {
        const response = await axios.get(
          `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${long}&method=5`
        );
        setPrayerTimes(response.data.data.timings);
      } catch (error) {
        console.error("خطأ في جلب مواقيت الصلاة:", error);
        setError("تعذر تحميل مواقيت الصلاة.");
      }
    };

    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            fetchPrayerTimes(latitude, longitude);

            // جلب اسم المدينة من خلال reverse geocoding (API خارجي)
            try {
              const geoResponse = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
              );
              const city = geoResponse.data.address.city || geoResponse.data.address.town || geoResponse.data.address.village || "المدينة غير معروفة";
              setLocationName(city);
            } catch (geoError) {
              console.error("تعذر تحديد اسم المدينة:", geoError);
              setLocationName("المدينة غير معروفة");
            }
          },
          (err) => {
            console.error("فشل الحصول على الموقع:", err);
            setError("يجب السماح بالوصول إلى الموقع لعرض مواقيت الصلاة.");
          }
        );
      } else {
        setError("المتصفح لا يدعم تحديد الموقع الجغرافي.");
      }
    };

    getUserLocation();
  }, []);

  return (
    <div className="min-h-screen mr-[60px] flex justify-center items-center text-white">
      <div className="w-full max-w-md p-6 rounded-xl shadow-lg bg-gray-800 bg-opacity-50 backdrop-blur-md">
        <h1 className="text-3xl font-bold text-center mb-6 border-b border-gray-600 pb-2">
          مواقيت الصلاة - {locationName}
        </h1>

        {error ? (
          <p className="text-red-400 text-center">{error}</p>
        ) : prayerTimes ? (
<ul className="space-y-4">
  {Object.entries(prayerTimes).map(([name, time]) => {
    const arabicName = prayerNamesArabic[name];
    if (!arabicName) return null;

    return (
      <li
        key={name}
        className="flex justify-between items-center bg-gray-700 p-4 rounded-lg shadow hover:bg-gray-600 transition"
      >
        <span className="text-lg font-semibold">{arabicName}</span>
        <span className="text-lg">{formatTo12Hour(time)}</span>
      </li>
    );
  })}
</ul>

        ) : (
          <p className="text-center text-lg">جارٍ تحميل مواقيت الصلاة...</p>
        )}
      </div>
    </div>
  );
}

export default PrayerTimes;
