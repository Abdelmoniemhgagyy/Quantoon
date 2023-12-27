import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function Paginations({setNumberOfPage,numberOfPagination,numberOfPage}) {
    

// number of pages
const handelNumberOfPage =(p,c)=>{
      setNumberOfPage(c)
}

  return (
    <Stack spacing={4} 
        sx={{
            position:"fixed",
            bottom:"0px", 
            left:"0px",
            zIndex:"9999999999999",
            minWidth:"100vw",
            backgroundColor:"#dceaff"}} >
      <Pagination   
        count={numberOfPagination} 
        color="secondary" 
        sx={{direction:"ltr", display:"flex",justifyContent:"center",}} 
        onChange={handelNumberOfPage}/>
    </Stack>
  );
}