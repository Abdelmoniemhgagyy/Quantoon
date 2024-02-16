import React from "react";
import {Link} from "react-router-dom"

function JuzaContainer() {
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
  return (
    <>
           <div className="containerr mr-[60px] md:mx-auto w-[80%]">
     {/* loop Name of  sura  */}
     {juzs.map((item) => (
       <Link key={item.number} to={`${item.number}`}  className="box" >
         <div className="text-[22px]">{item.name}</div> 
       </Link>
     ))}
     {/* End loop Name of  sura  */}

   </div>

    </>
  )
}

export default JuzaContainer