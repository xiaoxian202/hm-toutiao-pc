//初始化路由实例，导出
import Vue from 'vue'
import VueRouter from 'vue-router'
//导入auth
import auth from '@/utils/auth.js'

//登录
import Login from '@/views/login'
//首页
import Layout from '@/views/Layout.vue'
// 子页欢迎
import Welcome from '@/views/Welcome'
// 内容管理
import Article from '@/views/article'
// 素材管理
import Image from '@/views/image'
// 发布文章
import Publish from '@/views/publish'
// 404
import NoFound from '@/views/404'

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
            {path:'/publish',component:Publish}
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