import React, { useEffect, useState } from "react";

function Counter({data,repeatNumber}) {
  const [count, setCount] = useState(0);
useEffect(()=>{
    setCount(0)
},[data])
  return (
    <>
        <button
        onClick={() => setCount(count + 1)}
        className={`rounded-tl-[20px] py-1 px-0 text-center w-full text-white border border-b-none  ${+repeatNumber === count ?`bg-[#2cd7e1cc]`:`bg-[#354261]`}`}
        >
        {count}
        </button>
        <button
        onClick={() => setCount(0)}
        className="absolute left-0 bottom-[1px] rounded-tl-[20px] w-[35px]  py-1 text-black bg-[#fff]"
        >
            <i className="bi bi-arrow-counterclockwise text-[#262639]"></i>
        </button>
    </>
  );
}

export default Counter;
