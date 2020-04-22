import React from 'react'
import Context from '../context'
import ProcessContent from '../processContent.js'
export default class CreatePost extends React.Component{
      constructor(props){
          super(props)
          this.headline=React.createRef()
          this.photoes=React.createRef()
          this.content=React.createRef()
          this.state={
             mes:null,
             errors:null
          }
      }
      getCookie(name) {
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
      }
      some(e){
        let formdata=new FormData() 
        formdata.append('headline',this.headline.current.value)
        formdata.append('content',new ProcessContent(this.content.current.value).data)
        for(let file of this.photoes.current.files){
            formdata.append('photoes',file,file.name)
        }
        console.log(new ProcessContent(this.content.current.value).data)
        
        formdata.append('user_id',this.getCookie('auth'))
        this.context.action.createPost(formdata)
        .then((json)=>{
          this.setState({
            errors:json[0] || null,
            mes:json[1]||null
          })
        })
      }
      render(){
          return(
         <div className="login-div" id="create_post" ref={this.form} >
            <div className="title">Создать пост</div>

            <br/>

            <li class="list-group-item list-group-item-info">Если вы хотите выделить код ,
            используйте тег  '{"<code-->Ваш код <--code>"}'  без пробелов.
            <br/>
            Если вы хотите вставить изображение ,
            используйте тег  '{"<img->Ссылка на изображение <-img>"}'  без пробелов
            <br/>
            Если вы хотите выделить заголовок  ,
            используйте тег  '{"<h1->Заголовок <-h1>"}'  без пробелов
            </li>
            <div className="fields">
                <div className="username"><input type="username" className="user-input" placeholder="headline" ref={this.headline} min="4" max="20" required/></div>
                <div className="password"><textarea name="content" className="pass-input" ref={this.content}placeholder="Your post" rows="20" max="500"required ></textarea></div>
            </div>
            <div className="fields">
                    <div className="title" >Your files</div>
                    <div className=""><input type="file" ref={this.photoes} multiple required/></div>
            </div>
            <div className='messages1'>
                    {this.state.errors &&
                       <>
                       <li class="list-group-item list-group-item-info">{this.state.errors}</li>
                       <br/>
                       </>
                    }
                     {this.state.mes &&
                       <>
                       <li class="list-group-item list-group-item-info" dangerouslySetInnerHTML={{__html:this.state.mes}}/>
                       <br/>
                       </>
                    }
            </div>
            <button className="signin-button" type="submit" onClick={(e)=>{this.some(e)}}>Send</button>
        </div> 
          )
      }
      
}
CreatePost.contextType=Context