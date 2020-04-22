import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Header from './comp/Header'
import Footer from './comp/Footer.js'
import routes from './routes.js'
import Context from './context.js'
import obj from './obj.js'
class  App extends React.Component{
    constructor(props){
      super(props)

      this.state=Object.assign({},this.props.data || window.__initialData__ ||{posts:[],status:null,user:null},{login_error:null,register_error:null,count:0,post_error:null,post_message:null})
      console.log(this.state)
      try{
        if(window){
          delete window.__initialData__
        }
      }catch(e){
        console.log(e.message)
      }     
    }
    getCookie(name) {
      let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));
      return matches ? decodeURIComponent(matches[1]) : undefined;
     }
    componentDidMount(){

       if(this.state.status==null && this.state.count<3){

        if(!Number.isInteger(parseInt(this.getCookie('auth')))) return;
        fetch('http://localhost:8000/get_status_of_user?user_id='+this.getCookie('auth'))
        .then(res=>res.json())
        .then(json=>{
          this.setState({
            status:'user',
            user:json.user,
            count:++this.state.count
          })
        })
        .catch(()=>{console.log('Error')})
        .finally(()=>{
          console.log(this.state)
        })
      }
       
    }
    render(){
     return(
       <Context.Provider value={obj(this)}>
           <Header/>
           <Switch>
             {routes.map((route,index)=> <Route key={index} {...route}/>)}
           </Switch>  
           <Footer/>
       </Context.Provider>    
     )
     }
}

export default App;
