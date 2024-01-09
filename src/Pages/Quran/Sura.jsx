import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useParams , Link } from "react-router-dom";
import Loading from "../../components/Loading/Loading"
function Quran() {
  const[loading,setLoading] = useState(true)
  const [data, setData] = useState([]);
  const {id} = useParams()

  const handelSura = async () => {
    const d = await axios.get(`https://api.alquran.cloud/v1/surah/${id}`);
    setData(d.data.data.ayahs);
    setLoading(false)
  };
  useEffect(() => {
    handelSura();
  }, [data]);

  return (
    <div>
      {loading ? <Loading mT="300px"/> 
      :
      <div className="sura">
        {data.map((item) => (
          <div>
            <p>{item.text} (<span>{item.numberInSurah}</span>)</p>
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
