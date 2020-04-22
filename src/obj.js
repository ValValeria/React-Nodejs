
let obj1=(link)=>
{
   let obj={
    data:link.state,
    somecounter:0,
    urlRedirect:null,
    set posts(array){
     if(!Array.isArray(array)) throw new Error('Must be an array')
     link.setState(((state,_props)=>{
      let indexs=array.map(elem=>elem['id'])
      let newarray=state.posts.filter(elem=>!indexs.includes(elem['id']))

      return {posts:newarray.concat(array)}
     }))
    },
    action:{
     login(email,password){
      return fetch('http://localhost:8000/login',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            "password":password,
            "email":email,
        })
    })
    .then(re=>re.json())
    .then(res=>{
      console.log(res)
      if(res.hasOwnProperty('error')){
         link.setState({
           login_error:res['error']
         })
      }else{
         link.setState({
           status:'user',
           user:res['user'],
           login_error:null
         })
      }
      return res
    })
     },
    
     createPost(formdata){
       return fetch('http://localhost:8000/addPost',{
         method: 'POST',
         body:formdata
       })
       .then(res=>res.json())
       .then(json=>{
        let err=json['errors'].join(';')
        let mes=json['mes'].join(';')
        if(json.hasOwnProperty('errors')){
          link.setState({
            post_error:json['errors'].join(';')
          })
       }else{
         link.setState(
           {post_message:json['mes'].join(';')
           }
         )
        }
        return Promise.resolve([err,mes])
       })
       .catch(error=>console.log(error))
     }, 
     submit(name,email,password){
      return fetch('http://localhost:8000/addUser',{
         method:'POST',
         headers: {
             'Content-Type': 'application/json;charset=utf-8',
         },
         body: JSON.stringify({
             "name":name,
             "password":password,
             "email":email,
         })
     })
     .then(re=>re.json())
     .then(res=>{
       if(res.hasOwnProperty('error')){
          link.setState({
            register_error:res['error']
          })
       }else{
         link.setState(
           {status:res.status,
            user:res.user,
            register_error:null,
           }
         )
       }
       return res
     })
     .catch(error=>console.error(error))
    }
  }}
  return obj
}

export default obj1
