import React, { useState, useEffect } from 'react';
import { Compass, MapPin, Navigation, Loader } from 'lucide-react';

export default function Qibla() {
  const [qiblaDirection, setQiblaDirection] = useState(null);
  const [deviceHeading, setDeviceHeading] = useState(0);
  const [location, setLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [hasCompass, setHasCompass] = useState(false);
  const [manualRotation, setManualRotation] = useState(0);

  // إحداثيات الكعبة المشرفة
  const KAABA_LAT = 21.4225;
  const KAABA_LNG = 39.8262;

  // حساب اتجاه القبلة
  const calculateQiblaDirection = (lat, lng) => {
    const toRad = (deg) => (deg * Math.PI) / 180;
    const toDeg = (rad) => (rad * 180) / Math.PI;

    const lat1 = toRad(lat);
    const lng1 = toRad(lng);
    const lat2 = toRad(KAABA_LAT);
    const lng2 = toRad(KAABA_LNG);

    const dLng = lng2 - lng1;

    const y = Math.sin(dLng) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);

    let bearing = toDeg(Math.atan2(y, x));
    bearing = (bearing + 360) % 360;

    return bearing;
  };

  // حساب المسافة إلى الكعبة
  const calculateDistance = (lat, lng) => {
    const R = 6371; // نصف قطر الأرض بالكيلومتر
    const toRad = (deg) => (deg * Math.PI) / 180;

    const dLat = toRad(KAABA_LAT - lat);
    const dLng = toRad(KAABA_LNG - lng);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat)) * Math.cos(toRad(KAABA_LAT)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance.toFixed(0);
  };

  // الحصول على الموقع الجغرافي
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          setQiblaDirection(calculateQiblaDirection(latitude, longitude));
          setDistance(calculateDistance(latitude, longitude));
          setLoading(false);
        },
        (err) => {
          setError('الرجاء السماح بالوصول إلى الموقع الجغرافي');
          setPermissionDenied(true);
          setLoading(false);
        }
      );
    } else {
      setError('المتصفح لا يدعم تحديد الموقع الجغرافي');
      setLoading(false);
    }
  }, []);

  // الحصول على اتجاه الجهاز
  useEffect(() => {
    const handleOrientation = (event) => {
      let heading = event.alpha;
      if (event.webkitCompassHeading) {
        heading = event.webkitCompassHeading;
      }
      if (heading !== null) {
        setDeviceHeading(360 - heading);
        setHasCompass(true);
      }
    };

    if (window.DeviceOrientationEvent) {
      // طلب الإذن على iOS
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
          .then((permissionState) => {
            if (permissionState === 'granted') {
              window.addEventListener('deviceorientation', handleOrientation);
              setHasCompass(true);
            }
          })
          .catch(console.error);
      } else {
        window.addEventListener('deviceorientation', handleOrientation);
        // اختبار إذا كان الجهاز يدعم البوصلة
        setTimeout(() => {
          if (deviceHeading === 0) {
            setHasCompass(false);
          }
        }, 2000);
      }
    } else {
      setHasCompass(false);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [deviceHeading]);

  const requestPermission = async () => {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const permission = await DeviceOrientationEvent.requestPermission();
        if (permission === 'granted') {
          window.location.reload();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const compassRotation = qiblaDirection !== null 
    ? (hasCompass ? qiblaDirection - deviceHeading : qiblaDirection + manualRotation)
    : 0;

  return (
    <div className="min-h-screen mr-[60px]  text-white font-arabic" dir="rtl">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L2c+PC9zdmc+')] opacity-20"></div>
        
        <div className="relative pt-8 pb-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-full">
                <Compass className="w-12 h-12 text-emerald-300" />
              </div>
            </div>
            <h1 className="text-4xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-emerald-200 to-cyan-200 bg-clip-text text-transparent">
                        هذه صفحة تجريبة لم يتم إطلاقها بعد</h1>

            <h1 className="text-4xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-emerald-200 to-cyan-200 bg-clip-text text-transparent">
              اتجاه القبلة
            </h1>
            <p className="text-emerald-200 text-lg opacity-90">
              حدد اتجاه الكعبة المشرفة من موقعك الحالي
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader className="w-16 h-16 animate-spin text-emerald-300 mb-4" />
            <p className="text-xl text-emerald-200">جاري تحديد موقعك...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-2xl p-8 text-center">
            <div className="bg-red-500/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-red-200" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-red-200">خطأ في تحديد الموقع</h3>
            <p className="text-red-100 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl transition-all transform hover:scale-105"
            >
              إعادة المحاولة
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Info Cards */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Navigation className="w-5 h-5 text-emerald-300" />
                  <h3 className="text-lg font-semibold text-emerald-200">الاتجاه</h3>
                </div>
                <p className="text-3xl font-bold">{qiblaDirection?.toFixed(1)}°</p>
                <p className="text-sm text-emerald-200 mt-1">من الشمال</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="w-5 h-5 text-cyan-300" />
                  <h3 className="text-lg font-semibold text-cyan-200">المسافة</h3>
                </div>
                <p className="text-3xl font-bold">{distance} كم</p>
                <p className="text-sm text-cyan-200 mt-1">إلى الكعبة المشرفة</p>
              </div>
            </div>

            {/* Compass */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8">
              {/* تنبيه للكمبيوتر */}
              {!hasCompass && (
                <div className="bg-amber-500/20 backdrop-blur-sm border border-amber-400/30 rounded-xl p-4 mb-6 text-center">
                  <p className="text-amber-200 font-semibold mb-2">💻 وضع الكمبيوتر</p>
                  <p className="text-amber-100 text-sm mb-3">
                    جهازك لا يحتوي على حساس البوصلة. استخدم الأزرار أدناه لتدوير البوصلة يدوياً
                  </p>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => setManualRotation(prev => prev - 10)}
                      className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-all transform hover:scale-105"
                    >
                      ↺ يسار
                    </button>
                    <button
                      onClick={() => setManualRotation(0)}
                      className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-all transform hover:scale-105"
                    >
                      إعادة ضبط
                    </button>
                    <button
                      onClick={() => setManualRotation(prev => prev + 10)}
                      className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-all transform hover:scale-105"
                    >
                      يمين ↻
                    </button>
                  </div>
                </div>
              )}

              <div className="relative w-full max-w-md mx-auto aspect-square">
                {/* Compass Base */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-600/30 to-cyan-600/30 backdrop-blur-sm border-4 border-white/30 shadow-2xl">
                  {/* Direction Markers */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute top-4 font-bold text-2xl text-emerald-300">شمال</div>
                    <div className="absolute bottom-4 font-bold text-lg text-white/60">جنوب</div>
                    <div className="absolute right-4 font-bold text-lg text-white/60">شرق</div>
                    <div className="absolute left-4 font-bold text-lg text-white/60">غرب</div>
                  </div>

                  {/* Rotating Compass Needle */}
                  <div
                    className="absolute inset-0 transition-transform duration-300 ease-out"
                    style={{ transform: `rotate(${compassRotation}deg)` }}
                  >
                    {/* Kaaba Icon Circle */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full shadow-lg flex items-center justify-center border-4 border-white">
                        <div className="text-4xl">🕋</div>
                      </div>
                    </div>

                    {/* Arrow pointing to Qibla */}
                    <div className="absolute top-8 left-1/2 -translate-x-1/2">
                      <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[60px] border-b-emerald-400 drop-shadow-lg"></div>
                    </div>
                  </div>

                  {/* Center Dot */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg z-10"></div>
                </div>

                {/* Degree Markers */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                  {[...Array(36)].map((_, i) => {
                    const angle = i * 10;
                    const isMajor = angle % 90 === 0;
                    const length = isMajor ? 12 : 6;
                    const x1 = 100 + 90 * Math.cos((angle - 90) * Math.PI / 180);
                    const y1 = 100 + 90 * Math.sin((angle - 90) * Math.PI / 180);
                    const x2 = 100 + (90 - length) * Math.cos((angle - 90) * Math.PI / 180);
                    const y2 = 100 + (90 - length) * Math.sin((angle - 90) * Math.PI / 180);
                    
                    return (
                      <line
                        key={i}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="white"
                        strokeWidth={isMajor ? 2 : 1}
                        opacity={isMajor ? 0.8 : 0.4}
                      />
                    );
                  })}
                </svg>
              </div>

              <div className="text-center mt-6">
                {hasCompass ? (
                  <p className="text-emerald-200 text-lg">
                    📱 وَجِّهْ جهازك نحو الاتجاه المشار إليه بالسهم ⬆️
                  </p>
                ) : (
                  <p className="text-amber-200 text-lg">
                    💻 استخدم الأزرار أعلاه لتدوير البوصلة حتى يشير السهم للأعلى
                  </p>
                )}
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 text-cyan-200">كيفية الاستخدام:</h3>
              
              {hasCompass ? (
                <ul className="space-y-3 text-emerald-100">
                  <li className="flex items-start gap-3">
                    <span className="bg-cyan-500/30 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                    <span>اسمح للموقع بالوصول إلى موقعك الجغرافي</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-cyan-500/30 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                    <span>ضع جهازك على سطح مستوٍ</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-cyan-500/30 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                    <span>قم بتدوير نفسك حتى يشير السهم إلى الأعلى</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-cyan-500/30 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                    <span>هذا هو اتجاه القبلة ✨</span>
                  </li>
                </ul>
              ) : (
                <ul className="space-y-3 text-emerald-100">
                  <li className="flex items-start gap-3">
                    <span className="bg-cyan-500/30 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                    <span>اسمح للموقع بالوصول إلى موقعك الجغرافي</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-cyan-500/30 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                    <span>استخدم بوصلة حقيقية أو تطبيق بوصلة على هاتفك</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-cyan-500/30 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                    <span>قف باتجاه الشمال ثم استخدم زاوية القبلة المعروضة ({qiblaDirection?.toFixed(1)}°)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-cyan-500/30 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                    <span>أو استخدم الأزرار لتدوير البوصلة على الشاشة حتى تطابق اتجاهك ✨</span>
                  </li>
                </ul>
              )}
            </div>

            {/* Location Info */}
            {location && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center text-sm text-emerald-200">
                <p>موقعك الحالي: {location.lat.toFixed(4)}°, {location.lng.toFixed(4)}°</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}