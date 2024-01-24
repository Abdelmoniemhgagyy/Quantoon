import React, { useContext, useEffect } from "react";
import "/node_modules/video-react/dist/video-react.css";
import { Player } from "video-react";
import "./video.css";
import GloableContext from "../../store/GloableContext";

function Videos() {
  const { leactureVideoes, logoSheuhk, nameSheihk } =
    useContext(GloableContext);
 useEffect(()=>{
    window.scrollTo(0, 0);
 },[])
  return (
    <div>
      <div className="flex justify-center flex-col items-center gap-[40px] mr-[60px] mt-5 ">
        {leactureVideoes.map((video) => {
          return (
            <div
              className="custom-width relative  border border-white rounded-lg p-1 md:p-2 pt-3 lg:mt-5  sm:bg-transparent ]"
              key={video.id}
            >
            {/* download video  */}
            <a href={video.url} target="_blank" className="absolute left-1 top-1 pt-1  pl-2 rounded-lg cursor-pointer" rel="noreferrer" >
             <i class="bi bi-download text-white text-lg block transform hover:scale-105"></i>
             
            </a>
            {/* End download video  */}
              {/* name sheah  */}
              <div className="flex gap-[10px] items-center mb-3 md:mb-5 ">
                <img
                  src={logoSheuhk}
                  alt="logo"
                  className="rounded-full w-[40px] h-[40px]  "
                />
                <h1 className="text-center  text-white">{nameSheihk}</h1>
              </div>
              {/* end name sheah  */}

              {/* video Title  And video player*/}
              <h1 className="pb-3 text-md md:text-lg text-white pr-[7px]">
                {video.title}
              </h1>
              <Player
                playsInline
                src={video.url}
                poster={video.poster}
                fluid={false}
                preload={"none"}
              />
              {console.log(video.poster)}
              {/* end video Title And video player */}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Videos;
