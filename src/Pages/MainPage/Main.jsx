import React from 'react';
import MainPageCard from '../../components/MainPageCard/MainPageCard';
import "./main.css";
import data from "../../data/mainPage";
import SocialIcon from '../../components/SocialIcon';

function Main() {
  return (
    <div className="mt-[40px] sm:mt-[80px] mr-[60px] md:mr-[80px] px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
      {data.map((item) => (
        <MainPageCard key={item.id} title={item.title} url={item.url} icon={item.icon} image={item.image} />
      ))}
      <div className="col-span-full flex justify-center mt-6">
        <SocialIcon />
      </div>
    </div>
  );
}

export default Main;
