import logo from "../../assest/logo.jpg";
import {mainVideos} from "../../data/leactureVideo/videoData.js";
import "/node_modules/video-react/dist/video-react.css";
import { Player } from "video-react";
import "./video.css";

function MainVideos() {
  return (
    <>
      {/* viedoes */}
        <div className="flex justify-center flex-col items-center gap-[40px] mr-[60px]  ">
          {mainVideos.map((video) => {
            return (
              <div
                className="custom-width relative  border border-white rounded-lg p-1 md:p-2 pt-3 lg:mt-5  sm:bg-transparent ]"
                key={video.id}
              >
                {/* download video  */}
                <a
                  href={video.url}
                  target="_blank"
                  className="absolute left-1 top-1 pt-1  pl-2 rounded-lg cursor-pointer"
                  rel="noreferrer"
                >
                  <i class="bi bi-download text-white text-lg block transform hover:scale-105"></i>
                </a>
                {/* End download video  */}
                {/* name sheah  */}
                <div className="flex gap-[10px] items-center mb-3 md:mb-5 ">
                  <img
                    src={logo}
                    alt="logo"
                    className="rounded-full w-[40px] h-[40px]  "
                  />
                  <h1 className="text-center  text-white">قانتون</h1>
                </div>
                {/* end name sheah  */}

                {/* video Title  And video player*/}
                <h1 className="pb-3 text-md md:text-lg text-white pr-[7px]">
                  {video.title}
                </h1>
                <Player
                  playsInline
                  src={video.url}
                  poster={video.poster === "" ? logo : video.poster}
                  fluid={false}
                  preload={"none"}

                />
                
                {/* end video Title And video player */}
              </div>
            );
          })}
        </div>
      {/*End viedoes */}
    </>
  );
}

export default MainVideos;
