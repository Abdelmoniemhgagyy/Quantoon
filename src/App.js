import React from 'react';
import Main from "./Pages/MainPage/Main.jsx"
import Quran from "./Pages/Quran/Quran"
import QuranAudio from "./Pages/quran-audio/QuranAudio.jsx"
import Download from "./Pages/quran-audio/Download.jsx"
import PlayerQuran from "./Pages/quran-audio/PlayerQuran.jsx"
import Sura from "./Pages/Quran/Sura"
import SuraContainer from "./Pages/Quran/SuraContainer.jsx"
import Adkar from "./Pages/Adkar/Adkar.jsx"
import Moshaf from "./Pages/moshaf/Moshaf.jsx"
import Books from "./Pages/Books/Books.jsx"
import RightNavbar from "./components/Navbar/RightNavbar.jsx"
import Hadith from "./Pages/Hadith/Hadith.jsx"
import Juza from "./Pages/Quran/Juza.jsx"
import JuzaContainer from "./Pages/Quran/JuzaContainer.jsx"
import NamesOFAllah from "./Pages/theNameOfAllah/NamesOFAllah.jsx"
import Rosary from "./Pages/Rosary/Rosary.jsx"
import ScrollTopTop from "./components/ScroolToTop/ScroolToTop.jsx"
import { BrowserRouter,Routes,Route } from 'react-router-dom';



function App() {

  return (
<BrowserRouter>


 <RightNavbar/>
 <ScrollTopTop/>

   <Routes> 
    {/* Start Quran Routes */}
    <Route path='/quran' element={<Quran/>} exact >

            <Route  index element={<SuraContainer/>}/>
            <Route path=':id' element={<Sura/>}/>
            <Route path='juza' element={<JuzaContainer/>}/>
            <Route path='juza/:id' element={<Juza/>}/>
            <Route path='audio' element={<QuranAudio/>}/>
            <Route  path="download" element={<Download/>}/>
            <Route  path="player" element={<PlayerQuran/>}/>
    </Route>
    {/* End Quran Routes */}


    <Route path='/adkar' element={<Adkar/>}/>
    <Route path='/hadith' element={<Hadith/>}/>
    <Route path='/namesofallah' element={<NamesOFAllah/>}/>
    <Route path='/rosary' element={<Rosary/>}/>
    <Route path='/moshaf' element={<Moshaf/>}/>
    
    </Routes>
</BrowserRouter>
  );
}

export default App;

