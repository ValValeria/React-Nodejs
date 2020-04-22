import React from 'react'
import Context from './context.js'
import { Link } from 'react-router-dom'
import CreatePost from './comp/CreatePost'
export default class Addpost extends React.Component{
      render(){
       return(
        <main className="all_center">   
        <Context.Consumer>
           {
               ({data})=>{
                 if(data.status=="user"){
                     return(
                         <CreatePost/>
                     )
                 }else{

                    return (
                        <div className="login-div" style={{width:'max-content',height:'auto'}}>Пожалуйста ,<Link to ='/register'>зарегестрируйтесь</Link> или  ввойдите ,чтобы добавить пост</div>
                    )
                 }
               }
           }
        </Context.Consumer>
        </main>
          )
      }
}
