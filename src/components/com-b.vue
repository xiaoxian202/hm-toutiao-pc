<template>
  <div class="container-comb">
      组件b
      <button @click="fn">b2a</button>
    </div>
</template>

<script>
// 导入eventBus
import eventBus from '@/eventBus'
export default {
    name:'com-b',
    data() {
        return{
            tip:'B组件数据'
        }
    },
    methods:{
        fn() {
            eventBus.$emit('b2a',this.tip)
        }
    }
}
</script>

<style lang="less" scoped>

</style>