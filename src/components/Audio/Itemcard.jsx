import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import GloableContext from "../../store/GloableContext"
function Itemcard({Ele}) {
    const navigate = useNavigate();
    const {setAudioCategory} =useContext(GloableContext)
    const handleAudioCategory = () => {
        localStorage.setItem("audioCategory", JSON.stringify(Ele.lectures));
        setAudioCategory(JSON.parse(localStorage.getItem("audioCategory")));
navigate(`/audio/${encodeURIComponent(Ele.seriesTitle)}`);
    };
    useEffect(()=>{

    },[setAudioCategory])
  return (
    <>
      <div
        className="pt-[20px] shadow-lg flex flex-col bg-[#0f0f1975] rounded-xl w-[80%] md:w-[270px] h-[250px]  cursor-pointer transition duration-300 transform hover:scale-105"
        onClick = {handleAudioCategory}
      >
        <img
          alt='>>'
          className="w-32 h-32 rounded-full object-cover mx-auto mb-3 border-4 border-blue-500 shadow-lg"
          src="https://images.unsplash.com/photo-1689125220678-7a8393658449"
        />
        <h3 className=" font-[900] pb-1 px-[10px] text-white mt-2 text-center dark:text-white md:w-full ">
         {Ele.seriesTitle}
        </h3>
      </div>
    </>
  );
}

export default Itemcard;
