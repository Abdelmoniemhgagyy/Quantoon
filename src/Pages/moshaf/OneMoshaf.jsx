import React, { useEffect } from 'react'
import  { useState } from "react" 

function OneMoshaf({Src,typeImg,name,fahrs}) {

  const [numberOfPage, setNumberOfPage] = useState(1);
  const [openModel,setOpenModel] = useState(false)
  
  const numberOfzerosUrl = 
   numberOfPage < 10 ? `000`
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
useEffect(()=>{
   window.scroll({
    top:0,
   })
},[openModel])
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
      
        <i class="bi bi-arrow-left-circle  sm:text-3xl text-xl cursor-pointer"  onClick={nextPage}></i>
      </div>
      <p className='md:text-xl text-white text-center md:mr-8'>{name}</p>

    </div>


 {/* model  */}
    {openModel&&<div className='absolute top-0 left-0 min-w-full min-h-full bg-[#000] z-[99999999]' onClick={()=>setOpenModel(false)}>
       
    <div className='hidden md:block text-center pt-[5px]'>
     <input type="number" min={1} placeholder='رقم الصفحة' className=' text-center border border-blue-400 p-2 w-[60%] md:w-auto rounded-lg  outline-none'
          value={numberOfPage}
          onChange={changeInputValue}
          onClick={(e)=>e.stopPropagation()} />
     </div>

          <div className='relative  flex gap-[2px] md:gap-[1px] items-center 
          md:justify-center justify-end text-white pb-[3px]'
          >
            <i className="hidden md:block text-white  bi bi-arrow-right-square-fill text-4xl cursor-pointer"
             onClick={(e)=>{
              e.stopPropagation();
              prevPage()}}
            
            ></i>
             <img className='w-[100%] h-[83vh] md:h-[600px] md:w-[60%] xl:w-[40%] md:h-[600px] rounded-[2px]'
             src={`${Src}${numberOfzerosUrl}${numberOfPage}${typeImg}`} alt="moshaf"
              onClick={(e)=>e.stopPropagation()} />
          
          <i 
              onClick={(e)=>{
                e.stopPropagation();
                nextPage()}}
             className="hidden md:block text-white bi bi-arrow-left-square-fill text-4xl cursor-pointer"></i>
           
          </div>

           <div className='flex md:hidden justify-center gap-[14px] my-2'>
           <button 
             onClick={(e)=>{
                e.stopPropagation();
                prevPage()}}
            className='p-2 rounded-lg bg-blue-900 text-white'>الصفحة السابقة
            </button>

            <button
             onClick={(e)=>{
              e.stopPropagation();
               nextPage()}}
            className='p-2 rounded-lg bg-blue-900 text-white'>الصفحة التالية
            </button>
          
         
          </div>
          {/* <i 
             onClick={()=>setOpenModel(!openModel)}
             className="bi bi-x-circle text-2xl md:text-3xl text-[white] hover:text-red-500 
             absolute top-[-35px] left-[0x] md:left-[49%] md:top-[-50px] text-2xl cursor-pointer"
             ></i>
           */}
             
     <div className='md:hidden text-center pb-[40px]'>
     <input type="number" min={1} placeholder='رقم الصفحة' className=' text-center border border-blue-400 p-2 w-[60%] md:w-auto rounded-lg  outline-none'
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