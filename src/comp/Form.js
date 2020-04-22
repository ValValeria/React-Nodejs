import React from 'react'
import Context from '../context.js'

export default class Form extends  React.Component{
     constructor(props){
         super(props)
         this.name=React.createRef();
         this.password=React.createRef()
         this.email=React.createRef()

         this.state={
             auth:null,
             count:0,
                errors:null,
                mess:null
            
         }
     }   

     some(func){
        func(this.name.current.value,this.email.current.value,this.password.current.value)
        .then((res)=>{
          if(!res)  {
            this.setState({
                errors:"Please , reload the page .Some errors has occured"
            })
          }else{
            this.setState({
                errors:res['error'],
                mess:res['message'] || null
            })
          }
      
        })
     }

     ///https://css-tricks.com/digging-into-react-context/
     render(){
        let can;
      try{
       can =this.context.data.user['name']? true :false
      }catch{
       can=false;
      }
         return(
             <>
            {
                ((this.context.data )&& can )?(<div className="status">Вы зарегестрированы</div>):
                (<div className="login-div">
                <div className="title">Registration</div>
                <div className="fields">
                    <div className="username"><input ref={this.name}type="username" className="user-input" placeholder="username"  min="4" max="20" required/></div>
                    <div className="username"><input ref={this.email}type="email" className="user-input" placeholder="email"  min="4" max="20" required/></div>
                    <div className="password"><input  ref={this.password}type="password" className="pass-input" placeholder="password" min="4" max="20" required /></div>
                </div>
                <div className='messages1'>
                  {(this.state.errors ) &&

                   <li class="list-group-item list-group-item-info">{this.state.errors}</li>
                  }
                   <br/>
                   {(this.state.mess)&&
                   <li class="list-group-item list-group-item-info">{this.state.mess}</li>
                   }
                </div>
                 
                <button className="signin-button" type="submit"onClick={()=>this.some(this.context.action.submit)}>Register</button>
               </div> 
               )
            }
            </>
         )
     }
}

Form.contextType=Context;