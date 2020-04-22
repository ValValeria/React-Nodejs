import React from 'react'
import { Link } from 'react-router-dom'

export default function(props){
      
  
    return(

<article className={'art'}>
         
         <div>
          <h1 className="headline headline1">{props.title}</h1>
          <div className="css-124oy3v">
              {props.text}
          </div>
          <div className="tags" style={{margin:"10px 0"}}>
            Author: 
              <Link  to ={"/post/author/"+props.author.id} style={{marginLeft:"10px"}}>{props.author.name}</Link>
          </div>
          <div class="buttons nike sa doro doro1">
              <Link  to ={"/post/"+props.id}className="links_b  ks dods" id="fk">Читать</Link>
          </div>
         </div>
       
     </article>
    )
}