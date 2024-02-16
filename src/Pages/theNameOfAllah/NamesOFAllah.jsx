import React from "react";
import data from "../../data/Names_Of_Allah.json";
import "./NamesOFAllah.css";
function NamesOFAllah() {
  window.scroll({top:0})
  return (
    <div className="names-container">
      {data.map((item, i) => (
        <div key={i} className="theName">
          <h3>{item.name}</h3>
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  );
}

export default NamesOFAllah;
