import React, { useState } from 'react'
import Counter from "./Counter"
import  dataRosary from "../../data/Rosary/Rosary"

function Rosary() {
   
 
  return (
    <div className=' flex justify-around items-center flex-wrap ' 
    style={{margin:"20px 20px 0px 0px",minHeight:"100vh"}}>

{dataRosary.map((item) =>  (
    <div key={item.id}>
         <Counter  daker={item.daker} img={item.img}/>
    </div>
)
)}
    </div>
  )
}

export default Rosary