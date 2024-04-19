import React from 'react'
import { Outlet } from 'react-router-dom'
function Audio() {
  return (
    <div className='mr-[60px] '>
      <Outlet/>   
    </div>
  )
}

export default Audio