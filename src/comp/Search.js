import React,{ useState,useRef} from 'react'
import SearchItem from './searchItem'


export default function (props){
   
    const [state,dispatch]=useState({posts:[],visible:'block',message:null})
    const li=state.posts.map((elem,index)=>{
       return  <SearchItem key={index} post={elem}/>
    })
    const ref=useRef()
    let reducer=async ()=>{  
            if(ref.current.value.length>0){

                let response =await fetch('/findQuery/?string='+ref.current.value)
                if(response.ok){
                   let json=await response.json();
                   if(json.length==0){
                     dispatch({message: json,posts:[{title:'No results',id:null}]});
                   }else{
                   dispatch({posts: json,visible:'block',message:null});
                   }
                }
            }
     }
     let cal=()=>{
        console.log('leave')
         if(state.posts.length>0){
            dispatch({posts:[]})
         }
     }
    return (
     <div className="pos_rel "  onMouseLeave={cal} >
        <div class="input-group mb-3 ss">
          <input type="text" class="form-control" ref={ref}aria-label="Recipient's username" aria-describedby="basic-addon2"/>
          <div class="input-group-append">
            <button type="button" class="btn btn-primary"  onClick={reducer}>Search</button>
          </div>

        </div>
        
          <div className="pos_ab searchItem"  onMouseLeave={cal}>
           { li}
          </div>
    </div>
    )
}