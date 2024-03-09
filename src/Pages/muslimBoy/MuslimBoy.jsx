import React from 'react'
import Card from "./Card"
import {data} from "../../data/muslimBoy"
import {motion} from "framer-motion"

function MuslimBoy() {

  return (
    <motion.div
    initial={{y:30}}
    animate={{y:0}}
    transition={{duration:1,type:"spring",damping:3}}>
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
