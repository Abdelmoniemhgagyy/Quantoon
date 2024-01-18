import React from 'react'
import Card from "./Card"
import namesOfSheikes from "../../data/leactureVideo/videoData.js"

function Sheikhs() {

  return (
    <div>
        <div className='mr-[60px] mt-[40px] flex flex-wrap justify-center gap-[40px]'>
            <Card  
                SrcImg="https://pbs.twimg.com/media/FveL68HXwAUV3Yc.jpg" 
                name="سمير مصطفي"
                data={namesOfSheikes.sameerMostfa}/>
                
            <Card 
                SrcImg="https://i1.sndcdn.com/artworks-2OihbfmCHJ2YqVhl-nuF70g-t500x500.jpg" 
                name="سعيد الكملي"
                data={namesOfSheikes.saeedElkamly}/>
            <Card 
                SrcImg="https://i.ytimg.com/vi/xxesTJixwOM/maxresdefault.jpg" 
                name="أحمد عبدالمنعم"
                data={namesOfSheikes.ahmedAbdelmoniem}/>
            <Card 
                SrcImg="https://i1.sndcdn.com/artworks-000318203850-wvduss-t500x500.jpg"
                name="أبو إسحاق الحويني"
                data={namesOfSheikes.aboEshak}/>
            <Card 
                SrcImg="https://1.bp.blogspot.com/-hEp5l8EuxTU/YQlHtsBBrEI/AAAAAAACNwc/KtslO1Yc44gNavEkC6dRCWsemL0fyigrwCLcBGAsYHQ/s450/%25D8%25A7%25D8%25AD%25D8%25A7%25D8%25AF%25D9%258A%25D8%25AB-%25D8%25A7%25D9%2584%25D8%25B4%25D9%258A%25D8%25AE-%25D8%25A7%25D9%2584%25D8%25B4%25D8%25B9%25D8%25B1%25D8%25A7%25D9%2588%25D9%258A.jpg"
                name="محمد متولي الشعراوي"
                data={namesOfSheikes.mohmedSharaye}/>
            <Card 
                SrcImg="https://liveislam.info/wp-content/uploads/2021/01/dr-eyad.jpg"
                name="إياد قنيبي"
                data={namesOfSheikes.eyadElqenaby}/>
            <Card 
                SrcImg="https://static1.tgstat.ru/channels/_0/b0/b0f8e905b97170e08db29b92ef162e1a.jpg" 
                name="أيمن عبدالرحيم"
                data={namesOfSheikes.aymanAbdelrheem}/>
            <Card 
                SrcImg="https://i1.sndcdn.com/artworks-Paw2swpARCFTPRZA-hx4UqQ-t500x500.jpg" 
                name="محمد خيري"
                data={namesOfSheikes.mohamedKhirey}/>
            <Card 
                SrcImg="https://i1.sndcdn.com/artworks-rnJqKTXouOsb3va3-1C8G5A-t500x500.jpg" 
                name="أحمد السيد"
                data={namesOfSheikes.ahmedSayed}/>
            <Card 
                SrcImg="https://mustansiriyah.net/wp-content/uploads/2019/10/40893814_472113786619791_5876197533662838784_n.jpg" 
                name="عثمان الخميس"
                data={namesOfSheikes.osmanElhames}/>
            <Card 
                SrcImg="https://pbs.twimg.com/media/FhwqYJGXoAAPT1C.png" 
                name="خالد الراشد"
                data={namesOfSheikes.khaledElrashed}/>
            <Card 
                SrcImg="https://pbs.twimg.com/media/E3J_SceXIAM0H8r.jpg" 
                name="عبدالعزيز الطريفي"
                data={namesOfSheikes.abdelazezEltrafy}/>
            <Card 
                SrcImg="https://images.gr-assets.com/authors/1514098245p8/3353597.jpg" 
                name="أيمن السويد"
                data={namesOfSheikes.aymanElsweed}/>
            <Card 
                SrcImg="https://palsawa.com/uploads/images/2022/11/USUMd.jpg" 
                name="ذاكر نايك"
                data={namesOfSheikes.zakerNike}/>
            <Card 
                SrcImg="https://i.ytimg.com/vi/0AtKYp8SB7s/hqdefault.jpg" 
                name="علي القرني"
                data={namesOfSheikes.aliElqurny}/>
            {/* <Card 
                SrcImg="" 
                name=""
                data={namesOfSheikes.}/> */}

        </div>
    </div>
  )
}

export default Sheikhs

