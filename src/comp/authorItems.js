import React ,{useReducer,useContext}from 'react'
import Next from './arr/Next'
import Prev from './arr/Prev'
import Card from './Card'


function InitialState(){
    return {
        start:0,
        end:2,
        length:2,
        postsLength:0
    }
}
function reducer(state,action){
    let length=action.length || state.postsLength
    switch(action.type){
        case'next':
        if(state.end>length-1){
            return ({
                start:0,
                end:2,
                postsLength:length,
                length:2
            })
        }
            return  {
                start:state.start+state.length ,
                end:state.end+state.length ,
                postsLength:length,
                length:2
                }

        case 'prev':

            if(state.start<=0){
                return ({
                    start:0,
                    end:2,
                    postsLength:length,
                    length:2
                })
            }
            return {
               start:state.start-state.postsLength ,
               end:state.end-state.postsLength ,
               postsLength:length,
               length:2
              }
       default:
           throw new Error('You cant')
    }
}
export default function(props){
    //PostLlength
    ///Data
    const [state,dispatch]=useReducer(reducer,InitialState())
    
    console.log(state)
    let elem=props.data.map((elem,index)=>{
        let text;
        
        if(typeof elem['content']=='string'){
          text=JSON.parse(elem['content'])
        }else if (typeof elem['content']=='object'){
          text=elem['content']
        }else return <div>Loading</div>
        
        function * arg(end){
            for(let start=0;start<end;start++){
                yield  start
            }
        }
        let text1;
        for(let number of arg(3)){
            if(!number>text.length-1) {
                text1=text[number].text.find(elem=>!Array.isArray(elem[0])&&elem[0].length>1)[0]
            }
        }
    
        return  <Card key={index} images={elem.images}title={elem['title']} text={text1} id={elem['id']} author={elem['author']}/>
    })

    let arrow=()=>{
        return(
    <>        
    { [elem.slice(state.start,state.end)]}
    <div className='next next1 ne' onClick={()=>dispatch({type:'next',length:props.postsLength})} >
            <Next/>
   </div>

   <div className='prev next1 pr'onClick={()=>dispatch({type:'prev',length:props.postsLength})} >
             <Prev />
   </div>
    </>
     )}

   return(
    arrow()
   )
}