import React, { useEffect } from 'react'
import  { useState } from "react" 

function Moshaf() {
    const [numberOfPage, setNumberOfPage] = useState(1);

    // zero in url 0 or 00 or 000 
    const numberOfzerosUrl = numberOfPage < 10 ? `000`
    :numberOfPage <100 ? `00` 
    :`0`
   

    const changeInputValue = (e) => {
      setNumberOfPage(e.target.value);
    };
    // This useEffect is triggered whenever numberOfPage changes
    useEffect(() => {
    }, [numberOfPage]);
  
// arrow icons functions 
const prevPage =()=>{
  if(numberOfPage > 1 ){
       setNumberOfPage(+numberOfPage - 1)
      }
      else{
        setNumberOfPage(625)
      }
}

const nextPage = ()=>{
  if(numberOfPage <625 ){
    setNumberOfPage(+numberOfPage + 1)
  }
  else{
    setNumberOfPage(1)
  }
}
// End arrow icons functions 


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
    <div  className='mt-[15px] mr-[60px] min-h-screen flex items-center justify-center flex-col'>
      <div className='my-4 md:my-2 '>
        <input type="number" min={1} placeholder='رقم الصفحة' className='p-2 rounded-lg border-none outline-none '
        value={numberOfPage}
        onChange={changeInputValue} />

         <button className='mr-2 p-2 bg-blue-800 rounded-lg text-white' onClick={()=>setNumberOfPage(622)}>الفهرس</button>
 
     </div>

      <div className='md:h-[600px] md:w-[400px] flex gap-[3px] md:gap-[8px] items-center text-white'>
      <i class="bi bi-arrow-right-circle sm:text-3xl text-xl cursor-pointer"  onClick={prevPage} ></i>

        <img className='w-[80%] sm:w-[70%] md:w-full md:h-[600px] rounded-[2px]' src={`https://app.quranflash.com/book/Medina1/epub/EPUB/imgs/${numberOfzerosUrl}${numberOfPage}.gif`} alt="" />
      
        <i class="bi bi-arrow-left-circle sm:text-3xl text-xl cursor-pointer"  onClick={nextPage}></i>
      </div>
      
    </div>
  )
}

export default Moshaf