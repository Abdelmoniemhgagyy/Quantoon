import React from 'react'
import Itemcard from "../../components/Audio/Itemcard"
import {categories} from "../../data/Audio/aduio"
function MainAudio() {

  return (
    <div
      className=' mt-[40px] flex flex-wrap justify-center gap-[40px] lg:mt-[180px]'>
       {/* <Link
        to="books"
        className="border-white flex flex-col border-[2px]  shadow-sm rounded-xl w-[80%] md:w-[250px] md:h-[250px] bg-[#2b4f85] cursor-pointer transition duration-300 transform hover:scale-105"
      >
        <img
          className="w-full h-[80%]  rounded-t-[8px] border-b-white border-b-[2px]"
          src={booksImg}
          alt="sheikhsphoto"
        />
        <h3 className="text-xl font-[900] pb-1 text-white mt-2 text-center dark:text-white md:w-full whitespace-nowrap">
          كتب صوتيه
        </h3>
      </Link> */}
      {categories.map((item)=>(
        <Itemcard  ket={item.id} Ele={item}/>

      ))}
    </div>
  )
}

export default MainAudio