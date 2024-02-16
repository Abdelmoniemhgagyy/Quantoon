import React, { useState } from "react";
import Img from "../../assest/rosary.png";
import styles from "./Rosary.module.css";
function Counter({ daker }) {
  const [count, setCount] = useState(0);
  return (
    <div className="flex justify-center items-center flex-col">
      <div className={`${styles.rossary} `}>
        <img
          src={Img}
          alt="rossary"
          className=" md:mx-auto  w-[240px] max-w-[240px]"
        />

        <h3 className={styles.countShow}>{count}</h3>

        <button
          className={styles.counterBtn}
          onClick={() => setCount(count + 1)}
        ></button>

        <button
          className={styles.resetBtn}
          onClick={() => setCount(0)}
        ></button>
      </div>

      <p className="p-2  text-white text-center w-[90%] mr-[27px] md:mx-auto ">
        {daker}
      </p>
    </div>
  );
}

export default Counter;
