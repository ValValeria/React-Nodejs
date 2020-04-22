import React from 'react'
import { Link } from 'react-router-dom'

export default function (props){
    return (
<div className="card card1" >
  <div className="card-body  fn_black">
    <h5 className="card-title">{props.post.title}</h5>
    {props.post.id &&
        <button type="button" class="btn btn-warning">    <Link to ={'/post/'+props.post.id} className="card-link">Read</Link>
        </button>
    }

  </div>
</div>
    )
}