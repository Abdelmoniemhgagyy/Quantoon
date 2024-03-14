import React from "react";
import {Link, Outlet} from "react-router-dom"
import "./quran.css"
import {motion} from "framer-motion"
function Quran() {
  return (
    <>
      <div >
      <div className="header ">
        <h1 className="mr-[60px]">القران الكريم</h1>
        <div className='btn-conntainer mr-[50px] sm:mr-[0]'>
          <button><Link to="/quran">السور</Link></button>
          <button><Link to="juza">الأجزاء</Link></button>
          <button><Link to="audio">القران صوتي</Link></button>
        </div>
      </div>
      <Outlet/>
    </div>

    </>
  );
}

export default Quran;
