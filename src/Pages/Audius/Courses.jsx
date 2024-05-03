import React from "react";
import Itemcard from "../../components/Audio/Itemcard"
import {courses} from "../../data/Audio/aduio"

function Courses() {
console.log(courses)
return (
    <div
      className=' mt-[40px] flex flex-wrap justify-center gap-[40px] lg:mt-[180px]'>
        {courses.map((item)=>(
            <Itemcard  ket={item.id} Ele={item}/>

        ))}
    </div>
)
}

export default Courses



// import React from "react";
// import CardAudio from "../../components/Audio/CardAduio"
// import {courses} from "../../data/Audio/aduio"
// import { useContext } from "react";

// function Course() {
// console.log(courses)
// return (
//     <div>
//     <div className="container mx-auto py-8 px-4 md:px-16 ">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-6">
//         {courses.map((item)=>(
//            <CardAudio key={item.id} item ={item}/>
//         )
//         )}
//       </div>
//     </div>
//   </div>
// )
// }

// export default Course