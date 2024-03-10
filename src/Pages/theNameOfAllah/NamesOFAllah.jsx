import React from "react";
import data from "../../data/Names_Of_Allah.json";
import "./NamesOFAllah.css";
import {motion} from "framer-motion"
function NamesOFAllah() {
  window.scroll({top:0})
  return (
    <motion.div 
      initial={{y:"60vh"}}
      animate={{y:0}}
      transition={{duration:.8}}
      exit={{y:"-100vh"}} 
      className="names-container">
      {data.map((item, i) => (
        <div key={i} className="theName">
          <h3>{item.name}</h3>
          <p>{item.text}</p>
        </div>
      ))}
    </motion.div>
  );
}

export default NamesOFAllah;
