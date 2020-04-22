let object={
    _posts:[],
    get posts(){
        return this._posts
    },
    set posts(value){
        if(value) this._posts=value
    },
    clicks:0
}

export default object