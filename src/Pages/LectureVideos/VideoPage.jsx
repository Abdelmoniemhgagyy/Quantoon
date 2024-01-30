import React, { useState } from 'react'
import Card from "./Card"
import MainVideos from "./MainVideos" 
import ShortVideosQuran from "./ShortVideosQuran.jsx"
import "/node_modules/video-react/dist/video-react.css";
import {dataOfAllSheikhs} from "../../data/leactureVideo/videoData.js"

function VideoPage() {
const [state,setState] = useState("videos")
  return (
    <div className='transition duration-300'>
      <div className='btn-conntainer mt-[40px] mr-[60px] sm:mr-auto'>
          <button onClick={()=>setState("videos")} className={state==="videos"?"bg-[#311ca8] ":""}>الفيديوهات</button>
          <button onClick={()=>setState("sheikhs")} className={`${state==="sheikhs"?`bg-[#311ca8] `:""}`}>الشيوخ</button>
          <button onClick={()=>setState("quran")} className={`${state==="quran"?`bg-[#311ca8] `:""}`}>مقاطع قران قصيرة</button>
      </div>

        { state ==="videos"
            ?<MainVideos/>
            :state==="quran" 
            ?<ShortVideosQuran/>
            :<div className='mr-[60px] mt-[20px] flex flex-wrap justify-center gap-[40px]'>
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
        }
              

            



    </div>
  )
}

export default VideoPage

