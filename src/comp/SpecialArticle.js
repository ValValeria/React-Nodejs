import React from 'react'
import { Link } from 'react-router-dom'
import Context from '../context.js'
import Corusel from './Carusel'
class SpecialArticle extends React.Component{

       constructor(props){
           super(props)
           this.state={
               post: null,
               loads:false,
               count:0,
               message:null
           }   

       }
        
       static getPosts(number){
        if(!number) throw new SyntaxError('Fill in number');
        return fetch('http://localhost:8000/getpost/'+number).then(resp=>resp.json())
       }

       do(){        
        var content=JSON.parse(this.state.post.content)
        var array=[]
        for(let elem of content){
            let text=this.process(elem.text);
            let code=this.process(elem.code);
            array.push({text:text,code:code})
        }
       }
      
       componentDidMount(){
        let find=elem=>elem['id']==this.props.match.params.numberId;
        let cont=this.context.data.posts.length>0 && this.context.data.posts.find(find) 
        if(!cont || !cont.full){//??
            SpecialArticle.getPosts(this.props.match.params.numberId)
            .then(json=>{
                if(!json){
                    this.setState((_state)=>(
                      { message:"Can't find this article "}))
                }
                this.context.posts=json
            })  
        }       
        }
        
       render(){
           let find=elem=>elem['id']==this.props.match.params.numberId;
           let cont=this.context.data.posts.length>0 && this.context.data.posts.find(find) 
   
           let loads=this.state.loads;

           if(!cont || !cont.content){
               loads=true
           }else{
               console.log(typeof cont.content)

                let content;
                if(typeof cont.content=='object'){
                    content=cont.content
                } 
                else if (typeof cont.content=='string'){
                    content=JSON.parse(cont.content)
                }
                else return <div className="loads">Loading...</div>

               var array=[]
               for(let elem of content){//Заголовки
                   let text=elem.text && elem.text.filter(elem=>elem.length>0)//lines
                   let code=elem.code && elem.code.filter(elem=>elem.length>0)//lines
                   
                   if(!text || !code) return <div className="loads">Loading...</div>
                   
                   
                  let   lines_of_text=text.map((elem,index)=>{
                      if(elem[0]) {
                         if(typeof elem[0]=='object'){
                            return elem[0].image ?<div className="image5" key ={index+Math.random()}><img src={elem[0].image} key={index+Math.random()}/> </div>:  (elem[0].h1?<h1 class="title_of_art" key={index+Math.random()}>{elem[0].h1}</h1>:null)
                        } 
                      return elem[0].length>0 && <div key={index+Math.random()}>{elem[0]}</div>
                     }
                 })     
                
                   
                   let lines_of_code= code.map((elem,index)=>{
                       if(elem.length>0) {
                           return <div key={index+Math.random()}>{elem}</div>
                       }
                       return null
                   })
                   array.push(
                    <div key={Math.random()}>
                       <div className={'text'} >{lines_of_text}</div>
                       {code[0] && <div className={'code'}>{lines_of_code}</div>}
                    </div>
                   )
               
               }
            }
           let comp=()=>{
               return(
                <article style={{paddingTop:"40px"}}>
                <Corusel images={cont.images}/>
                <h1 className="headline headline1">{cont.title}</h1>
                <div className="css-124oy3v">
                    {array}
                </div>
                <Link  to ='/'className=" orange or">Обратно</Link>
                </article>
               )
           }
           return (
               <main>
                  
                 <header>
                     
                     {!cont ? <div>Loading</div>:comp()}
                   
                 </header>   
                               
               </main>
           )

       }
}

SpecialArticle.contextType=Context
export default  SpecialArticle