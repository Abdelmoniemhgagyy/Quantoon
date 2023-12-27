import React, { useEffect, useState } from 'react';

import Main from "./Pages/MainPage/Main"
import Quran from "./Pages/Quran/Quran"
import Sura from "./Pages/Sura/Sura"
import  Adkar from "./Pages/Adkar/Adkar.jsx"
import Books from "./Pages/Books/Books.jsx"
import RightNavbar from "./components/Navbar/RightNavbar.jsx"
import Hadith from "./Pages/Hadith/Hadith.jsx"
import Juza from "./Pages/juza/Juza.jsx"
import NamesOFAllah from "./Pages/theNameOfAllah/NamesOFAllah.jsx"
import Rosary from "./Pages/Rosary/Rosary.jsx"
import { BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {

  return (
<BrowserRouter>


<RightNavbar/>

   <Routes>    
      <Route path='/' element={<Main/>}/>
    <Route path='/quran' element={<Quran/>} exact >
    </Route>
      <Route path='quran/sura/:id' element={<Sura/>}/>
      <Route path='quran/juza/:id' element={<Juza/>}/>
    <Route path='/sura' element={<Sura/>}/>
    <Route path='/adkar' element={<Adkar/>}/>
    <Route path='/hadith' element={<Hadith/>}/>
    <Route path='/namesofallah' element={<NamesOFAllah/>}/>
    <Route path='/rosary' element={<Rosary/>}/>
    
    </Routes>
</BrowserRouter>
  );
}

export default App;


// import Axios from "./FetchData"
// import "./i18n"
// import { useTranslation } from 'react-i18next';
 // const [t,i18n]=useTranslation('')
  //  {/* <Axios/>
  //   <div style={{textAlign:i18n.language ==="ar"&&"right"}}>
  //     <h1>{t('title')}
  //    </h1>
  //    <h3>{t("logo")}</h3>
  //    </div>
  //    <div style={{textAlign:"center",margin:"20px auto",width:"100%"}}>
  //         {i18n.language === "ar"&&<button onClick={()=>i18n.changeLanguage("en")}>
  //           En
  //         </button>}
          
  //         {i18n.language === "en"&&<button onClick={()=>i18n.changeLanguage("ar")}>
  //           Ar
  //         </button>}
  //    </div>
  //   */}