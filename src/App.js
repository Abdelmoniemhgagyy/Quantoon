import React from "react";
import Quran from "./Pages/Quran/Quran";
import QuranAudio from "./Pages/quran-audio/QuranAudio.jsx";
import Download from "./Pages/quran-audio/Download.jsx";
import PlayerQuran from "./Pages/quran-audio/PlayerQuran.jsx";
import Sura from "./Pages/Quran/Sura";
import SuraContainer from "./Pages/Quran/SuraContainer.jsx";
import Adkar from "./Pages/Adkar/Adkar.jsx";
import Moshaf from "./Pages/moshaf/Moshaf.jsx";
import BooksAudio from "./Pages/Audius/BooksAudio.jsx";
import Audio from "./Pages/Audius/Audio.jsx";
import MainAudio from "./Pages/Audius/MainAudio.jsx";

import RightNavbar from "./components/Navbar/RightNavbar.jsx";
import Hadith from "./Pages/Hadith/Hadith.jsx";
import Juza from "./Pages/Quran/Juza.jsx";
import JuzaContainer from "./Pages/Quran/JuzaContainer.jsx";
import NamesOFAllah from "./Pages/theNameOfAllah/NamesOFAllah.jsx";
import Videos from "./Pages/LectureVideos/Videos.jsx";
import Rosary from "./Pages/Rosary/Rosary.jsx";
import MuslimBoy from "./Pages/muslimBoy/MuslimBoy.jsx";
import ScrollTopTop from "./components/ScroolToTop/ScroolToTop.jsx";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Loading from "./components/Loading/Loading.jsx";
import MainVideos from "./Pages/LectureVideos/MainVideos.jsx";
import ShortVideosQuran from "./Pages/LectureVideos/ShortVideosQuran.jsx";
import Sheihks from "./Pages/LectureVideos/Sheihks.jsx";
import {AnimatePresence} from "framer-motion"
import { ToastContainer } from "react-toastify";
const VideoPage = React.lazy(() =>
  import("./Pages/LectureVideos/VideoPage.jsx")
);
const LazyLoadedVideoPage = () => (
  <React.Suspense fallback={<Loading itemsCenter="true"/>}>
    <VideoPage />
  </React.Suspense>
);

function App() {
  window.scroll({top:0})
  return (
    <BrowserRouter>
      <RightNavbar />
      <ScrollTopTop />

     <AnimatePresence mode="wait">
      <ToastContainer/>
      <Routes>
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

        {/* lazy component  */}
        <Route path="/videos" element={<LazyLoadedVideoPage />} >
             <Route index  element={<MainVideos />} />
             <Route path="sheihks" element={<Sheihks />} />
             <Route path="short-video-quran" element={<ShortVideosQuran />} />
        </Route>

        <Route path="/video" element={<Videos />} />
        <Route path="/boymuslim" element={<MuslimBoy />} />

        {/* Audio */}
        <Route path = "/audio" element={<Audio />} >
          <Route index element={<MainAudio/>} />
          <Route path="books" element={<BooksAudio/>} />
        </Route>
      </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default App;
