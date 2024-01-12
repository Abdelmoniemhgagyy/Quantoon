import React, { useEffect } from 'react'
import  { useState } from "react" 

function OneMoshaf({Src,typeImg,name,fahrs}) {

  const [numberOfPage, setNumberOfPage] = useState(1);
  const [openModel,setOpenModel] = useState(false)
  
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
useEffect(()=>{
   window.scroll({
    top:0,
    behavior:'smooth'
   })
},[openModel])
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
         src={`${Src}${numberOfzerosUrl}${numberOfPage}${typeImg}`} alt="moshaf" 
         onClick={()=>setOpenModel(!openModel)}/>
      
        <i class="bi bi-arrow-left-circle sm:text-3xl text-xl cursor-pointer"  onClick={nextPage}></i>
      </div>
      <p className='md:text-xl text-white text-center md:mr-8'>{name}</p>

    </div>

 {/* model  */}
    {openModel&&<div className='absolute top-0 left-0 min-w-full min-h-full bg-[#777] z-[99999999]' onClick={()=>setOpenModel(false)}>
       
       
          <div className='relative mt-[140px] mt-[100px] flex gap-[2px] md:gap-[10px] items-center 
          justify-center text-white pb-[3px]'
          >

             <i onClick={()=>setOpenModel(!openModel)}
             class="bi bi-x-circle text-2xl md:text-3xl text-[white] hover:text-red-500 
             absolute top-[-35px] left-[0x] md:left-[49%] md:top-[-50px] cursor-pointer"></i>

             

             <i class="bi bi-arrow-right-circle sm:text-3xl text-xl cursor-pointer"   
                onClick={(e)=>{
                e.stopPropagation();
                prevPage()}}></i>

             <img className='w-[80%]  md:w-[60%] xl:w-[40%] md:h-[600px] rounded-[2px]'
             src={`${Src}${numberOfzerosUrl}${numberOfPage}${typeImg}`} alt="moshaf"
              onClick={(e)=>e.stopPropagation()} />
          
            <i class="bi bi-arrow-left-circle sm:text-3xl text-xl cursor-pointer"  
             onClick={(e)=>{
              e.stopPropagation();
               nextPage()}}></i>
          </div>
     <div className='text-center pb-[40px]'>
     <input type="number" min={1} placeholder='رقم الصفحة' className=' p-2 w-[60%] md:w-auto rounded-lg border-none outline-none '
          value={numberOfPage}
          onChange={changeInputValue}
          onClick={(e)=>e.stopPropagation()} />
     </div>
        
      </div>}
 {/* End model  */}
 

    </>
  )
}

export default OneMoshaf