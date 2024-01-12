import React, { useEffect } from 'react'
import  { useState } from "react" 

function OneMoshaf({Src,typeImg,fahrs}) {

  const [numberOfPage, setNumberOfPage] = useState(1);

  const numberOfzerosUrl = numberOfPage < 10 ? `000`
  :numberOfPage <100 ? `00` 
  :`0`

console.log(`${Src}`)


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
        setNumberOfPage(fahrs + 2)
      }
}

const nextPage = ()=>{
  if(numberOfPage < fahrs+2 ){
    setNumberOfPage(+numberOfPage + 1)
  }
  else{
    setNumberOfPage(1)
  }
}

// End arrow icons functions 
  return (
    <>
    <div  className='mt-[15px] mr-[60px] flex items-center justify-center flex-col'>
      <div className='my-4 md:my-2  md:mr-[42px] flex justify-center'>
        <input type="number" min={1} placeholder='رقم الصفحة' className='p-2 w-[60%] md:w-auto rounded-lg border-none outline-none '
        value={numberOfPage}
        onChange={changeInputValue} />

         <button className='md:mr-2 p-2 bg-blue-800 rounded-lg sm:rounded-l-lg text-white' onClick={()=>setNumberOfPage(fahrs)}>الفهرس</button>
     </div>
      <div className='md:h-[600px] sm:w-[400px] flex gap-[3px] md:gap-[8px] items-center text-white'>
      <i class="bi bi-arrow-right-circle sm:text-3xl text-xl cursor-pointer"  onClick={prevPage} ></i>

        <img className='w-[80%] sm:w-[70%] md:w-full md:h-[600px] rounded-[2px]'
         src={`${Src}${numberOfzerosUrl}${numberOfPage}${typeImg}`} alt="moshaf" />
      
        <i class="bi bi-arrow-left-circle sm:text-3xl text-xl cursor-pointer"  onClick={nextPage}></i>
      </div>
    </div>



    </>
  )
}

export default OneMoshaf