import React from "react";
import CardAudio from "../../components/Audio/CardAduio"
import GloableContext from "../../store/GloableContext"
import { useContext } from "react";

function Course() {
const {audioCategory} = useContext(GloableContext)
return (
    <div>      
        <div className="container mx-auto py-8 px-4 md:px-16 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-6">
            {audioCategory.map((item)=>(
            <CardAudio key={item.id} item ={item}/>
            )
            )}
        </div>
        </div>
  </div>
)
}

export default Course