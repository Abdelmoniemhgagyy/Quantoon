import React from 'react'
import Card from "./Card"
import {data} from "../../data/muslimBoy"
import {motion} from "framer-motion"

function MuslimBoy() {
     window.scroll({top:0})
  return (
    <motion.div
      initial={{opacity:.5,scale:.5}}
      animate={{opacity:1,scale:1}}
      transition={{duration:.8}}>
        <div
         className='mr-[60px] mt-[40px] flex flex-wrap justify-center gap-[40px]'>
         {data.map((boy)=>{
             return(
                 <Card key={boy.id}  
                       name={boy.name}
                       ImgSrc={boy.ImgSrc}
                       data={boy.arrayVideo}/>
             )
         })}
            {/* <Card 
                SrcImg="" 
                name=""
                data={namesOfSheikes.}/> */}

        </div>
    </motion.div>
  )
}

export default MuslimBoy
