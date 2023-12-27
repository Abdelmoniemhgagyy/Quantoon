import React from 'react'
import Quran from "../../assest/listImg/koran.png"
import "./main.css"


function Main() {
  return (
  <div className='container '>
     
     <div className='main-page-content'>

      <div className='main-page-item'>
              <div className='img-container'>
                      <img src={Quran} alt="quran" />
              </div>
              <div className='main-page-title'>
                    <h3>القران الكريم</h3>
              </div>
      </div>
      
      <div className='main-page-item'>
              <div className='img-container'>
                      <img src={Quran} alt="quran" />
              </div>
              <div className='main-page-title'>
                    <h3>القران الكريم</h3>
              </div>
      </div>
      
      <div className='main-page-item'>
              <div className='img-container'>
                      <img src={Quran} alt="quran" />
              </div>
              <div className='main-page-title'>
                    <h3>القران الكريم</h3>
              </div>
      </div>
      
      <div className='main-page-item'>
              <div className='img-container'>
                      <img src={Quran} alt="quran" />
              </div>
              <div className='main-page-title'>
                    <h3>القران الكريم</h3>
              </div>
      </div>
      
      


     </div>

  </div>
  )
}

export default Main