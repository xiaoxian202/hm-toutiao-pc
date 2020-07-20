// 这是一个基于vue插件，扩展vue功能
import MyBread from "@/components/my-bread"
export default {
    install(Vue) {
        // Vue就是构造函数，将来在main.js使用Vue.use()安装插件传进来的
        // 基于Vue扩展功能，组件，指令，过滤器，原型属性...
        Vue.component(MyBread.name,MyBread)
    }
}