import React from 'react'
import {dataOfAllSheikhs} from "../../data/leactureVideo/videoData.js"
import Card from "./Card"
import {motion} from "framer-motion"


function Sheihks() {
  return (
    <motion.div
      initial={{scale:.5}}
      animate={{scale:1}}
      transition={{duration:1}}
      className='mr-[60px] mt-[20px] flex flex-wrap justify-center gap-[40px]'>
            {dataOfAllSheikhs.map((sheikhs)=>{
                return(
                    <Card key={sheikhs.id}  
                          name={sheikhs.name}
                          ImgSrc={sheikhs.ImgSrc}
                          data={sheikhs.arrayVideo}/>
                )
            })}
                {/* <Card 
                    SrcImg="" 
                    name=""
                    data={namesOfSheikes.}/> */}

             </motion.div>
  )
}

export default Sheihks