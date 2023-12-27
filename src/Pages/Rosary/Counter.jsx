import React ,{useState} from 'react'
import Img from "../../assest/rosary.png"
import styles from "./Rosary.module.css"
function Counter({daker,img}) {
    const [count, setCount] = useState(0);
  return (
    <div>

<div className={` pt-4 pb-3 px-5 mx-1 text-center  position-relative mt-3 rounded `} style={{width:"350px",maxWidth:"350px"}} >
    <img src={Img} alt=""  style={{width:"240px",maxWidth:"240px"}}/>

    <h3 className={styles.countShow}>{count}</h3>
          
              <button className={styles.counterBtn} 
                   onClick={()=>setCount(count+1)}></button>
           
              <button className={styles.resetBtn}
              onClick={()=>setCount(0)}
              ></button>

              <p className='p-2 bg-primary mt-3 text-white text-center mx-auto rounded '>{daker}</p>

        </div>

    </div>
  )
}

export default Counter