import React from 'react';
import MainPageCard from '../../components/MainPageCard/MainPageCard';
import data from "../../data/mainPage";
import SocialIcon from '../../components/SocialIcon';
import '../../components/MainPageCard/main-page-card.css';

function Main() {
  return (
    <div className="home-page min-h-screen pb-12 mt-[40px] sm:mt-[60px] md:mt-[80px] bg-transparent w-full overflow-x-hidden transition-all duration-300 pr-[75px] sm:pr-[85px] md:pr-[100px] pl-[15px] sm:pl-[25px]">

      {/* Cards Grid */}
      <div className="w-full pt-[10px] max-w-[1400px] mt-[20px] mx-auto grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
        {data.map((item) => (
          <MainPageCard
            key={item.id}
            title={item.title}
            subTitle={item.subTitle}
            url={item.url}
            icon={item.icon}
            image={item.image}
            Icon={item.Icon}
          />
        ))}
      </div>

      {/* Footer Social Icons */}
      <div className="flex justify-center mt-10 md:mt-20 mb-6">
        <div className="home-social-shell bg-[#113146]/80 backdrop-blur-xl border border-teal-500/30 rounded-full px-8 py-3 shadow-[0_5px_25px_rgba(0,0,0,0.3)] hover:shadow-teal-400/20 hover:border-teal-400/50 transition-all duration-500">
          <SocialIcon />
        </div>
      </div>
    </div>
  );
}

export default Main;
