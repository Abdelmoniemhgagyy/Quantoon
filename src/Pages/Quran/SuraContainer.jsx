import React , { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import call from "../../api/call"
function SuraContainer() {
  const [data, setData] = useState([]);
  const handelNameSura = async () => {
    const nameSura = await call.nameSura()
    setData(nameSura);
  };

  useEffect(() => {
    handelNameSura();
  },[]);

  return (
    <>
      <div className="containerr mr-[60px] md:mx-auto w-[80%]">
        {/* loop Name of  sura  */}
          {data.map((item,i) => (
            <Link key={i} to={`${item.number}`} className="box">
              <div className="text-[22px]">{item.name}</div>
              <p>{item.englishName}</p>
            </Link>
          ))}

        {/* End loop Name of  sura  */}
      </div>
    </>
  );
}

export default SuraContainer;
