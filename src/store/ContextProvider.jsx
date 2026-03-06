import { useState, useEffect } from "react"
import GloableContext from "./GloableContext"

function ContextProvider({ children }) {
  const [url, setUrl] = useState(localStorage.getItem("currentUrl") || "/quran-aduio")
  const [nameOfQarui, setNameOfQarui] = useState(localStorage.getItem("nameOfQauri") || "")
  const [rewaya, setRewaya] = useState(localStorage.getItem("rewaya") || "")

  // Leacture Video
  const [leactureVideoes, setLeactureVideoes] = useState([])
  const [nameSheihk, setNameSheihk] = useState(localStorage.getItem("nameSheihk") || "")
  const [logoSheuhk, setLogoSheihk] = useState(localStorage.getItem("logoSheihk") || "")

  // audio category 
  const [audioCategory, setAudioCategory] = useState(JSON.parse(localStorage.getItem("audioCategory")) || []);

  // Theme management
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "dark" ? "light" : "dark");
  };

  return (
    <GloableContext.Provider
      value={{
        url, setUrl,
        nameOfQarui, setNameOfQarui,
        rewaya, setRewaya,
        leactureVideoes, setLeactureVideoes,
        nameSheihk, setNameSheihk,
        logoSheuhk, setLogoSheihk,
        audioCategory, setAudioCategory,
        theme, toggleTheme
      }}>
      {children}
    </GloableContext.Provider>
  )
}

export default ContextProvider