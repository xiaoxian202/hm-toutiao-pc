<template>
    <div class="container-welcome">
        <!-- 访问vuex共享数据，$store在vue实例下都可以使用 -->
        <!-- {{$store.state.globalMsg}} -->
        <!-- <button @click="fn">改vuex数据</button> -->
        <img src="../../assets/welcome.jpg" alt="">
    </div>
</template>

<script>
export default {
    name:'page-welcome',
    // methods:{
    //     fn() {
    //         //改vuex数据 
    //         this.$store.commit('updateGlobalMsg','修改vuex共享数据')
    //     }
    // }
}
</script>

<style lang="less" scoped>
    .container-welcome {
        display: block;
        margin: 50px auto 0;
    }
</style>