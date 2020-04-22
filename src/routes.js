import SpecialArticle from './comp/SpecialArticle'
import Register from './comp/Register'
import Main from './comp/Main'
import AddPost from './Addpost'
import Author from './comp/Author'
import Login from './comp/Login'
import Error404 from './404'
const routes=[
    {
        path:'/',
        exact:true,
        component:Main
    },
    {
        path:'/post/:numberId',
        exact:true,
        component:SpecialArticle
    },
    {
        path:'/register',
        component:Register
    },
    {
        path:'/addpost',
        component:AddPost
    }
    ,
    {
        path:'/post/author/:id',
        component:Author
    }
    ,
    {
        path:'/login',
        component:Login
    },
    {
        path:'/',
        exact:false,
        component:Error404
    }
]
export default routes