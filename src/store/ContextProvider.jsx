import { useState } from "react"
import GloableContext from "./GloableContext"

function ContextProvider({children}) {
    const [url,setUrl] = useState(localStorage.getItem("currentUrl")||"/quran-aduio")
    const[nameOfQarui,setNameOfQarui] = useState(localStorage.getItem("nameOfQauri")||"")
    const[rewaya,setRewaya] =useState(localStorage.getItem("rewaya")||"")

// Leacture Video
    const [leactureVideoes,setLeactureVideoes] = useState([])
    const [nameSheihk,setNameSheihk] = useState(localStorage.getItem("nameSheihk")||"")
    const [logoSheuhk,setLogoSheihk ]= useState(localStorage.getItem("logoSheihk")||"")

// audio category 
const [audioCategory, setAudioCategory] = useState(JSON.parse(localStorage.getItem("audioCategory"))||[]);

  return (
     <GloableContext.Provider 
     value={{url,setUrl,
     nameOfQarui,setNameOfQarui,
     rewaya,setRewaya,
     leactureVideoes,setLeactureVideoes,
     nameSheihk,setNameSheihk,
     logoSheuhk,setLogoSheihk,
     audioCategory,setAudioCategory,
     // audioCategoryName,setAudioCategoryName,
     // audioCategoryLogo,setAudioCategoryLogo,
    }}>
        {children}
    </GloableContext.Provider>
  )
}

export default ContextProvider