import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import GloableContext from "../../store/GloableContext"
function Itemcard({ Ele }) {
  const navigate = useNavigate();
  const { setAudioCategory } = useContext(GloableContext)
  const handleAudioCategory = () => {
    localStorage.setItem("audioCategory", JSON.stringify(Ele.lectures));
    setAudioCategory(JSON.parse(localStorage.getItem("audioCategory")));
    navigate(`/audio/${encodeURIComponent(Ele.seriesTitle)}`);
  };
  useEffect(() => {

  }, [setAudioCategory])
  return (
    <>
      <div
        className="pt-[20px] pb-4 shadow-lg flex flex-col bg-white dark:bg-[#0f0f1975] rounded-3xl w-[80%] md:w-[270px] h-auto cursor-pointer transition duration-500 transform hover:scale-105 hover:shadow-2xl border border-slate-100 dark:border-transparent backdrop-blur-sm"
        onClick={handleAudioCategory}
      >
        <div className="relative mx-auto mb-4 group">
          <img
            alt='>>'
            className="w-32 h-32 rounded-full object-cover border-4 border-teal-500 dark:border-blue-500 shadow-xl transition-transform duration-500 group-hover:rotate-6"
            src="https://images.unsplash.com/photo-1689125220678-7a8393658449"
          />
          <div className="absolute inset-0 rounded-full bg-teal-500/10 dark:bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <h3 className="font-bold pb-2 px-4 text-slate-800 dark:text-white mt-2 text-center text-sm sm:text-base line-clamp-2 leading-relaxed">
          {Ele.seriesTitle}
        </h3>
      </div>
    </>
  );
}

export default Itemcard;
