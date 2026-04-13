import React, { useContext } from "react";
import GloableContext from "../../store/GloableContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Card({ ImgSrc, name, data }) {
  const navigate = useNavigate();
  const { setLeactureVideoes, setNameSheihk, setLogoSheihk } = useContext(GloableContext);

  const handelData = () => {
    localStorage.setItem("leactureVideoes", JSON.stringify(data));
    localStorage.setItem("nameSheihk", name);
    localStorage.setItem("logoSheihk", ImgSrc);

    setNameSheihk(localStorage.getItem("nameSheihk"));
    setLogoSheihk(localStorage.getItem("logoSheihk"));
    setLeactureVideoes(JSON.parse(localStorage.getItem("leactureVideoes")));

    navigate("/video");
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, translateY: -10 }}
      whileTap={{ scale: 0.95 }}
      onClick={handelData}
      className="group relative w-full aspect-[4/5] sm:aspect-square cursor-pointer"
    >
      {/* Glow Effect behind card */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-[2rem] blur opacity-10 group-hover:opacity-25 transition duration-500"></div>

      <div className="relative h-full w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-[20px] overflow-hidden shadow-xl flex flex-col group-hover:bg-white/15 transition-colors duration-500">
        {/* Image Container */}
        <div className="relative h-[72%] w-full overflow-hidden">
          <img
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            src={ImgSrc}
            alt={name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>

          {/* Play Icon Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-14 h-14 bg-cyan-400/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 shadow-lg shadow-cyan-500/20">
              <i className="bi bi-play-fill text-white text-3xl"></i>
            </div>
          </div>
        </div>

        {/* Text Section */}
        <div className="h-[28%] flex items-center justify-center px-4 bg-white/5">
          <h3 className="text-base sm:text-lg font-bold text-white text-center line-clamp-2 drop-shadow-md" style={{ fontFamily: "'Marhey', sans-serif" }}>
            {name}
          </h3>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-300 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
      </div>
    </motion.div>
  );
}

export default Card;
