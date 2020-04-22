import React ,{useEffect,useState}from 'react'
import { Link } from 'react-router-dom'
import Search from './Search.js'
export default function(){
    const obj={
        class:'',
        menu:'none'
    }
    try{
    if(window.innerWidth<1050){
        obj.class='none'
        obj.menu=""
    }
   }catch(e){
       console.log(e.message)
   }
    const [state,updateState]=useState(obj)
    let resize=()=>{
        if(window.innerWidth<1050){
            updateState({class:'none',menu:''})
        }else{
            updateState({class:'column',menu:'none'})
        }
    }
    let click=()=>{
        let obj={class:'',menu:''}
        if(!state.class){
            obj={class:'none',menu:''}
        }
        updateState(obj)

    }
   
    useEffect(()=>{
       
        window.addEventListener('resize',resize)
    })

    let cl='head_ul '.concat(state.class)

    return (
        <header className="head_header " >
            <h1 className="css-184keb2"><Link to ='/' >MyBlog</Link></h1>
            <div className={state.menu} id="menubox" onClick={click}>
                    <svg className="bi bi-filter-left" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                         <path fillRule="evenodd" d="M2 10.5a.5.5 0 01.5-.5h3a.5.5 0 010 1h-3a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z" clipRule="evenodd"/>
                    </svg>      
            </div>
            <ul className={cl}>
               
               <li><Link to ='/' >Home</Link></li>
               <li><Link to ='/post/author/21'>Blog</Link></li>
               <li><Link to ='/register'>Registration</Link></li>
               <li><Link to ='/login'>Login</Link></li>
               <li><Link to ='/addpost'>Add a post </Link></li>
               <li><Search/></li>
           </ul>
        </header>   
    )

}

