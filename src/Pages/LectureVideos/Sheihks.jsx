import React from 'react'
import {dataOfAllSheikhs} from "../../data/leactureVideo/videoData.js"
import Card from "./Card"

function Sheihks() {
  return (
    <div className='mr-[60px] mt-[20px] flex flex-wrap justify-center gap-[40px]'>
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

             </div>
  )
}

export default Sheihks