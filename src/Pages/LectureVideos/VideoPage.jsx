import React, { useEffect, useState } from "react";
import "/node_modules/video-react/dist/video-react.css";
import { Outlet, useNavigate } from "react-router-dom";
function VideoPage() {
  const navigate = useNavigate();
  // state for active btn
  const [state, setState] = useState("");

  const handelNavigate = (path) => {
    navigate(path);
    setState(path);
  };

  return (
    <div className="transition duration-300 mt-[40px]">
      {/* Navbar */}
      <div  className="my-[20px]  mr-[60px]  flex justify-center items-center flex-wrap  sm:mr-auto">
        <button
          onClick={() => handelNavigate("")}
          className={`${state === "" ? `active-btn btn-nav` : "btn-nav"}`}
        >
          الفيديوهات
        </button>
        <button
          onClick={() => handelNavigate("sheihks")}
          className={`${state === "sheihks" ? `active-btn btn-nav` : "btn-nav"}`}
        >
          الشيوخ
        </button>
        <button
          onClick={() => handelNavigate("short-video-quran")}
          className={`${state === "short-video-quran" ? `active-btn btn-nav` : "btn-nav"}`}
        >
          مقاطع قران قصيرة
        </button>
      </div>
      {/* End Navbar */}
      <Outlet />
    </div>
  );
}

export default VideoPage;
