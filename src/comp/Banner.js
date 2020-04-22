import React from 'react'
import { Link } from 'react-router-dom'

export default function(){
    return(
       <div className="home-banner">
        <div class=" height_all relative_my">
        <div class=" tw-w-full display_flex ">
             <div class="display_flex">
                 <div class="maxing">
                    <div class="greeting " id="gr">
                        <h2>Web-development</h2>    

                        <h1>ReactJs Tutorials</h1>
                    </div>
                   <div class="buttons nike sa">
                       <Link to="/login" class="orange"  target="_self" id="fk">Узнать больше</Link>
                    </div>
                 </div>
                
             </div>
        </div>
 </div>
 </div> 
    )
}