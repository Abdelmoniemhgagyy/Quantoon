import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import GloableContext from "../../store/GloableContext"
function Itemcard({Ele}) {
    const navigate = useNavigate();
    const {setAudioCategory} =useContext(GloableContext)
    
    const handleAudioCategory = () => {
        localStorage.setItem("audioCategory", JSON.stringify(Ele.array));
        setAudioCategory(JSON.parse(localStorage.getItem("audioCategory")));
        navigate(Ele.path)
    };
    useEffect(()=>{

    },[setAudioCategory])
  return (
    <>
      <div
        className="border-white flex flex-col border-[2px]  shadow-sm rounded-xl w-[80%] md:w-[250px] h-[250px] bg-[#2b4f85] cursor-pointer transition duration-300 transform hover:scale-105"
        onClick = {handleAudioCategory}
      >
        <img
          className="w-full h-[80%]  rounded-t-[8px] border-b-white border-b-[2px]"
          src={Ele.img}
          alt="..."
        />
        <h3 className="text-xl font-[900] pb-1 text-white mt-2 text-center dark:text-white md:w-full whitespace-nowrap">
         {Ele.title}
        </h3>
      </div>
    </>
  );
}

export default Itemcard;
