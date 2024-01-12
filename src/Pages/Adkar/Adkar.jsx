import React from 'react'
import { useState } from 'react';
import data from "../../data/adkar.json"
import "./adkar.css"
function Adkar() {
    const [dataa,setDataa] = useState(data['أذكار الصباح'])

   
  return (
    <div className='adkar-container'>


       
      <div className='m-2 btn '>
        <h1 className='text-[30px] text-[white] title-adkar '>{dataa[0].category}</h1>
      </div>
      <div className='btn-conntainer'>
        <button onClick={()=>setDataa(data["أذكار الصباح"])}>أذكار الصباح</button>
        <button onClick={()=>setDataa(data["أذكار المساء"])}>أذكار المساء</button>
        <button onClick={()=>setDataa(data["أذكار بعد السلام من الصلاة المفروضة"])}>أذكار بعد السلام من الصلاة</button>
        <button onClick={()=>setDataa(data["تسابيح"])}>تسابيح</button>
        <button onClick={()=>setDataa(data["أذكار النوم"])}>أذكار النوم</button>
        <button onClick={()=>setDataa(data["أذكار الاستيقاظ"])}>أذكار الأستيقاظ</button>
        <button onClick={()=>setDataa(data["أدعية قرآنية"])}>أدعية قرآنية</button>
        <button onClick={()=>setDataa(data["أدعية الأنبياء"])}>أدعية الأنبياء</button>
      </div>
      {dataa.map((item,index)=>
        <div key={index} className='dakr'>
            
            <p>{item.content}</p>

            <div>
            <p> عدد المرات : {item.count} </p>
             <p >{item.description}</p>
            </div> 
        </div>
      )}
    </div>
  )
}

export default Adkar