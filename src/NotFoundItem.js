import React from 'react'

export default function(props){
  return(
  <div className="all_center fl_cl">
    <h1 className="error404">{props.text? props.text :"Данной страницы не существует"}</h1>
    <br/>
    <div>
        <img src="https://www.google.com/images/errors/robot.png"/>
    </div>
  </div>
  )
}