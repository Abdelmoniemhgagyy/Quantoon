import React from "react";
import AudioPlayer from "react-h5-audio-player";
function CardAduio({ item }) {
  return (
    <div className="relative px-1 md:p-4 py-1 text-center border border-[10px] border-t-[#8a63ff] border-l-[#8a63ff]  border-r-[#fff] border-b-[#fff] md:border-[15px] rounded-[30px] text-white">
      <h2 className="font-bold mb-3">{""}</h2>
      <p className="mb-4 text-lg pt-4 md:pt-0">
        <span className="font-[400] leading-relaxed">الكاتب : </span>
        <span className="text-[#c5c5c5]"> {item.author}</span>
      </p>

      <div className="w-[220px] mx-auto ">
        <img src={item.img} alt="" className="w-full h-[240px] rounded-[17%]" />
      </div>

      <p className="my-3 text-lg">
        <span className=""> {item.name_book} </span>
      </p>

      {/* download audio  */}
      <a
        href={item.url_audio}
        target="_blank"
        className="absolute left-1 top-1 pt-1  pl-2 rounded-lg cursor-pointer"
        rel="noreferrer"
      >
        <i className="bi bi-download text-white text-lg block transform hover:scale-105"></i>
      </a>
      {/* End download audio  */}
      <div className="flex justify-center flex-col">
        {/* <audio
          preload="metadata"
          src={item.url_audio}
          controls
          className="mb-2"
        /> */}
        <AudioPlayer
          style={{
            direction: "ltr",
            width: "100%",
            borderRadius: "15px",
            height: "85px",
          }}
          src={item.url_audio}
        />
      </div>
    </div>
  );
}

export default CardAduio;
