import React, { useEffect, useState,useCallback } from 'react'
import "./Hadith.css"
import  Paginations  from "../../components/Pagination/Pagination"
import  ScrollTopTop from "../../components/ScroolToTop/ScroolToTop"
import Loading  from '../../components/Loading/Loading'

import axios from 'axios'

function Hadith() {
let [data,setData]=useState([])
let [book,setBook]=useState("bukhari")
let [numberOfPage,setNumberOfPage]=useState(1)
const numberOfPagination = book === 'malik' ? 6 : 10
const [loading,setLoading] = useState(false)

//Change Book 
const changeBook = (nameOfBook)=>{
  setBook(nameOfBook);
  setNumberOfPage(1)
}

//fetch data 
const handleData = useCallback(async()=>{
      setLoading(true)
      const res =await axios.get(`https://hadis-api-id.vercel.app/hadith/${book}?page=${numberOfPage}&limit=300`)
      setData(res.data.items)
      setLoading(false)
},[book,numberOfPage])

useEffect(() => {
  handleData();
}, [handleData]);
//end Fetch data

  return (
  <div className='ahadith-container'>

       {/* Navbar  */}
       <nav className='hadith'>
            <div className='btn-conntainer'>
                <button  onClick={()=>changeBook("bukhari")} className='active'>صحيح البخاري</button>  
                <button onClick={()=>changeBook("muslim")}>صحيح مسلم</button>  
                <button onClick={()=>changeBook("nasai")}>سنن النسائي</button>  
                <button onClick={()=>changeBook("abu-dawud")}>سنن أبي داود </button>  
                <button onClick={()=>changeBook("tirmidzi")}>سنن الترمذي</button>  
                <button onClick={()=>changeBook("ibnu-majah")}>سنن ابن ماجه</button> 
                <button onClick={()=>changeBook("malik")}>موطأ مالك</button> 
                <button onClick={()=>changeBook("ahmad")}>مسند الإمام أحمد</button> 
            </div>
       </nav>
       {/* End Navbar  */}


  {loading

  ?      
     <Loading mT="40px"/>  
  :
    //show data
    <div>
          {data.map((item, i) => (
            <div key={i} className='hadith-content '>
              <p>{item.arab}</p>
              <h6 className='text-center '>{item.number}</h6>
            </div>
          ))}
    </div>}
   {/* end show data */}


{/*Paginations */}
<Paginations 
    setNumberOfPage={setNumberOfPage} 
    numberOfPagination={numberOfPagination}
    numberOfPage={numberOfPage} />

     {/* scroll to top  */}
     <ScrollTopTop bottom="30px"/>
    

    </div>
  )
}

export default Hadith