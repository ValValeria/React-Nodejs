import React from 'react'
import { Link } from 'react-router-dom'
import Context from '../context.js'
import Corusel from './Carusel'
import Content from '../ContextOfSpecialArticle'
class SpecialArticle extends React.Component{

       constructor(props){
           super(props)
           this.state={
               post: null,
               loads:false,
               count:0,
               message:null
           }   
           this.back=this.back.bind(this)

       }
        
       static getPosts(number){
        if(!number) throw new SyntaxError('Fill in number');
        return fetch(window.location.origin+'/getpost/'+number).then(resp=>resp.json())
       }

       
       componentDidMount(){
        let find=elem=>elem['id']==this.props.match.params.numberId;
        let cont=this.context.data.posts.length>0 && this.context.data.posts.find(find) 
        console.log(cont)
        if(!cont || !cont.full){//??
            SpecialArticle.getPosts(this.props.match.params.numberId)
            .then(json=>{
                if(!json){
                    this.setState((_state)=>(
                      { message:"Can't find this article ",
                      loads:false
                    }))
                }
                this.context.posts=json
            })  
        }       
        }
        
       back(){
           console.log('back')
           let i=this.props.history.go(-1)
           console.log(i)
       } 
       render(){
           let find=elem=>elem['id']==this.props.match.params.numberId;
           let cont=this.context.posts.find(find) 
   
           let loads=this.state.loads;

           if(!cont || !cont.content ){
               loads=true
               console.log(1+'usu')
           }else{
                console.log(2+'usu')
            
                console.log(JSON.stringify(cont.content)+'usu')

                var array=<Content content={this.context.posts.find(find) }/>
                
            }
           let comp=()=>{
               return(
                <article style={{paddingTop:"40px"}} class={'spcArt'}>
                <Corusel images={cont.images}/>
                <h1 className="headline headline1">{cont.title}</h1>
                <div className="css-124oy3v">
                    {array}
                </div>
                <button  to ='/'className=" orange or" onClick={this.back}>Обратно</button>
                </article>
               )
           }
           return (
               <main>
                  
                 <header>
                     
                     {loads ? <div className="loads">Loading</div>:comp()}
                   
                 </header>   
                               
               </main>
           )

       }
}

SpecialArticle.contextType=Context
export default  SpecialArticle