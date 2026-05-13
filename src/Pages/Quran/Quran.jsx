import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { BookOpen, Layers, Headphones } from "lucide-react";

function Quran() {
  const links = [
    { to: "/quran", label: "السور", icon: <BookOpen size={20} className="ml-2" />, end: true },
    { to: "juza", label: "الأجزاء", icon: <Layers size={20} className="ml-2" />, end: false },
    { to: "audio", label: "القرآن صوتي", icon: <Headphones size={20} className="ml-2" />, end: false },
  ];

  return (
    <div className="min-h-screen bg-transparent text-white md:pr-0 pr-[65px] lg:pr-0" dir="rtl">
      {/* Top Header Banner */}
      <div className="text-emerald-800 w-full py-8 px-4 relative overflow-hidden">
        {/* Decorative circles to replace the missing pattern */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-white opacity-5 rounded-full blur-2xl"></div>
        <div className="relative max-w-6xl mx-auto flex flex-col items-center justify-center text-center z-10 pt-6 pb-2">
          {/* Islamic Star/Arch Decorative Icon Container */}
          <div className="relative mb-6">
            <div className="absolute -inset-4 border-2 border-teal-400/20 rounded-full blur-[1px]"></div>
            <div className="absolute -inset-2 border border-teal-400/40 rounded-full rotate-45 transform"></div>
            <div className="absolute -inset-2 border border-teal-400/40 rounded-full -rotate-45 transform"></div>
            <div className="relative bg-[#144b6d] w-24 h-24 rounded-full flex items-center justify-center border-2 border-teal-400 shadow-[0_0_20px_rgba(45,212,191,0.3)] z-10">
              <BookOpen size={44} className="text-teal-400 drop-shadow-md" />
            </div>
          </div>

          {/* Main Title with decorative flanking lines */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="hidden md:block h-px w-16 md:w-32 bg-gradient-to-l from-teal-400/0 to-teal-400/70"></div>
            <h1 className="text-5xl md:text-7xl font-extrabold font-amiri tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-teal-200 via-teal-400 to-teal-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] pb-2 relative px-4">
              القرآن الكريم
            </h1>
            <div className="hidden md:block h-px w-16 md:w-32 bg-gradient-to-r from-teal-400/0 to-teal-400/70"></div>
          </div>

          <div className="inline-block relative">
            <span className="absolute -right-8 -top-6 text-6xl text-teal-400/20 select-none font-amiri">﴿</span>
            <span className="absolute -left-8 -bottom-8 text-6xl text-teal-400/20 select-none font-amiri">﴾</span>
            <p className="text-sky-100/90 text-xl md:text-2xl font-bold max-w-2xl leading-relaxed px-4 text-center font-amiri tracking-wide relative z-10 mb-10 mt-2">
              كِتَابٌ أَنْزَلْنَاهُ إِلَيْكَ مُبَارَكٌ لِيَدَّبَّرُوا آيَاتِهِ وَلِيَتَذَكَّرَ أُولُو الْأَلْبَابِ
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative -mt-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 bg-white/10 backdrop-blur-md p-2 rounded-2xl shadow-lg border border-white/20 w-full max-w-2xl mx-auto mb-8">
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex-1 min-w-[120px] transition-all duration-200 rounded-xl outline-none select-none ${isActive ? 'scale-[1.02]' : 'hover:bg-white/5'}`
              }
            >
              {({ isActive }) => (
                <div
                  className={`w-full flex items-center justify-center py-3 px-4 rounded-xl font-bold text-base transition-colors duration-200 ${isActive
                    ? "bg-teal-500 text-white shadow-md relative overflow-hidden"
                    : "text-sky-100 hover:text-teal-300"
                    }`}
                >
                  {/* Subtle shine effect on active tab */}
                  {isActive && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-150%] animate-[shine_2s_ease-in-out_infinite]"></div>}
                  {link.icon}
                  <span className="relative z-10">{link.label}</span>
                </div>
              )}
            </NavLink>
          ))}
        </div>

        {/* Content Outlet */}
        <div className="w-full pb-16 min-h-[50vh]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Quran;
