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
            }
        ]
    },
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