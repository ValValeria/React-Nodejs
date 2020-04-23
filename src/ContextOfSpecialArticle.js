import React from 'react'
export default function(props){
    let array=[]
    let content=[]
    console.log(typeof props.content)
    console.log(props.content)
    if(typeof props.content.content=='object'){
        content=props.content.content
    } 
    else if (typeof props.content.content=='string'){
        content=JSON.parse(props.content.content)
    }

    for(let elem of content){//Заголовки

    console.log('in content special article')

    let text=elem.text && elem.text.filter(elem=>elem.length>0)//lines
    let code=elem.code && elem.code.filter(elem=>elem.length>0)//lines

    console.log(text)
    console.log(code)

    if(!text && !code) return <div className="loads">Loading...</div>
    

   let   lines_of_text=text? text.map((elem,index)=>{
       if(elem[0]) {
          if(typeof elem[0]=='object'){
             return elem[0].image ?<div className="image5" key ={index+Math.random()}><img src={elem[0].image} key={index+Math.random()}/> </div>:  (elem[0].h1?<h1 class="title_of_art" key={index+Math.random()}>{elem[0].h1}</h1>:null)
         } 
       return elem[0].length>0 && <div key={index+Math.random()}>{elem[0]}</div>
      }
  }) :null 
 
    
    let lines_of_code=code ? code.map((elem,index)=>{
        if(elem.length>0) {
            return <div key={index+Math.random()}>{elem}</div>
        }
    }):null
    let code1=<div className={"code"}>{lines_of_code}</div>
    array.push (
        <div key={Math.random()}>
                 <div className={'text'} >{lines_of_text}</div>
                 {code1}
         </div>
     )
    }
    
    return array
}
