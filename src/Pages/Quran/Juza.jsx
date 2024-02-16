import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams , Link } from "react-router-dom";
import Loading from "../../components/Loading/Loading"
import call from "../../api/call"

function Juza() {
  const[loading,setLoading] = useState(true)
  const [data, setData] = useState([]);
  const {id} = useParams()

 const handelSura = async () => {
    const juza = await call.suraData(id);
    setData(juza);
    setLoading(false)
  };

  useEffect(() => {
    handelSura();
  });
  window.scroll({top:0})

  return (
    <div>
      {loading ? <Loading mT="250px"/> 
      :
      <div className="sura">
        {data.map((item) => (
          <div  >
            <p>{item.text} (<span>{item.number}</span>)</p>
          </div>
        ))}
        <Link to="/quran/juza">
              <i class="bi bi-backspace"></i>
        </Link>
      </div>    
          }
          <br />
    </div>
  );
}

export default Juza;
