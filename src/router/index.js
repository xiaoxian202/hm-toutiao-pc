//初始化路由实例，导出
import Vue from 'vue'
import VueRouter from 'vue-router'
//导入auth
import auth from '@/utils/auth.js'

//登录
const Login = () => import('@/views/login') 
//首页
const Layout = () => import('@/views/Layout.vue') 
// 子页欢迎
const Welcome = () => import('@/views/Welcome')  
// 内容管理
const Article = () => import('@/views/article')  
// 素材管理
const Image = () => import('@/views/image')  
// 发布文章
const Publish = () => import('@/views/publish')  
// 评论管理
const Comment = () => import('@/views/comment')  
// 粉丝管理
const Fans = () => import(/* webpackChunkName: "fans" */ '@/views/fans')  
// 个人设置
const Setting = () => import('@/views/setting')  
// 404
const NoFound = () => import('@/views/404') 

Vue.use(VueRouter)

//初始化路由
const routes = [
    {
        path:"/login",
        component:Login
    },
    {
        path:"/",
        component:Layout,
        children:[
            //欢迎页面
            {
                path:'/',
                component:Welcome
            },
            // 内容管理
            {
                path:'/article',
                component:Article
            },
            // 素材管理
            {path:'/image',component:Image},
            // 发布文章
            {path:'/publish',component:Publish},
            // 评论管理
            {path:'/comment',component:Comment},
            // 粉丝管理
            {path:'/fans',component:Fans},
            // 个人设置
            {path:'/setting',component:Setting}
        ]
    },
    // 最后面，统配规则，404组件
    {
        path:'*',
        component:NoFound
    }
]

//router实例
const router = new VueRouter({
    routes
})

// 导航守卫(每次跳转路由都会执行)
router.beforeEach((to,from,next) => {
    // to即将跳转的路由对象（目标路由对象）
    // from正早来的路有对象（来源路由对象）
    // next()下一步放行，next('地址)拦截，跳转去那
    const user = auth.getUser()
    // 如果不是访问登录并且没有token信息，不能访问其他页面，拦截到登录
    if(to.path !== '/login' && !user.token) return next('/login')
    // 除上面情况，其他一路不管
    next()
})

//导出
export default router