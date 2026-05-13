import Main from "./Pages/MainPage/Main.jsx"
import Quran from "./Pages/Quran/Quran";
import QuranAudio from "./Pages/quran-audio/QuranAudio.jsx";
import Download from "./Pages/quran-audio/Download.jsx";
import PlayerQuran from "./Pages/quran-audio/PlayerQuran.jsx";
import Sura from "./Pages/Quran/Sura";
import SuraContainer from "./Pages/Quran/SuraContainer.jsx";
import Adkar from "./Pages/Adkar/Adkar.jsx";
import Moshaf from "./Pages/moshaf/Moshaf.jsx";
// import ReciterPage from "./Pages/Audius/ReciterPage.jsx";
import Sermons from "./Pages/hotba/Sermons.jsx";
import SermonDetailPage from "./Pages/hotba/SermonDetailPage.jsx";
import Deceased from "./Pages/Deceased/Deceased.jsx";
import DeceasedDetails from "./Pages/Deceased/DeceasedDetails.jsx";


import PrayerTimes from "./Pages/PrayerTimes/PrayerTimes.jsx";
import Qibla from "./Pages/Qibla/Qibla.jsx";


// import Audio from "./Pages/Audius/Audio.jsx";
// import MainAudio from "./Pages/Audius/MainAudio.jsx";

import RightNavbar from "./components/Navbar/RightNavbar.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import Hadith from "./Pages/Hadith/Hadith.jsx";
import Juza from "./Pages/Quran/Juza.jsx";
import JuzaContainer from "./Pages/Quran/JuzaContainer.jsx";
import NamesOFAllah from "./Pages/theNameOfAllah/NamesOFAllah.jsx";
import Rosary from "./Pages/Rosary/Rosary.jsx";
// import MuslimBoy from "./Pages/muslimBoy/MuslimBoy.jsx";
import Info from "./Pages/Info/Info.jsx"
import BuildJannah from "./Pages/BuildJannah/BuildJannah.jsx";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy.jsx";
import ScrollTopTop from "./components/ScroolToTop/ScroolToTop.jsx";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// import React from "react";
// import Videos from "./Pages/LectureVideos/Videos.jsx";
// import Loading from "./components/Loading/Loading.jsx";
// import MainVideos from "./Pages/LectureVideos/MainVideos.jsx";
// import ShortVideosQuran from "./Pages/LectureVideos/ShortVideosQuran.jsx";
// import Sheihks from "./Pages/LectureVideos/Sheihks.jsx";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
// const VideoPage = React.lazy(() =>
//   import("./Pages/LectureVideos/VideoPage.jsx")
// );
// const LazyLoadedVideoPage = () => (
//   <React.Suspense fallback={<Loading itemsCenter="true" />}>
//     <VideoPage />
//   </React.Suspense>
// );

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Main />} />
        {/* Start Quran Routes */}
        <Route path="/quran" element={<Quran />} exact>
          <Route index element={<SuraContainer />} />
          <Route path=":id" element={<Sura />} />
          <Route path="juza" element={<JuzaContainer />} />
          <Route path="juza/:id" element={<Juza />} />
          <Route path="audio" element={<QuranAudio />} />
          <Route path="download" element={<Download />} />
          <Route path="player" element={<PlayerQuran />} />
        </Route>
        {/* End Quran Routes */}

        <Route path="/adkar" element={<Adkar />} />
        <Route path="/hadith" element={<Hadith />} />
        <Route path="/namesofallah" element={<NamesOFAllah />} />
        <Route path="/rosary" element={<Rosary />} />
        <Route path="/moshaf" element={<Moshaf />} />

        {/* <Route path="/boymuslim" element={<MuslimBoy />} /> */}

        <Route path="/prayer-times" element={<PrayerTimes />} />
        <Route path="/qibla-dir" element={<Qibla />} />

        {/* Audio */}
        {/* <Route path="/audio" element={<Audio />}>
          <Route index element={<MainAudio />} />
          <Route path=":reciterId" element={<ReciterPage />} />
        </Route> */}
        {/* Hotba */}
        <Route path="/hotba" element={<Sermons />} />
        <Route path="/hotba/sermon/:id" element={<SermonDetailPage />} />
        <Route path="/deceased" element={<Deceased />} />
        <Route path="/deceased/:id" element={<DeceasedDetails />} />
        <Route path="/info" element={<Info />} />
        <Route path="/build-jannah" element={<BuildJannah />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  window.scroll({ top: 0 });
  return (
    <BrowserRouter>
      <RightNavbar />
      <ScrollTopTop />

      {/* Theme Toggle - Fixed Position Top Left */}
      <div className="fixed top-4 left-4 z-[10000]">
        <ThemeToggle />
      </div>

      <ToastContainer />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
