import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams , Link } from "react-router-dom";
import Loading from "../../components/Loading/Loading"
import CopyIcons from '../../components/CopyIcons/CopyIcons'
import call from "../../api/call"
function Quran() {
  const[loading,setLoading] = useState(true)
  const [data, setData] = useState([]);
  const {id} = useParams()

  const handelSura = async () => {
    const sura = await call.suraData(id)
    setData(sura);
    setLoading(false)
  };
  
  useEffect(() => {
    handelSura();

  });
  return (
    <div>
      {loading ? <Loading mT="300px"/> 
      :
      <div className="sura">
        {data.map((item) => (
          <div className="relative ">
          <div className="py-[20px] md:py-[10px]" >
            <p className="py-[20px]  md:py-[10px]">{item.text} (<span>{item.numberInSurah}</span>)</p>
          </div>
            <CopyIcons copiedText={item.text}/>
          </div>
        ))}

        <Link to="/quran">
              <i class="bi bi-backspace"></i>
        </Link>
      </div>    
          }
            <br />
    </div>
  );
}

export default Quran;
