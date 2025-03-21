import React, { useContext} from "react";
import GloableContext from "../../store/GloableContext";
import { useNavigate } from "react-router-dom";
function Card({ ImgSrc, name, data }) {

  const navigate = useNavigate();
  const { setLeactureVideoes, setNameSheihk, setLogoSheihk } = useContext(GloableContext);

  // send data sheihk to show he in veido page
  const handelData = () => {
    localStorage.setItem("leactureVideoes", JSON.stringify(data));
    localStorage.setItem("nameSheihk", name);
    localStorage.setItem("logoSheihk", ImgSrc);

    setNameSheihk(localStorage.getItem("nameSheihk"));
    setLogoSheihk(localStorage.getItem("logoSheihk"));
    setLeactureVideoes(JSON.parse(localStorage.getItem("leactureVideoes")));

    navigate("/video");
  };

  return (
    <>
      {/* Card  */}
      <div
        className="border-white flex flex-col border-[2px]  shadow-sm rounded-xl w-[80%] md:w-[250px] md:h-[250px] bg-[#2b4f85] cursor-pointer transition duration-300 transform hover:scale-105"
        onClick={handelData}
      >
        <img
          className="w-full h-[80%] rounded-t-[8px] border-b-white border-b-[2px]"
          src={ImgSrc}
          alt="sheikhsphoto"
        />
        <h3 className="text-xl font-[900] pb-1 text-white mt-2 text-center dark:text-white md:w-full whitespace-nowrap">
          {name}
        </h3>
      </div>
      {/* End Card  */}
    </>
  );
}

export default Card;
