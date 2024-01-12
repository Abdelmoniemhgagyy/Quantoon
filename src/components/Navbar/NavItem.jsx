import React from 'react'
import { NavLink } from 'react-router-dom'

function NavItem({openNav,setOpenNav,title,path,ImgSrc}) {
  return (
    <NavLink to={path}  className={`RightNavEle `}
      style={{padding:openNav ?"8px 10px":"15px 10px 10px 0"}}
         dir='rtl'
         onClick={()=>setOpenNav(false)} >
          <div >
              <img src={ImgSrc} alt="listIcon" style={{width:"30px",marginRight:openNav?"":"5px"}} />
          </div>
          <div className='grow'>
               <p style={{fontSize:openNav?"18px":"0px"}} className='titleNavEle'>{title}</p>
          </div>

</NavLink>
  )
}

export default NavItem