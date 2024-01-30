import React, { useState } from 'react'
import Card from "./Card"
import MainVideos from "./MainVideos" 
import "/node_modules/video-react/dist/video-react.css";
import {dataOfAllSheikhs} from "../../data/leactureVideo/videoData.js"

function VideoPage() {
const [state,setState] = useState("videos")
  return (
    <div className='transition duration-300'>
      <div className='btn-conntainer mt-[40px]'>
          <button onClick={()=>setState("videos")}>الفيديوهات</button>
          <button onClick={()=>setState("sheikhs")}>الشيوخ</button>
      </div>

        { state ==="videos"
            ?<MainVideos/>
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

