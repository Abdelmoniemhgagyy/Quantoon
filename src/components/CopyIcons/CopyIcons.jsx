import React from "react";
import { useState } from "react";
import clipboardCopy from "clipboard-copy";

function CopyIcons({ copiedText }) {
  const [isCopy, setIsCopy] = useState(false);
  return (
    <div
      className="absolute left-[5px] top-[5px] cursor-pointer "
      onClick={() => {
        setIsCopy(!isCopy);
        clipboardCopy(copiedText);
      }}
    >
      {isCopy ? (
        <i class="bi bi-clipboard-check sm:text-[18px] text-[14px] text-[#47fdff]"></i>
      ) : (
        <i className="bi bi-copy sm:text-[18px] text-[14px] "></i>
      )}
    </div>
  );
}

export default CopyIcons;
