import { useEffect , useState } from "react";

function ScroolToTop({bottom}) {
  const [appear ,setAppear] =useState(false)
 
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
 <div onClick={()=> scrollToTop()} style={{transform:`translateX(${appear ? "0px" : "150%"} )`,bottom:bottom}} className='fixed bottom-[5px]
    right-1  md:right-2 bg-[#16408b] rounded-full p-2 transition duration-500 '>
    <i className="bi bi-arrow-up cursor-pointer text-xl text-white "></i>
</div>

  )
}

export default ScroolToTop