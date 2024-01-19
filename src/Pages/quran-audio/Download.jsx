import { useState } from "react"
import { Link } from "react-router-dom"
import data from "../../data/quran/downloadQuran"
function Download() {
    const [searchVal ,setSearchVal]=useState("")
    const dataSearch = data.filter((item)=> item.name.includes(searchVal))

  return (
<div className="min-h-screen  mr-[60px] md:mx-auto  text-white py-4  ">
      
{/* Start search  */}
   <div className=" w-[70%] text-center md:w-[500px] mx-auto">
    <input type="text" onChange={(e)=> setSearchVal(e.target.value)} placeholder="بحث"
    className="p-2 px-4 xl:mr-[6px] w-full text-center text-lg border border-[#333] outline-none rounded-full text-black" dir="rtl"/>
   </div>
{/* End Search  */}

           {/* <div className="mx-auto text-center "> 
                <h1 className="text-2xl  font-semibold">تحميل القران الكريم كامل </h1>
               </div> */}


 {/* back icon */}
 <div className="fixed left-4 md:left-7 top-5 text-3xl ">
  <Link to="/quran/audio"> 
  <i className="bi bi-arrow-left-circle  hover:text-green-300"></i>
  </Link> 
  </div>
 {/* End back icon */}


{/* show Data  */}
<div className=" pt-6 px-2 md:mr-[67px] grid grid-cols-1 sm:grid-cols-2 mr-[4px] md:grid-cols-3 
  lg:grid-cols-4  xl:grid-cols-4 gap-[10px]
   items-center" dir="rtl">
  { dataSearch.map((item)=>{
   return(
    <div key={item.id} className="" > 
      <Link to={item.url} 
        className="p-3  block rounded-[20px] relative 
        bg-blue-500 cursor-pointer text-right text-sm md:text-md hover:scale-[1.05]
        transition duration-100 ">
            {item.name}
            <i className="bi bi-download absolute left-4  md:left-8  hover:text-green-300"></i>
        </Link>
    </div>
   )
             
            } 
            )}</div>

{/* End show Data  */}


</div>
  )
}

export default Download