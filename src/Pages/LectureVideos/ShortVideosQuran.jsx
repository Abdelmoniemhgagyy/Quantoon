import React, { useEffect, useState } from 'react'
// import shortVideosQuran from "../../data/shortVideosQuran.json"
import logo from "../../assest/logo.jpg";
import { Player } from "video-react";
import Loading from '../../components/Loading/Loading.jsx'

function ShortVideosQuran() {

    const [isLoading,setIsLoading]= useState(true)
    const [shortVideosQuran,setShortVideosQuran] = useState([])
    const fetchData = ()=>{
        const data = require('../../data/shortVideosQuran.json')
        setShortVideosQuran(data)
        setIsLoading(false)
    }
    useEffect(fetchData,[])

  return (
    <>
    {isLoading ?<Loading mT="20"/>
    :
    <div className="flex justify-center flex-col items-center gap-[40px] mr-[60px]  ">
    {shortVideosQuran.map((video,i) => {
      return (
        <div
          className="custom-width relative  border border-white rounded-lg p-1 md:p-2 pt-3 lg:mt-5  sm:bg-transparent ]"
          key={i}
        >
          {/* download video  */}
          <a
            href={video}
            target="_blank"
            className="absolute left-1 top-1 pt-1  pl-2 rounded-lg cursor-pointer"
            rel="noreferrer"
          >
            <i class="bi bi-download text-white text-lg block transform hover:scale-105"></i>
          </a>
          {/* End download video  */}
          {/* name sheah  */}
          <div className="flex gap-[10px] items-center mb-3 md:mb-5 ">
            <img
              src={logo}
              alt="logo"
              className="rounded-full w-[40px] h-[40px]  "
            />
            <h1 className="text-center  text-white">قانتون</h1>
          </div>
          {/* end name sheah  */}

          {/* video player*/}
          <Player
            playsInline
            src={video}
          //   poster={video.poster === "" ? logo : video.poster}
            fluid={false}
            preload={"none"}

          />
          
          {/* end video Title And video player */}
        </div>
      );
    })}
    </div>
    }

    </>
  )
}

export default ShortVideosQuran