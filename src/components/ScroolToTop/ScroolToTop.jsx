import { useEffect , useState } from "react";
import "./ScrollTopTop.css"

function ScroolToTop({bottom,zIndex}) {
  const [appear ,setAppear] =useState(false)
console.log(typeof(zIndex))
 
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setAppear(true);
      } else {
        setAppear(false);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


   //scroll To Top
const scrollToTop =()=>{
    window.scroll({
      top:0,
      behavior:"smooth",
    })
    setAppear("false")
  }
  return (
 <div onClick={()=> scrollToTop()} 
 style={{transform:`translateX(${appear ? "0px" : "150%"} ) `, bottom:bottom || " -5px ",zIndex: zIndex===0 ? 0 : 999}}
      className='scroll-to-top '>
    <i className="bi bi-arrow-up scroll-icon "></i>
</div>

  )
}
export default ScroolToTop