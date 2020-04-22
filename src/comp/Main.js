import React from 'react'
import Context from '../context.js'
import Article from './Article'
import Banner from './Banner'

import AboutUs from './about.js'
import Art from '../articleWithData'
class Main extends React.Component{
        constructor(props){
            super(props)
                       
            this.state={
                length_posts:null,
                loads:false,
                count:0,
                slider:0
            }
        }
        static getPosts(){
            return fetch('http://localhost:8000/getposts').then(resp=>resp.json())
        }
        static getDerivedStateFromProps(_props, state){
            console.log(state.slider)
            console.log(state.length_posts)

            if(!state.length_posts) return null;
            if(state.slider<0 ){
              return {slider:state.length_posts-1}
            }else if(state.length_posts-1<state.slider){
              return {slider:0}
            }
            return null;
        }

        componentDidMount(){
                if(this.context.data.posts.length<=1 && this.state.count<2){
                    Main.getPosts()    
                    .then(json=>{
                        if(json){
                            this.context.posts=json;
                        }
                        this.setState((_state,_props)=>{
                            return {
                                count:++_state.count,
                                length_posts:this.context.data.posts.length
                            }              
                        })
                    })                 
                }
                this.setState({
                    length_posts:this.context.data.posts.length
                })
                console.log(this.context.data.posts.length)
                  
        }         
        next(){
         this.setState({
             slider:this.state.slider+1
         })
        }
       
        prev(){
            this.setState((prevState,_prevprops)=>{
             return {slider:prevState.slider-1}
            })
            console.log(this.state.slider)
        }
        render(){

            let map=function(elem,index,array){
                let content=elem['content']

                if(typeof content=="string"){
                   content=JSON.parse(content)
                }
                else if(typeof content!=='object'){
                    return null
                }
                let  text= content[0].text[0][0]
                return (<Article key={index} index={index+1}maxElem={array.length} title={elem['title']} content={text} id={elem['id']} hasNext={array[index+1]? true :false} hasPrev={array[index-1]? true :false}author={elem['author']}/>)
            };

            let articles=this.context.data.posts.length>0 ? this.context.data.posts.map(map) :null

            let el=<Art articles={articles} state={this.state} next={this.next.bind(this)} prev={this.prev.bind(this)}/>


            let loads=this.state.loads
            if(!articles){
               loads=true
            }
            return(
             <main>
                 <Banner/>
                 <AboutUs/>

                 {loads? <div style={{textAlign:'center',margin:"20px"}} >Loading...</div>:  el
                 }
             </main>
            )
        
        }
}

Main.contextType=Context

export default  Main