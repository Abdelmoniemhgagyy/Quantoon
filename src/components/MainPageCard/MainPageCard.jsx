import { useNavigate } from 'react-router-dom';

function MainPageCard({ title, url, icon, image, Icon }) {
  const navigate = useNavigate();

  return (
    <div
      className="main-page-card group relative w-full h-[140px] sm:h-[180px] bg-white/5 dark:bg-white/5 light:bg-slate-200/50 backdrop-blur-sm border border-white/10 dark:border-white/10 light:border-slate-300 rounded-3xl flex flex-col items-center justify-center text-center text-white dark:text-white light:text-slate-800 transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-slate-200 hover:border-teal-400/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-teal-400/20 active:scale-95 cursor-pointer overflow-hidden"
      onClick={() => navigate(url)}
      dir="rtl"
    >
      {/* Decorative gradient blob inside card */}
      <div className="main-page-card-glow absolute -top-10 -right-10 w-24 h-24 bg-teal-400/10 rounded-full blur-xl group-hover:bg-teal-400/20 transition-colors duration-500 z-0"></div>
      <div className="main-page-card-glow absolute -bottom-10 -left-10 w-24 h-24 bg-sky-400/10 rounded-full blur-xl group-hover:bg-sky-400/20 transition-colors duration-500 z-0"></div>

      <div className="relative z-10 flex flex-col items-center">
        {image ? (
          <div className="main-page-card-icon w-16 h-16 sm:w-20 sm:h-20 mb-3 bg-white/5 dark:bg-white/5 light:bg-white/40 rounded-full flex items-center justify-center p-3 sm:p-4 shadow-inner group-hover:scale-110 transition-transform duration-500 border border-white/5 group-hover:border-teal-400/30 backdrop-blur-sm">
            <img src={image} alt={title} className="w-full h-full object-contain drop-shadow-lg" />
          </div>
        ) : Icon ? (
          <div className="main-page-card-icon w-16 h-16 sm:w-20 sm:h-20 mb-3 bg-white/5 dark:bg-white/5 light:bg-white/40 rounded-full flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500 border border-white/5 group-hover:border-teal-400/30 backdrop-blur-sm">
            <Icon size={44} strokeWidth={1.8} />
          </div>
        ) : (
          <div className="main-page-card-icon w-16 h-16 sm:w-20 sm:h-20 mb-3 bg-white/5 dark:bg-white/5 light:bg-white/40 rounded-full flex items-center justify-center text-4xl shadow-inner group-hover:scale-110 transition-transform duration-500 border border-white/5 group-hover:border-teal-400/30 backdrop-blur-sm">
            {icon}
          </div>
        )}

        <div className="text-sm sm:text-base font-bold px-2 tracking-wide group-hover:text-teal-300 dark:group-hover:text-teal-300 light:group-hover:text-teal-600 transition-colors duration-300">
          {title}
        </div>
      </div>
    </div>
  );
}

export default MainPageCard;
