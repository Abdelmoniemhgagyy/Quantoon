import React from "react";
function CardAduio({item}) {
  return (
    <div className="p-4 py-2 text-center border border-[10px] border-t-[#8a63ff] border-l-[#8a63ff]  border-r-[#fff] border-b-[#fff] md:border-[15px] rounded-[30px] text-white">
      <h2 className="font-bold mb-3">{""}</h2>
      <p className="mb-4 text-lg">
        <span className="font-[400] leading-relaxed">الكاتب : </span>
        <span className="text-[#c5c5c5]"> {item.author}</span>
      </p>

      <div className="w-[220px] mx-auto ">
        <img
          src={item.img}
          alt=""
          className="w-full h-[240px] rounded-[17%]"
        />
      </div>

      <p className="my-3 text-lg">
        <span className=""> {item.name_book} </span>
      </p>
      <div className="flex justify-center">
        <audio
          src={item.url_audio}
          controls
          className="mb-2"
        />
      </div>
    </div>
  );
}

export default CardAduio;
