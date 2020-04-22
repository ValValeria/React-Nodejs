import React from 'react'

export default class ErrorBound extends React.Component{
    constructor(props){
        super(props)
        this.state={
            hasError:false
        }
    }
    static getDerivedStateFromError(error){
        console.log(error.message)
        return {hasError:true}
    }   
    render(){
        return this.state.hasError?<div>Some error occured</div> :this.props.children
    }       
}