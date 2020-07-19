// 负责axios的配置，导出配置好的axios
import Axios from 'axios'
// 导入auth
import auth from '@/utils/auth'
import router from '@/router'

// 进行axios配置
// 1.配置基准地址
Axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 2.请求头配置 有问题刷新才会执行
// Axios.defaults.headers.Authorization = `Bearer ${auth.getUser().token}` 

// 请求拦截器(每次请求做哪些事情)
Axios.interceptors.request.use(config =>{
    // 在发送请求之前做些什么
    // 给请求头追加token（每次请求前都会做，拿到存储的token)
    // config是配置
    config.headers.Authorization = `Bearer ${auth.getUser().token}`
    return config
},e => {
    // 对请求错误做些什么
    return Promise.reject(e)
})

// 响应拦截器 无效的token 401
Axios.interceptors.response.use(res => {
    return res
},err => {
    // 判断状态码是401，清除本地用户信息，跳转登录页面
    if(err.response && err.response.status === 401) {
        auth.delUser()
        // 跳转 
        // 1.编程式导航this.$router.push('/login/) 此时this不是vue实例
        // 2.$router其实是我们初始化的router的实例 src/router/index.js导出
        // 3.此模块导入路由实例，使用路由实例调用push函数即可
        router.push('/login')
    }
    return Promise.reject(err)
})

// 导出
export default Axios