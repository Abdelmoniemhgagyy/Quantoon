import React from 'react'
import Card from "./Card"
import namesOfSheikes,{dataOfAllSheikhs} from "../../data/leactureVideo/videoData.js"

function Sheikhs() {

  return (
    <div>
        <div className='mr-[60px] mt-[40px] flex flex-wrap justify-center gap-[40px]'>
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
    </div>
  )
}

export default Sheikhs

