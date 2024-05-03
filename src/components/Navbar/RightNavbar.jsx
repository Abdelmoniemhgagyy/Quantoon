import { useState } from 'react'
import NavItem from "./NavItem"
import {Link } from 'react-router-dom'
import "./RightNavbar.css"
import Logo from "../../assest/logo.jpg"

import Quran from "../../assest/listImg/koran.png"
import Hadith from "../../assest/listImg/ramadan.png"
import Adkar from "../../assest/listImg/prayer.png"
import NamesOfAllah from "../../assest/listImg/allah.png"
import Rosary from "../../assest/listImg/beads.png"
import moshaf from "../../assest/listImg/quran.png"
import Video from "../../assest/listImg/video.png"
import Boy from "../../assest/listImg/boy.png"
import Audio from "../../assest/listImg/headphones.png"



function RightNavbar() {

    const [openNav,setOpenNav] =useState(false)

  return (
<div >
 <div className='containerRightNav '>

    <div className={`constentRightNav`} style={{width:openNav ?"280px":"60px"}}>
      {/* logo */}
      <Link to="/" className='logo-container mt-[30px] mb-[20px]'  style={{gap:openNav?"18px":"0px"}} >
          {
            openNav  ?  <h3 className='titleNavEle'>قانتون</h3>
                     : <img src={Logo} alt="logo" />
          }
           
      </Link>

    {/* Sart Nav items  */}

    {/* List icon  */}
        <div className={`RightNavEle Navlist`}
              style={{padding:openNav ?"8px 10px":"10px 20px 0 0"}}
                dir='rtl'
                onClick={()=>setOpenNav(!openNav)} >
                  
                  <div>
                      <i className= "bi bi-list "></i>
                  </div>

                  <div className='grow'>
                      <p style={{fontSize:openNav?"18px":"0px"}} className='titleNavEle'>القائمة</p>
                  </div>
        </div>
    {/* End List icon  */}
      
        <NavItem ImgSrc={NamesOfAllah} openNav={openNav} setOpenNav={setOpenNav} path="/namesofallah" title="أسماء الله الحسني"/>
        <NavItem ImgSrc={Quran} openNav={openNav} setOpenNav={setOpenNav} path="/quran" title="القران الكريم"/>
        <NavItem ImgSrc={Hadith} openNav={openNav} setOpenNav={setOpenNav} path="/hadith" title=" الأحاديث النبوية"/>
        <NavItem ImgSrc={ Boy} openNav={openNav} setOpenNav={setOpenNav} path="/boymuslim" title="الطفل المسلم"/>
        <NavItem ImgSrc={Video} openNav={openNav} setOpenNav={setOpenNav} path="/videos" title="مرئيات"/>
        <NavItem ImgSrc={Audio} openNav={openNav} setOpenNav={setOpenNav} path="/audio" title="صوتيات"/>                             
        <NavItem ImgSrc={Adkar} openNav={openNav} setOpenNav={setOpenNav} path="/adkar" title="الأذكار"/>                             
        <NavItem ImgSrc={ moshaf} openNav={openNav} setOpenNav={setOpenNav} path="/moshaf" title="المصاحف"/>
        <NavItem ImgSrc={ Rosary} openNav={openNav} setOpenNav={setOpenNav} path="/rosary" title="السبحة"/>

    {/* End Nav items  */}
    </div>


  </div>
</div>
    
  )
}

export default RightNavbar