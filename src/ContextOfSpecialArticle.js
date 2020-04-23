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

    let text=elem.text//lines
    let code=elem.code//lines

  
    if(!text && !code) return <div className="loads">Loading...</div>
    
    let lines_of_text=[]
    
    if(Array.isArray(text)){
        for(let line of text){
                if(typeof line[0]=='object' && line[0]!=null){
                    
                    let elem=()=>{
                        if(line[0].image){
                            return <div className="image5" key ={Math.random()}><img src={line[0].image} key={Math.random()}/> </div>
                        }else if(line[0].h1){
                           return <h1 class="title_of_art" key={Math.random()}>{line[0].h1}</h1>
                        }
                    }
                    lines_of_text.push(elem())
                }else if(typeof line[0]=='string' && line[0].length>0){
                    lines_of_text.push(<div key={Math.random()}>{line[0]}</div>)
                }
            
        }
    }    

    let lines_of_code=[]
    if(Array.isArray(code)){
        for(let elem of code){
            if(elem){
             if(elem.length>0) lines_of_code.push(<div key={Math.random()}>{elem}</div>)
            }
        }
       
    }
    
    let code1=lines_of_code.length>0 && <div className={"code"}>{lines_of_code}</div>

    array.push (
        <div key={Math.random()}>
                 <div className={'text'} >{lines_of_text}</div>
                 {code1}
         </div>
     )
    }
    
    return array
}
