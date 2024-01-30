import React from "react";
import Quran from "./Pages/Quran/Quran";
import QuranAudio from "./Pages/quran-audio/QuranAudio.jsx";
import Download from "./Pages/quran-audio/Download.jsx";
import PlayerQuran from "./Pages/quran-audio/PlayerQuran.jsx";
import Sura from "./Pages/Quran/Sura";
import SuraContainer from "./Pages/Quran/SuraContainer.jsx";
import Adkar from "./Pages/Adkar/Adkar.jsx";
import Moshaf from "./Pages/moshaf/Moshaf.jsx";
import Books from "./Pages/Books/Books.jsx";
import RightNavbar from "./components/Navbar/RightNavbar.jsx";
import Hadith from "./Pages/Hadith/Hadith.jsx";
import Juza from "./Pages/Quran/Juza.jsx";
import JuzaContainer from "./Pages/Quran/JuzaContainer.jsx";
import NamesOFAllah from "./Pages/theNameOfAllah/NamesOFAllah.jsx";
import Videos from "./Pages/LectureVideos/Videos.jsx";
import Rosary from "./Pages/Rosary/Rosary.jsx";
import MuslimBoy from "./Pages/muslimBoy/MuslimBoy.jsx";
import ScrollTopTop from "./components/ScroolToTop/ScroolToTop.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "./components/Loading/Loading.jsx";

const VideoPage = React.lazy(() =>
  import("./Pages/LectureVideos/VideoPage.jsx")
);
const LazyLoadedVideoPage = () => (
  <React.Suspense fallback={<Loading />}>
    <VideoPage />
  </React.Suspense>
);

function App() {
  return (
    <BrowserRouter>
      <RightNavbar />
      <ScrollTopTop />

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
        <Route path="/videos" element={<LazyLoadedVideoPage />} />

        <Route path="/video" element={<Videos />} />
        <Route path="/boymuslim" element={<MuslimBoy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
