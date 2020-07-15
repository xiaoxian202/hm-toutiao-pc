//初始化路由实例，导出
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'

Vue.use(VueRouter)

//初始化路由
const routes = [
    {
        path:"/login",
        component:Login
    }
]

//router实例
const router = new VueRouter({
    routes
})

//导出
export default router