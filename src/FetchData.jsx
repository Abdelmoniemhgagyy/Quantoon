import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useTranslation } from 'react-i18next';


function Axios() {

  

  const [data, setData] = useState([]);
const handelData = async ()=>{
   const d = await axios.get("https://api.alquran.cloud/v1/meta")
   console.log(d.data.data.surahs)
    setData(d.data.data.surahs.references)
}
useEffect(()=>{
  handelData()
}
,[])
//translations
const [t,i18n]=useTranslation('')
const d = data.map((item)=>  {
if(i18n.language=="en"){
  return (
     { 
      "number": item.number,
      "name":item.englishName}
)
  }else{
    return(
      item
    )
  }
})


  return (
    <div>
     {d.map((item,index)=> <div key={index}>{item.name}</div>)}
    </div>
  )
}

export default Axios