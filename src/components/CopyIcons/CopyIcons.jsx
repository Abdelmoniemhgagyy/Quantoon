import React from "react";
import { useState } from "react";
import clipboardCopy from "clipboard-copy";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './toastStyles.css'
function CopyIcons({ copiedText }) {

  const handelToastify =()=>{
    toast.success("تم النسخ ");
  }
  return (
    <>
    <div
      className="absolute left-[5px] top-[5px] cursor-pointer "
      onClick={() => {
        clipboardCopy(copiedText);
      }}
    >
        <i className="bi bi-copy sm:text-[18px] text-[14px] " onClick={handelToastify}></i>
    </div>
    
    </>
  );
}

export default CopyIcons;
