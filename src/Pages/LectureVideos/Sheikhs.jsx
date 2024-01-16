import React, { useContext } from 'react'
import Card from "./Card"
import GloableContext from '../../store/GloableContext'
import { sameerMostfa,aboEshak,ahmedAbdelmoniem,saeedElkamly,eyadElqenaby} from "../../data/leactureVideo/videoData.js"

function Sheikhs() {
    const {leactureVideoes } =useContext(GloableContext)
    console.log()
  return (
    <div>
        <div className='mr-[60px] mt-[40px] flex flex-wrap justify-center gap-[40px]'>
             
            <Card  
                SrcImg="https://pbs.twimg.com/media/FveL68HXwAUV3Yc.jpg" 
                name="الشيخ سمير مصطفي"
                data={sameerMostfa}/>
                
            <Card 
                SrcImg="https://i1.sndcdn.com/artworks-2OihbfmCHJ2YqVhl-nuF70g-t500x500.jpg" 
                name="الشيخ سعيد الكملي"
                data={saeedElkamly}/>
            <Card 
                SrcImg="https://i.ytimg.com/vi/xxesTJixwOM/maxresdefault.jpg" 
                name="الشيخ أحمد عبدالمنعم"
                data={ahmedAbdelmoniem}/>
            <Card 
                SrcImg="https://i1.sndcdn.com/artworks-000318203850-wvduss-t500x500.jpg"
                name="أبو إسحاق الحويني"
                data={aboEshak}/>
            <Card 
                SrcImg="https://liveislam.info/wp-content/uploads/2021/01/dr-eyad.jpg"
                name="إياد قنيبي"
                data={eyadElqenaby}/>
            {/* <Card 
                SrcImg="" 
                name=""/> */}

        </div>
    </div>
  )
}

export default Sheikhs