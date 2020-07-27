// 管理组件间共享的数据
// 导出一个vuex实例
import Vuex from 'vuex'
import Vue from 'vue'
// 注册
Vue.use(Vuex)

// 初始化
const store = new Vuex.Store({
    // state声明共享数据
    state:{
        globalMsg:'vuex共享数据'
    },
    // 声明改数据的函数，state中的数据不能直接修改
    mutations:{
        // data传递的数据
        updateGlobalMsg(state,data) {
            // state.globalMsg = '修改vuex共享数据'
            state.globalMsg = data
        }
    }
})

// 导出
export default store