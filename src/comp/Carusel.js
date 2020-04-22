import React from 'react'

export default function(props){

    let im=props.images && props.images.split(',').map((url,index)=>(
        <div  className="carousel-item active" key={index}>       
          <img src={'/images/'+url} className="d-block w-100 tw" alt="..."/>
        </div>
    )).slice(0,-1) 
    return(
 <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
  <div className="carousel-inner">
     {im}
  </div>
  <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    { im.length>1 &&
       <>
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
       </> 
    }
   
  </a>
  <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    { im.length>1 &&
       <>
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
       </> 
    }
  </a>
</div>
    )
}