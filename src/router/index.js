//初始化路由实例，导出
import Vue from 'vue'
import VueRouter from 'vue-router'
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

//导出
export default router