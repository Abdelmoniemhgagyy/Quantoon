import React, { useEffect, useState } from 'react'
import axios from "axios"
function Axios() {
  const [data, setData] = useState([]);


const handelData = async ()=>{
   await fetch("https://jsonplaceholder.typicode.com/todos").then((res)=> res.json())
   .then((data)=>{
    setData(data)
    // setData(data.data.surahs.references)
  
    // setData(data.data.surahs.references)
   }
  
   )
  

}

// const handelData = async ()=>{
//   const res = await fetch("https://api.alquran.cloud/v1/meta")
//   const data = await res.json() ;
//   console.log(data.data.surahs.references)
//   setData(data.data.surahs.references)
 
// }
useEffect(()=>{


handelData()

}
,[])

  return (
    <div>
     {data.map((item,index)=> <div key={index}>{item.id}</div>)}
    </div>
  )
}

export default Axios