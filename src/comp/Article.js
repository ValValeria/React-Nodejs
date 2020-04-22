import React,{useState} from 'react'
import { Link } from 'react-router-dom'


export default function Article(props){
    let obj=props.author.id
    var array=<div className={'text'} key={Math.random()}>{props.content}</div>

    

     return(
        <article className={'art'}>
         
            <div>
             <h1 className="headline headline1 headlin2">{props.title}</h1>
             <div className="css-124oy3v">
                 {array}
             </div>
             <div className="tags" style={{margin:"10px 0"}}>
               Author: 
                 <Link  to ={"/post/author/"+obj} style={{marginLeft:"10px"}}>{props.author.name}</Link>
             </div>
             <div class="buttons nike sa doro ">
                 <Link  to ={"/post/"+props.id}className="links_b  ks dods" id="fk">Читать</Link>
             </div>
            </div>
          
        </article>
     )
}