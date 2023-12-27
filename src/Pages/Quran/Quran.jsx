import React, { createRef } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import {Link} from "react-router-dom"
import "./quran.css"
function Quran() {
  const juzs = [
    { name: "الجزء الأول", page: 1, number: 1 },
    { name: "الجزء الثاني", page: 2, number: 2 },
    { name: "الجزء الثالث", page: 3, number: 3 },
    { name: "الأول الرابع", page: 4, number: 4 },
    { name: "الجزء الخامس", page: 5, number: 5 },
    { name: "الجزء السادس", page: 6, number: 6 },
    { name: "الجزء السابع", page: 7, number: 7 },
    { name: "الجزء الثامن", page: 8, number: 8 },
    { name: "الجزء التاسع", page: 9, number: 9 },
    { name: "الجزء العاشر", page: 10, number: 10 },
    { name: "الجزء الحادي عشر", page: 11, number: 11 },
    { name: "الجزء الثاني عشر", page: 12, number: 12 },
    { name: "الجزء الثالث عشر", page: 13, number: 13 },
    { name: "الجزء الرابع عشر", page: 14, number: 14 },
    { name: "الجزء الخامس عشر", page: 15, number: 15 },
    { name: "الجزء السادس عشر", page: 16, number: 16 },
    { name: "الجزء السابع عشر", page: 17, number: 17 },
    { name: "الجزء الثامن عشر", page: 18, number: 18 },
    { name: "الجزء التاسع عشر", page: 19, number: 19 },
    { name: "الجزء العشرون", page: 20, number: 20 },
    { name: "الجزء الحادي و العشرون", page: 21, number: 21 },
    { name: "الجزء الثاني و العشرون", page: 22, number: 22 },
    { name: "الجزء الثالث و العشرون", page: 23, number: 23 },
    { name: "الجزء الرابع و العشرون", page: 24, number: 24 },
    { name: "الجزء الخامس و العشرون", page: 25, number: 25 },
    { name: "الجزء السادس و العشرون", page: 26, number: 26 },
    { name: "الجزء السابع و العشرون", page: 27, number: 27 },
    { name: "الجزء الثامن و العشرون", page: 28, number: 28 },
    { name: "الجزء التاسع و العشرون", page: 29, number: 29 },
    { name: "الجزء الثلاثون", page: 30, number: 30 },
  ];

  const [typeShow,setTypeShow]=useState(localStorage.getItem("showType")||"sura")


  const [data, setData] = useState([]);
  const handelNameSura = async () => {
    const d = await axios.get("http://api.alquran.cloud/v1/meta");
    if(typeShow==="sura"){
      setData(d.data.data.surahs.references);
    }
    else{
      setData(juzs)
    }
    
  };

  useEffect(() => {
    handelNameSura();   
  }, [typeShow]);
console.log(typeShow)
  return (
    <div>
      <a className="back q">
        <i className="fa-solid fa-arrow-left"></i>
      </a>
      <div className="header">
        <h1>القران الكريم</h1>
        <div className='btn-conntainer'>
          <button onClick={()=>
            {  
              localStorage.setItem("showType","sura")
              setTypeShow(localStorage.getItem("showType"))
            }
            
            }>السور</button>
          <button onClick={()=>  {  
              localStorage.setItem("showType","juza")
              setTypeShow(localStorage.getItem("showType"))
            }}>الأجزاء</button>
        </div>
      </div>
      <div className="container">
        {data.map((item) => (
          <div className="box" >
           <Link to={`${typeShow}/${item.number}`} >{item.name}</Link> 
          {typeShow === "sura" ? <p>{item.englishName}</p>:" "}
          </div>
        ))}
      </div>

      {/* <!-- ------------------background sura-------------------- --> */}
      <div className="sura">
      
       
      </div>
    </div>
  );
}

export default Quran;
