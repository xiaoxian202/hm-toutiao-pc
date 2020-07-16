// main.js的职责：
// 1.依赖第三方的全局资源
// 2.初始化vue根实例
import Vue from 'vue'
import App from './App.vue'
//依赖element-ui
//引入样式
import ElementUI from 'element-ui'
//引入组件库
import 'element-ui/lib/theme-chalk/index.css'

//导入自己的router模块
//@是在vue-cli中生效的路径别名，具体含义是src目录的绝对路径
// 文件夹下，index.js,index.vue,index.json都是索引文件，默认会
import router from '@/router'

//导入axios
import Axios from 'axios'
//挂载到全局
Vue.prototype.$http = Axios

//注册
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  //挂载路由
  router,
  render: h => h(App)
}).$mount('#app')
