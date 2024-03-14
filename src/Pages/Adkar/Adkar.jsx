import React from 'react'
import { useState } from 'react';
import data from "../../data/adkar.json"
import "./adkar.css"
import {motion} from "framer-motion"
import CopyIcons from "../../components/CopyIcons/CopyIcons"


function Adkar() {
    const [dataa,setDataa] = useState(data['أذكار الصباح'])
    window.scroll({top:0})

  return (
    <motion.div 
      initial={{opacity:0,y:"100vh"}}
      animate={{opacity:1,y:0}}
      transition={{duration:1}}
      exit={{y:"-100vh"}}
      className='adkar-container'> 
      <div className='m-2 btn '>
        <h1 className='text-[30px] text-[white] title-adkar '>{dataa[0].category}</h1>
      </div>
      <div className='btn-conntainer'>
        <button onClick={()=>setDataa(data["أذكار الصباح"])} 
        //className to add class active to btn 
        className={`${dataa===data["أذكار الصباح"]?`active-btn`:""}`}>أذكار الصباح</button>
        <button onClick={()=>setDataa(data["أذكار المساء"])} 
        className={`${dataa===data["أذكار المساء"]?`active-btn`:""}`}>أذكار المساء</button>
        <button onClick={()=>setDataa(data["أذكار بعد السلام من الصلاة المفروضة"])}
         className={`${dataa===data["أذكار بعد السلام من الصلاة المفروضة"]?`active-btn`:""}`}>أذكار بعد السلام من الصلاة</button>
        <button onClick={()=>setDataa(data["تسابيح"])} 
        className={`${dataa===data["تسابيح"]?`active-btn`:""}`}>تسابيح</button>
        <button onClick={()=>setDataa(data["أذكار النوم"])} 
        className={`${dataa===data["أذكار النوم"]?`active-btn`:""}`}>أذكار النوم</button>
        <button onClick={()=>setDataa(data["أذكار الاستيقاظ"])} 
        className={`${dataa===data["أذكار الاستيقاظ"]?`active-btn`:""}`}>أذكار الأستيقاظ</button>
        <button onClick={()=>setDataa(data["أدعية قرآنية"])} 
        className={`${dataa===data["أدعية قرآنية"]?`active-btn`:""}`}>أدعية قرآنية</button>
        <button onClick={()=>setDataa(data["أدعية الأنبياء"])} 
        className={`${dataa===data["أدعية الأنبياء"]?`active-btn`:""}`}>أدعية الأنبياء</button>
      </div>
      {dataa.map((item,index)=>
        <div key={index} className='dakr relative' >
            
            <p className='pl-[5px]'>{item.content}</p>

            <div>
            <p> عدد المرات : {item.count} </p>
             <p >{item.description}</p>

            </div> 
                    <CopyIcons copiedText={item.content}/>
             
        </div>
      )}
</motion.div>

  )
}

export default Adkar