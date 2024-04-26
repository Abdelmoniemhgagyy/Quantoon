import React from 'react'
import { Outlet } from 'react-router-dom'

function Audio() {
  return (
    <div className='mr-[60px] '>
      <Outlet/> 
      {/* <div className='flex justify-center items-center h-[80vh] w-[80%]'>
          <iframe
            src="https://archive.org/embed/02._20220620_202206&playlist=1"
            width="100%"
            // height="800"
            frameborder="1"
            webkitallowfullscreen="true"
            mozallowfullscreen="true"
            allowfullscreen
          ></iframe>
      </div>   */}
    </div>
  )
}

export default Audio