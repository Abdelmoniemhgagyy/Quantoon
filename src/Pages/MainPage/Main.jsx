import React from 'react'
import MainPageCard from '../../components/MainPageCard/MainPageCard'
import "./main.css"
import data from "../../data/mainPage"


function Main() {
  return (
  <div className='mt-[80px] mr-[60px] flex flex-wrap align-center justify-center gap-[50px]'>
     {data.map((item)=>(
      <MainPageCard title={item.title} subTitle={item.subTitle} url={item.url}/>
     ))}
  </div>
  )
}

export default Main