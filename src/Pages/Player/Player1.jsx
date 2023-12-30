import React, { useEffect,useState } from 'react'
import AudioPlayer from 'react-h5-audio-player';
import axios from 'axios';
import 'react-h5-audio-player/lib/styles.css';
import "./styles.css"
function Player1() {


  const[loading,setLoading] = useState(true)
  const [data, setData] = useState([]);
  const [num, setNum]= useState(1);

 const url =`https://download.quranicaudio.com/qdc/abdul_baset/murattal/${num}.mp3`


  const handelAudio = async () => {
        const D = await axios.get(`https://api.alquran.cloud/v1/meta`);
        setData(D.data.data.surahs.references)
  }

  useEffect(() => {
    handelAudio();
  }, []);

  return (
    <div style={{marginTop:"500px"}}>

        <AudioPlayer
        style={{direction:"ltr"}}
          autoPlay
          src={`https://download.quranicaudio.com/qdc/abdul_baset/murattal/1.mp3`}
          onPlay={e => console.log("onPlay")}
        />


    </div>
  )
}

export default Player1