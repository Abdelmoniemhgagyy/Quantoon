import { useNavigate } from 'react-router-dom';

function MainPageCard({ title, url, icon,image }) {
  const navigate = useNavigate();

  return (
    <div 
      className="w-full text-[14px] sm:text-[16px]  sm:w-[180px] h-[120px] sm:h-[180px] bg-white shadow-md rounded-2xl flex flex-col 
                 items-center justify-center text-center text-gray-800 font-bold 
                 transition-transform duration-300 hover:scale-105 hover:shadow-xl active:scale-95 
                 cursor-pointer"
      onClick={() => navigate(url)}
    >   
       {image ? (
        <img src={image} alt={title} className="w-14 h-14 mb-3 object-contain" />
      ) : (
        <div className="text-4xl mb-3">{icon}</div>
      )}



      <div className="text-md px-2">{title}</div>
    </div>
  );
}

export default MainPageCard;
