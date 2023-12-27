import React, { useState } from 'react'
import Counter from "./Counter"
import  dataRosary from "../../data/Rosary/Rosary"

function Rosary() {
   
 
  return (
    <div className=' d-flex justify-content-around align-items-center flex-wrap gap-1 ' 
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