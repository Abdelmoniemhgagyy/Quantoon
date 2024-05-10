import React from "react";
import Itemcard from "../../components/Audio/Itemcard"
import {podcast} from "../../data/Audio/aduio"

function Podcasts() {
return (
    <div
      className=' mt-[40px] flex flex-wrap justify-center gap-[40px] lg:mt-[180px]'>
        {podcast.map((item)=>(
            <Itemcard  ket={item.id} Ele={item}/>
        ))}
    </div>
)
}

export default Podcasts