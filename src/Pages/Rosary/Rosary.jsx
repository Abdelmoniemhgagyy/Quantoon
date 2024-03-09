import React from 'react'
import Counter from "./Counter"
import  dataRosary from "../../data/Rosary/Rosary"
import {motion} from "framer-motion"
function Rosary() {
  window.scroll({top:0})
  return (
    <div className=' flex justify-around items-center flex-wrap ' 
    style={{margin:"20px 20px 0px 0px",minHeight:"100vh"}}>
        {dataRosary.map((item) =>  (
            <motion.div 
              initial={{x:100}}
              animate={{x:0}}
              transition={{duration:1}}
            key={item.id}>
                <Counter  daker={item.daker} img={item.img}/>
            </motion.div>
        )
        )}
    </div>
  )
}

export default Rosary