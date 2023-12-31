import React from 'react'

function Loading({mT}) {
  return (
    <div className='   d-flex align-items-center justify-content-center ' style={{margin:`${mT} auto`}}>
    <div className="spinner-border text-primary " role="status">
       <span className="sr-only"></span>
    </div>
</div> 
  )
}

export default Loading