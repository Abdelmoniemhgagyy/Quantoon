import React from 'react'
import Card from "./Card"
import {data} from "../../data/muslimBoy"

function MuslimBoy() {

  return (
    <div>
        <div className='mr-[60px] mt-[40px] flex flex-wrap justify-center gap-[40px]'>
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
    </div>
  )
}

export default MuslimBoy
