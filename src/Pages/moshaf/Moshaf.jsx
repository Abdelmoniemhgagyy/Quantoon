import React, { useEffect } from 'react'
import  { useState } from "react" 
import OneMoshaf from "./OneMoshaf"
function Moshaf() {

// const handleKeyDown = (e) => {
//   console.log(e.keyCode)
//   if (e.keyCode === 39) {
//     nextPage();
//   }
//   else if (e.keyCode === 37){
//     prevPage()
//   }
// }
// useEffect(() => {
//   document.addEventListener('keydown', handleKeyDown);
// }, []);
  return (
    <>

    <OneMoshaf Src={`https://app.quranflash.com/book/Medina3/epub/EPUB/imgs/`} 
    name="المصحف الجوامعي"
    typeImg={`.png`}
    fahrs={622}
     />
    <OneMoshaf Src={`https://app.quranflash.com/book/Medina1/epub/EPUB/imgs/`} 
    name="مصحف المدينة"
    typeImg={`.gif`}
    fahrs={622}
     />

    <OneMoshaf Src={`https://app.quranflash.com/book/Medina2/epub/EPUB/imgs/`} 
    name="مصحف المدينة"
    typeImg={`.png`}
    fahrs={622}
     />

    <OneMoshaf Src={`https://app.quranflash.com/book/MedinaOld/epub/EPUB/imgs/`} 
    name="مصحف المدينة القديم"
    typeImg={`.png`}
    fahrs={622}
     />
    <OneMoshaf Src={`https://app.quranflash.com/book/Warsh1/epub/EPUB/imgs/`} 
    name="مصحف ورش"
    typeImg={`.png`}
    fahrs={574}
     />
    <OneMoshaf Src={`https://app.quranflash.com/book/Shubah/epub/EPUB/imgs/`} 
    name="رواية شعبة"
    typeImg={`.png`}
    fahrs={622}
     />
    <OneMoshaf Src={`https://app.quranflash.com/book/Douri/epub/EPUB/imgs/`} 
    name="مصحف برواية الدوري"
    typeImg={`.png`}
    fahrs={542}
     />
    <OneMoshaf Src={`https://app.quranflash.com/book/Qaloon/epub/EPUB/imgs/`} 
    name="مصحف قالون"
    typeImg={`.png`}
    fahrs={574}
     />
    <OneMoshaf Src={`https://app.quranflash.com/book/Shamarly/epub/EPUB/imgs/`} 
    name="مصحف الشمرلي"
    typeImg={`.png`}
    fahrs={522}
     />
    <OneMoshaf Src={`https://app.quranflash.com/book/NaskhTaleek/epub/EPUB/imgs/`} 
    name="مصحف خط نسخ تعليق"
    typeImg={`.png`}
    fahrs={618}
     />



    </>
  )
}

export default Moshaf