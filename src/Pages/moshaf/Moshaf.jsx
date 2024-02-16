import React from 'react'
import OneMoshaf from "./OneMoshaf"
import Moshafs from "../../data/moshaf/moshaf" 
function Moshaf() {

// const handleKeyDown = (e) => {
//   console.log(e.keyCode)
//   if (e.keyCode === 39) {
//     nextPage();
//   }
//   else if (e.keyCode === 37){
//     prevPage()
//   }
// }
// useEffect(() => {
//   document.addEventListener('keydown', handleKeyDown);
// }, []);

  return (
    <>
    {Moshafs.map((moshaf)=>(
          <OneMoshaf  key={moshaf.id} 
                      Src={moshaf.url} 
                      name={moshaf.name}
                      typeImg={moshaf.typeImg}
                      fahrs={moshaf.fahrs}
          />
    ))}
    </>
  )
}

export default Moshaf