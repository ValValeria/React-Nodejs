import React from 'react'
import Next from './comp/arr/Next'
import Prev from './comp/arr/Prev'
export default  function(props){
    return(
        <>
        <h1 className="headline1 txt_center mar_20px our_posts_title">Наши посты</h1>

        <div className='slider'>
           <div className="sayh" >
              
              {props.articles[props.state.slider]}
              <div className='next' onClick={()=>props.next()} >
                <Next/>
               </div>

               <div className='prev'onClick={()=>props.prev()} >
                 <Prev />
               </div>

           </div>
       </div> 
       </>
    )
}