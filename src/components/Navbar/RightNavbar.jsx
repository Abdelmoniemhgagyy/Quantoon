import { useState } from 'react'
import NavItem from "./NavItem"
import { Link } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'
import "./RightNavbar.css"
import Logo from "../../assest/logo.jpg"

import Quran from "../../assest/listImg/koran.png"
import Hadith from "../../assest/listImg/ramadan.png"
import Adkar from "../../assest/listImg/prayer.png"
import Rosary from "../../assest/listImg/beads.png"
import moshaf from "../../assest/listImg/quran.png"
// import Boy from "../../assest/listImg/boy.png"
import doaaImg from "../../assest/listImg/zaker.png"
import Hotba from "../../assest/listImg/hotba.png"
import Home from "../../assest/listImg/home.png"
import Radio from "../../assest/listImg/radio.png"
const Jannah = "/images/jannah/treasure.png"



function RightNavbar() {

  const [openNav, setOpenNav] = useState(false)

  return (
    <div >
      <div className='containerRightNav '>

        <div className={`constentRightNav`} style={{ width: openNav ? "280px" : "60px" }}>
          {/* logo */}
          <Link to="/" className='logo-container mt-[30px] mb-[20px]' style={{ gap: openNav ? "18px" : "0px" }} >
            {
              openNav ? <h3 className='titleNavEle'>قانتون</h3>
                : <img src={Logo} alt="logo" />
            }

          </Link>

          {/* Sart Nav items  */}

          {/* List icon  */}
          <div className={`RightNavEle Navlist`}
            style={{ padding: openNav ? "8px 10px" : "10px 20px 0 0" }}
            dir='rtl'
            onClick={() => setOpenNav(!openNav)} >

            <div>
              <i className="bi bi-list "></i>
            </div>

            <div className='grow'>
              <p style={{ fontSize: openNav ? "18px" : "0px" }} className='titleNavEle'>القائمة</p>
            </div>
          </div>
          {/* End List icon  */}


          <NavItem ImgSrc={Home} openNav={openNav} setOpenNav={setOpenNav} path="/" title="الرئيسية" />
          <NavItem ImgSrc={Quran} openNav={openNav} setOpenNav={setOpenNav} path="/quran" title="القران الكريم" />
          <NavItem ImgSrc={Hadith} openNav={openNav} setOpenNav={setOpenNav} path="/hadith" title=" الأحاديث النبوية" />
          <NavItem ImgSrc={Radio} openNav={openNav} setOpenNav={setOpenNav} path="/radio" title="الراديو" />
          {/* <NavItem ImgSrc={Boy} openNav={openNav} setOpenNav={setOpenNav} path="/boymuslim" title="الطفل المسلم" /> */}
          <NavItem ImgSrc={Hotba} openNav={openNav} setOpenNav={setOpenNav} path="/hotba" title="خطب" />
          <NavItem ImgSrc={Adkar} openNav={openNav} setOpenNav={setOpenNav} path="/adkar" title="الأذكار" />
          <NavItem ImgSrc={moshaf} openNav={openNav} setOpenNav={setOpenNav} path="/moshaf" title="المصاحف" />
          <NavItem ImgSrc={Rosary} openNav={openNav} setOpenNav={setOpenNav} path="/rosary" title="السبحة" />
          <NavItem ImgSrc={doaaImg} openNav={openNav} setOpenNav={setOpenNav} path="/deceased" title="الدعاء للمتوفى" />
          <NavItem ImgSrc={Jannah} openNav={openNav} setOpenNav={setOpenNav} path="/build-jannah" title="ابني جنتك" />
          <NavItem Icon={ShieldCheck} openNav={openNav} setOpenNav={setOpenNav} path="/privacy-policy" title="سياسة الخصوصية" />



          {/* End Nav items  */}
        </div>


      </div>
    </div>

  )
}

export default RightNavbar
