<template>
  <div class="container-coma">组件a{{msg}}</div>
</template>

<script>
// 导入eventBus
import eventBus from '@/eventBus'
export default {
    name:'com-a',
    data() {
        return {
            msg:"A组件数据"
        }
    },
    created() {
        // 通过事件总线绑定事件
        eventBus.$on('b2a',data => {
            this.msg = data
        })
    }
}
</script>

<style lang="less" scoped>

</style>