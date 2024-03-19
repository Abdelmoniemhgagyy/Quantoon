import React from "react";
import {Link, Outlet} from "react-router-dom"
import "./quran.css"
function Quran() {
  return (
    <>
      <div >
      <div className="header ">
        <h1 className="mr-[60px] ">القران الكريم</h1>
        <div className=' flex justify-center items-center text-white py-5 gap-[15px] bg-[none] mr-[50px] sm:mr-[0]'>
          <button><Link to="/quran" className="rounded-item  p-3  bg-[none] hover:bg-[#5063ae]">السور</Link></button>
          <button><Link to="juza" className="rounded-item p-3 my-4  bg-[none] hover:bg-[#5063ae] ">الأجزاء</Link></button>
          <button><Link to="audio" className="rounded-item  p-3 my-4 bg-[none] hover:bg-[#5063ae]">القران صوتي</Link></button>
        </div>
      </div>
      <Outlet/>
    </div>

    </>
  );
}

export default Quran;
