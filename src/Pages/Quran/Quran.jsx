import React from "react";
import {Link, Outlet} from "react-router-dom"
import "./quran.css"
import {motion} from "framer-motion"

function Quran() {

  return (
    <>
      <motion.div 
        initial={{y:"60vh"}}
        animate={{y:0}}
        transition={{duration:.8}}
        exit={{x:"-100vw"}}>
      <div className="header ">
        <h1 className="mr-[60px]">القران الكريم</h1>
        <div className='btn-conntainer mr-[50px] sm:mr-[0]'>
          <button><Link to="/quran">السور</Link></button>
          <button><Link to="juza">الأجزاء</Link></button>
          <button><Link to="audio">القران صوتي</Link></button>
        </div>
      </div>
      <Outlet/>
    </motion.div>

    </>
  );
}

export default Quran;
