import React , { useEffect,useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function SuraContainer() {
  const [data, setData] = useState([]);
  const handelNameSura = async () => {
    const d = await axios.get("https://api.alquran.cloud/v1/meta");
    setData(d.data.data.surahs.references);
  };

  useEffect(() => {
    handelNameSura();
  }, []);

  return (
    <>
      <div className="containerr mr-[60px] md:mx-auto w-[80%]">
        {/* loop Name of  sura  */}
          {data.map((item) => (
            <div className="box">
              <Link to={`${item.number}`}>{item.name}</Link>
              <p>{item.englishName}</p>
            </div>
          ))}

        {/* End loop Name of  sura  */}
      </div>
    </>
  );
}

export default SuraContainer;
