import React from 'react'
import "./main-page-card.css"
import { useNavigate } from 'react-router-dom'

function MainPageCard({title,subTitle,url}) {
  const navigate = useNavigate()
  return (
    <div>
       <div class="card" onClick={()=>navigate(url)} data-text={subTitle}>{title}</div>
    </div>
  )
}

export default MainPageCard