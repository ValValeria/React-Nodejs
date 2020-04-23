import React from 'react'
import Context from '../context.js'
import NotFound from '../NotFoundItem'
import AuthorItem from './authorItems'

export default class Author extends React.Component{
    constructor(props){
        super(props)
        this.state={
            loads:false,
            postsLength:0

        }
    }
   
   
    componentDidMount(){
                console.log(this.props)
                fetch(window.location.origin+'/author/'+this.props.match.params.id)
                .then(resp=>resp.json())
                .then(json=>{
                    this.context.posts=json
                    if(json){
                        this.setState((_state,_props)=>{
                            return {
                                loads:false,
                                postsLength:json.length
                            }              
                        })
                    }
                 
                })                     
    }
    render(){
     
        let find=elem=>elem['author']['id']==Number(this.props.match.params.id);
        let data=this.context.data.posts && this.context.data.posts.filter(find)
        let loads=this.state.loads
        
        if(data.length==0){
          loads=true
        }
        return (
            <main className="pad_top_30">

             <div className="fl_wrap al_cn j_center fl_cl">
             {loads &&
            <div>Loading...</div>   
            }
            {!loads &&
            <> 
               <h1 className="myblog">My blog  </h1>

               <div className="fl_wrap al_cn j_center blog1">
                   <AuthorItem postsLength={this.state.postsLength} data={this.context.data.posts}/>
               </div>

            </>   
            }
            </div>   
            </main>
        )
    }
}
Author.contextType=Context