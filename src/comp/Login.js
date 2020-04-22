import React from 'react'
import Context from '../context.js'

export default class Login extends React.Component{
    constructor(props){
       super(props)
       this.password=React.createRef()
       this.email=React.createRef()
       this.state={
           errors:null,
           mess:null
       }
    }
    some(){
        this.context.action.login(this.email.current.value,this.password.current.value)
        .then((res)=>{
          this.setState({
              errors:res['error'],
              mess:res['message'] || null
          })
        })
    }
    render(){
        let can;
        try{
         can =this.context.data.user['name']? true :false
        }catch{
         can=false;
        }
       return (
           <main className="main all_center">
           <>
            {
                (this.context.data  && can)?(<div  className="status">Вы зарегестрированы</div>):
                (<div className="login-div">
                <div className="title">Login</div>
                <div className="fields">
                    <div className="username"><input ref={this.email}type="email" className="user-input" placeholder="email"  min="4" max="20" required/></div>
                    <div className="password"><input  ref={this.password}type="password" className="pass-input" placeholder="password" min="4" max="20" required /></div>
                </div>
                <div className='messages1'>
                    {this.state.errors &&
                       <>
                       <li class="list-group-item list-group-item-info">{this.state.errors}</li>
                       <br/>
                       </>
                    }
                     {this.state.mess &&
                       <>
                       <li class="list-group-item list-group-item-info">{this.state.mess}</li>
                       <br/>
                       </>
                    }
                </div>
                 
                <button className="signin-button" type="submit"onClick={()=>this.some()}>Login</button>
               </div> 
               )
            }
            </>

           </main>
       )
    }
}
Login.contextType=Context