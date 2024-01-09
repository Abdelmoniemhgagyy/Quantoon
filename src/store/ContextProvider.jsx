import { useState } from "react"
import GloableContext from "./GloableContext"

function ContextProvider({children}) {
    const [url,setUrl] = useState(localStorage.getItem("currentUrl")||"/quran-aduio")
    const[nameOfQarui,setNameOfQarui] = useState(localStorage.getItem("nameOfQauri")||"")
    const[rewaya,setRewaya] =useState(localStorage.getItem("rewaya")||"")

  return (
     <GloableContext.Provider value={{url,setUrl,nameOfQarui,setNameOfQarui,rewaya,setRewaya}}>
        {children}
    </GloableContext.Provider>
  )
}

export default ContextProvider