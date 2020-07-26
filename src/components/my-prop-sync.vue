<template>
    <!-- 属性 sync 修饰作用 -->
    <div class="my-prop-sync">
        使用sync双向绑定的mySync:
        <b>{{mySync}}</b>
        <button @click="fn">子组件产出数据给父组件</button>
    </div>
</template>

<script>
export default {
    name:'my-prop-sync',
    props:['mySync'],
    methods:{
        fn() {
            this.$emit('update:mySync','子组件数据')
        }
    }
}
</script>

<style lang="less" scoped>

</style>