<template>
    <!-- 频道插件 -->
    <!-- ：value,不能使用v-model因为他只能读取数据不能修改 -->
    <el-select @change ="changeChannel" clearable :value="value" placeholder="请选择">
        <el-option 
        v-for="item in channelOptions"
        :key="item.id"
        :label="item.name"
        :value="item.id">
        </el-option>
    </el-select>

</template>

<script>
export default {
    name:'my-channel',
    // 父传子 接值,prop中值的用法跟data中一样
    props:['value'],
    data() {
        return {
            // 频道id
            // channel_id:null,
            // 频道列表
            channelOptions:[]
        }
    },
    created() {
        this.getChannelOptions()
    },
    methods:{
        // 获取频道数据
        async getChannelOptions() {
            const res = await this.$http.get('channels')
            // console.log(res.data);
            this.channelOptions = res.data.data.channels
        },
        // 选择频道
        // 清空select选择器时会触发该函数
        changeChannel(val) {
            // val:目前的选中值
            // 如果清空，val是''会报错可以设置null
            if(val==='') val = null
            // console.log(val);
            // 子传父，传值
            this.$emit('input',val)
        },
    }
}
</script>

<style lang="less" scoped>

</style>