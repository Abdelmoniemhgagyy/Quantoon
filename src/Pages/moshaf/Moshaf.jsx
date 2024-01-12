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
    typeImg={`.png`}
    fahrs={622}
     />
    <OneMoshaf Src={`https://app.quranflash.com/book/Medina1/epub/EPUB/imgs/`} 
    typeImg={`.gif`}
    fahrs={622}
     />

    <OneMoshaf Src={`https://app.quranflash.com/book/Medina2/epub/EPUB/imgs/`} 
    typeImg={`.png`}
    fahrs={622}
     />
    <OneMoshaf Src={`https://app.quranflash.com/book/Shubah/epub/EPUB/imgs/`} 
    typeImg={`.png`}
    fahrs={622}
     />
    <OneMoshaf Src={`https://app.quranflash.com/book/Qaloon/epub/EPUB/imgs/`} 
    typeImg={`.png`}
    fahrs={574}
     />



    </>
  )
}

export default Moshaf