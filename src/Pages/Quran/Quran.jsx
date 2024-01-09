import React from "react";
import {Link, Outlet} from "react-router-dom"
import "./quran.css"
function Quran() {

  return (
    <>
      <div>
      <a className="back q">
        <i className="fa-solid fa-arrow-left"></i>
      </a>
      <div className="header">
        <h1>القران الكريم</h1>

           
        <div className='btn-conntainer'>
          <button><Link to="/quran">السور</Link></button>
          <button><Link to="juza">الأجزاء</Link></button>
          <button 
          onClick={()=> 
             {  
              
            }}><Link to="audio">القران صوتي</Link>
          </button>
        </div>

      </div>
      <Outlet/>
    </div>

    </>
  );
}

export default Quran;
