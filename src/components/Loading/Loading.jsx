import React from 'react'

function Loading({itemsCenter}) {
  return (
  <div className='flex justify-center min-h-screen mr-[33px]' 
  style={{  alignItems:itemsCenter?"center":"",
            marginTop:!itemsCenter?"90px":"" }}>

      <div class=" animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading">
        <span class="sr-only">Loading...</span>
      </div>


  </div>
  )
}

export default Loading