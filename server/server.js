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
const PORT=process.env.PORT||8000
const dir=path.dirname(__dirname)
const index=path.join(dir,'build','index.html')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const multer = require('multer') // v1.0.5
const upload = multer({dest:path.join(path.dirname(__dirname),'public','images')}) // for parsing multipart/form-data



const obj={
    url:null,
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


app.get('/',(req,resp)=>{
    resp.send('Hello')
})
app.listen(PORT,()=>console.log('app is running'))

process.on('uncaughtException', err => {
    console.error('There was an uncaught error', err.message)
 })