<template>
    <div class="container-article">
        <!-- 搜索区域 -->
        <el-card>
            <!-- 头部 -->
            <div slot="header">
                <!-- 自己封装的插槽组件 -->
                <my-bread>内容管理</my-bread>
            </div>
            <!-- 表单 -->
            <el-form label-width="80px" size="small">
                <el-form-item label="状态">
                    <el-radio-group v-model="reqParams.status">
                        <el-radio :label="null">全部</el-radio>
                        <el-radio :label="0">草稿</el-radio>
                        <el-radio :label="1">待审核</el-radio>
                        <el-radio :label="2">审核通过</el-radio>
                        <el-radio :label="3">审核失败</el-radio>
                        <el-radio :label="4">已删除</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="频道">
                    <el-select v-model="reqParams.channel_id" placeholder="请选择">
                        <el-option label="前端" value="101"></el-option>
                        <el-option label="Java" value="102"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="日期">
                    <el-date-picker
                    v-model="dateArr"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">筛选</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        
    </div>
</template>

<script>
// 导入插槽
import MyBread from '@/components/my-bread'
export default {
    components:{MyBread},
    // Vue.component(组件名称, 组件配置对象)
   // new Vue({components:{组件名称:组件配置对象}})
   // 组件配置对象 name属性
   // 不要和原生的标签（div,span,header,footer,article...）重名，vue会给你报错
    name:'page-article',
    // created() {
    //     //测试
    //     this.$http.get('articles').then((res) => {
    //         console.log(res.data);
    //     }).catch((err) => {
    //         console.log(err);
    //     })
    // },
    data() {
        return {
            reqParams:{
                // 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除
                status:null,
                // 默认查询全部，频道ID
                channel_id:null,
                // 日期范围：开始
                begin_pubdate:null,
                // 日期范围：结束
                end_pubdate:null
            },
            // 支持日期范围组件的数据，当你选择日期范围后分别给 begin和end日期赋值
            dateArr:[]
        }
    }
}
</script>

<style lang="less" scoped>

</style>>
