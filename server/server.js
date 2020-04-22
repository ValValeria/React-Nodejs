import express from 'express'
import fs from 'fs'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from '../src/App'
import path from 'path'
import {StaticRouter} from  'react-router-dom'
import 'isomorphic-fetch'
import regeneratorRuntime from "regenerator-runtime";
import validator from 'validator'

let app=express()
const dir=path.dirname(__dirname)
const index=path.join(dir,'build','index.html')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const multer = require('multer') // v1.0.5
const upload = multer({dest:path.join(path.dirname(__dirname),'public','images')}) // for parsing multipart/form-data



const obj={
    url:'http://localhost:8000/getposts',
    status:'guest'
};

const user={
    name:null,
    email:null,
    id:null
}
const mysql=require("mysql2").createPool({
    host: "remotemysql.com",
    user: "C5CTjjXhqo",
    password: "Eu6f3raCnq", 
    database: "C5CTjjXhqo",
    port:3306
}).promise(); 

app.use(cookieParser('secret key'));
app.use(bodyParser.json())

function as(id,next){
    if( Number.isInteger(parseInt(id))){
      return   mysql.execute('SELECT name ,email from users where id=?',[id])
       .then(result=>{
           user.name=result[0][0].name
           user.email=result[0][0].email
           user.id=id
           obj.status='user'
       })
       .then(()=>{
           next? next():null
           return user
       })
      
    }else{
        return Promise.resolve()
    }
    
}


app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.use(upload.array('photoes', 12),(req,resp,next)=>{
    let id=req.cookies.auth || req.query.user_id  || req.body.user_id
    resp.set('Access-Control-Allow-Origin', '*');
    
    if(id && !req.path.includes('/login') && !req.path.includes('/adduser')){
        as(id)
        .then(()=>{
            console.log('auth')
            next()
        })
        .catch((e)=>{
            console.log(e.message+"||")
        })
    }else{
        next()
    }
})

app.use("/",(req,resp,next)=>{
    if(req.path.length<1) return next();
    let path1=path.join(path.dirname(__dirname),'public','images')
    let path2=path.join(path.dirname(__dirname),'public')

    let file=fs.existsSync(path.join(path1,req.path)) ? path.join(path1,req.path): path.join(path2,req.path)
    
    if(fs.existsSync(file)){
        resp.sendFile(file)
    }else return next()
 })

app.get('/findQuery',(req,resp)=>{
    console.log('find')

    mysql.execute('SELECT * FROM posts where title  or content LIKE ? ',["%"+req.query.string+"%"])
    .then(res=>{
        if(res[0].length==0)  return [];
        return get_author(res[0])
    })
    .then(result=>{
        console.log('i am here')
        resp.set("Access-Control-Allow-Origin", "*");
        resp.set("Access-Control-Allow-Headers", "X-Requested-With");
        resp.json(result)
        resp.end()
    })
    .catch(error=>{
        console.log(error.message)
    })
})

app.get('/get_status_of_user',(req,resp,next)=>{
    resp.json({user:user})
    resp.end()
    console.log('hhelllo')
})


app.post('/addpost',(req,resp,next)=>{
   // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any

  if(!user.name) return resp.json({"error":'Forbidden'})
   const message={
    errors:[],
    mes:[],
    filenames:""
   }
   resp.set('Access-Control-Allow-Origin', '*');

  Promise.resolve()
  .then(()=>{
      if(!user.name)  {

          message.errors="Forbidden"
          console.log('Forbidden')
          throw new Error()
      }
      return Promise.resolve()
  })
  .then(()=>{
    if(!req.files) {
        messages.errors.push('Invalid file')
        return;
    } 
    let mime=['image/jpeg','image/png','image/jpg']
   
    for  (let file of req.files){
        if(mime.includes(file.mimetype) && file.size<5000000){

            let p=path.join(file.destination,file.originalname);
            try{
            if(fs.existsSync(p)){
                message.filenames+=(file.originalname+",")
                fs.unlinkSync(file.path)
            }else{
                fs.renameSync(file.path,path.join(file.destination,file.originalname))
                message.filenames+=(file.originalname+",")
                message.mes.push('Your file is uploaded')
            }}catch(e){
                console.log(e.message)
            }
            
        }
    }
   
  })
  .then(()=>{
    if(!req.body){
        message.errors.push('invalid data')
        return;
    }
    let str=req.body.headline.length
    let content=req.body.content.length
    if(str.length<3 || str.length>150||content.length<20||content.length>2000 ){
        message.errors.push('Invalid content.')
        throw new Error();
    }
    return Promise.resolve()
  })
  
  .then(()=>{
    if(message.errors.length==0) {
    console.log(message.filenames+"1!!!")

    return mysql.query('insert into posts (title,content,user_id,images) values(?,?,?,?)',[req.body.headline,req.body.content,user.id,message.filenames])    
   
    }
    throw new Error()
  })
  .then((result)=>{
 
     message.mes.push('Your post link is <a href="/post/'+result[0].insertId+'">Link</a>')
  })
  .catch((error)=>{
    console.log(error)
  })
  .finally(()=>{
    resp.json(message)
    resp.end();
   })

})

app.get('/getpost/:number',(req,resp)=>{
    let number=req.params.number;
    mysql.execute('SELECT * FROM posts WHERE id=?',[number])
    .then(res=>{
        if(res[0].length==0) return []
        return get_author(res[0],true)
     })
    .then(result=>{
       resp.set('Access-Control-Allow-Origin', '*');
       resp.json(result)
       resp.end()
    })
    .catch((_error)=>{
        console.log(_error.message)
        resp.status(500)
    })
})
app.get('/logout',(_req,resp)=>{
    resp.clearCookie('auth')
    resp.end()
})



////////////////////////////////
//Where i use user

app.post('/login',(req,resp)=>{
    let json =req.body
    Promise.resolve()
    .then(()=>{
       if(validator.isEmail(json['email']) && validator.isLength(json['email'],{min:4,max:27})){
             if(validator.isLength(json['password'],{min:5,max:20})){
                 return mysql
             }
            throw new Error('Invalid password')
       }
       throw new Error('Invalid email ')
    })
    .then((mysql)=>{
        return mysql.execute('select name ,email from users where email=? and password=?',[json['email'],json['password']])
    })
    .then(([result])=>{
        if(result[0]){
            user.name=json['name']
            user.email=json['email']
            user.id=result[0].insertId
            resp.cookie('auth',user.id)
            resp.json({message:'You are logged in',user:user,status:'user'})
        }else{
            resp.json({error:'Вас нет в нашей базе данных',status:'guest'})
        }
    }
    )
    .catch((error)=>{
        resp.json({error:error.message,status:'guest'})

    })
    .finally(()=>{
        resp.end()
    })
})

app.post('/adduser',(req,resp)=>{
    let json =req.body
    resp.append("Access-Control-Allow-Origin", "*");
    resp.append("Access-Control-Allow-Headers", "X-Requested-With");

    Promise.resolve()
    .then(()=>{
        if(validator.isEmail(json['email']) && validator.isLength(json['email'],{min:4,max:27}) && validator.isLength(json['name'],{min:4,max:20}) ){
            return mysql
        } 
        throw new Error('Invalid email or name ')
    })
    .then((mysql)=>{
        if(validator.isLength(json['name'],{min:4,max:20})){
            if(json['name'].match(/(\d*||\s)/g).filter((elem)=>elem.length>0).length>0){ 
                throw new Error('Invalid name ')

            }
            return mysql
        }
        throw new Error('Invalid name ')
    })
    .then((mysql)=>{
        if(validator.isLength(json['password'],{min:5,max:20})){
            return mysql
        }
        throw new Error('Invalid password ')
    })
    .then((mysql)=>{
        return mysql.execute('select*from users where email=?',[json['email']])
    })
    .then(result=>{
        if(result[0].length>0){
            throw new Error(JSON.stringify("user with such email has already  been in our database"))
        }
    })
    .then(_result=>{
       return  mysql.execute('insert into users(name,email,password)value(?,?,?)',[validator.unescape(json['name']),json['email'],json['password']])
       
    })
    .then((result)=>{
        obj.status="user"
        resp.cookie('auth',result[0].insertId)
        user.name=json['name']
        user.email=json['email']
        user.id=result[0].insertId
        resp.send(JSON.stringify({status:obj.status,user:user,message:"Вы успешно зарегетрировались "}))
    })
    
    .catch(_error=>{
        obj.status="guest"
        resp.send(JSON.stringify({"error": _error.message,"status":obj.status}))
        resp.end()
    })
})


app.get('/getposts',(req,resp)=>{
     mysql.execute('SELECT * FROM posts LIMIT 4')
     .then(res=>{
        if(res[0].length==0) return [];
        return get_author(res[0],false)

     })
     .then(result=>{
        console.log('in getposts end')
        resp.set('Access-Control-Allow-Origin', '*');
        resp.json(result)
        resp.end()
     })
     .catch((_error)=>{
         resp.status(500)
     })
})

app.get('/post/:number',(req,_resp,next)=>{
    obj.url='http://localhost:8000/getpost/'+req.params.number;
    next();
})
app.get('/register',(_req,_resp,next)=>{
    obj.url='http://localhost:8000/getpost/'+req.params.number;
    next();
})
app.get('/post/author/:id',(req,_resp,next)=>{
    obj.url='http://localhost:8000/author/'+req.params.id;
    next();
})

app.get('/author/:id',(req,_resp)=>{
    mysql.execute('SELECT * FROM posts where user_id=?',[req.params.id])
    .then(res=>{
       return get_author(res[0],false)
    })
    .then(result=>{
       console.log("||||")
       _resp.set('Access-Control-Allow-Origin', '*');
       _resp.json(result)
       _resp.end()
    })
    .catch((_error)=>{
        _resp.status(500)
    })
})



function get_author(data,full=true){
    
        return new Promise((resolve,reject)=>as(resolve,reject))

        async function * gen(){
            let count=0;
            for(let post of data){
                 yield({post:post,count:count++})
            }
        }

        async function as(resolve,reject){
            console.log('in as ()-2')
            
            if(data.length==0) return resolve(data);
            let fields=[]
            for await (let post of gen()){
                console.log('in as () -1')

                mysql.execute('SELECT* FROM users where id=?',[post.post.user_id])
                .then(([result])=>{
                    console.log('in as ()')
                    let prop=['password','remember_token','role_id']
                    for(let pr of prop){
                        delete result[pr]
                    }
                    if(full) { fields.push(Object.assign(post.post,{author:result[0]},{full:full}))}
                    else {
                        function * range(end){
                            for(let i=0;i<end;i++){
                                yield i;
                            }
                        }
                        let findtext=()=>{
                        for(let count of range(5)){
                            let  text=JSON.parse(post.post.content)[count].text.find(elem=>typeof elem[0]=="string")[0];
                            if(text) return text;
                        }
                        }
                        post.post.content=[{text:[[findtext()]]}]
                        fields.push(Object.assign(post.post,{author:result[0]},{full:false}))
                    }
                    return Promise.resolve(fields)
                })
                .then((_fields)=>{
                     console.log('in then as()')
                     if(post.count==data.length-1) {
                         console.log('in then as() end')
                         resolve(fields)
                     }
                })
                .catch((e)=>{
                    console.log(e.message)
                    return reject()
                })
            }
        }
    
}



app.get('*',(req,resp,next)=>{
    const mimes=['js','css','jpeg','png','jpg']
    if (mimes.includes(path.extname(req.path).slice(1))) return next();

    fs.readFile(index,'utf8',(error,data)=>{
         console.log(req.url)
         

         fetch(obj.url) .then(res=>res.json()) .then(result=>get_author(result))
         .then(json=>{
            let data_for={posts:json,status:obj.status,user:user};
            if (error!=null){
               return resp.sendStatus(403)       
            }
            let content=ReactDOMServer.renderToString(
            <StaticRouter location={req.url} >
                       <App data={data_for}/>
            </StaticRouter>
            )
            let data_response=data.replace(
                   '<div id="root"></div>',
                   '<div id="root">'+content+'</div>'
            ).replace('<script>window.__initialData__</script>','<script>window.__initialData__= '+JSON.stringify(data_for)+'</script>')
            return  resp.send(data_response)
        })
        .catch(error=>{
            console.log(error)
        })
        .finally(()=>obj.url="http://localhost:8000/getposts")
    })
})



app.use(express.static(path.join(dir,'build')))

app.listen(process.env.PORT ||8000,()=>console.log('app is running'))

process.on('uncaughtException', err => {
    console.error('There was an uncaught error', err.message)
 })