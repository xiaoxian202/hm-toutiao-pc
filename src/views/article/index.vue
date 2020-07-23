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
                    <!--插件 -->
                    <!-- :value="reqParams.channel_id" @input="reqParams.channel_id=$event"
                    是v-model的语法糖写法 -->
                    <my-channel v-model="reqParams.channel_id"></my-channel>
                </el-form-item>
                <el-form-item label="日期">
                    <el-date-picker
                    v-model="dateArr"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="changeDate"
                    value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">筛选</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <!-- 结果区域 -->
        <el-card style="margin-top:20px">
            <div slot="header">根据筛选条件共查询到 {{total}} 条数据:</div>
            <!-- 表格 -->
            <el-table :data="articles">
                <el-table-column label="封面">
                    <template slot-scope="scope">
                        <el-image :src="scope.row.cover.images[0]" style="width:180px;height:120px">
                            <div slot="error" class="image-slot">    
                                <img src="../../assets/error.gif" alt="" style="width:180px;height:120px">
                            </div>
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column label="标题" prop="title" width="400px"></el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
                        <el-tag v-if="scope.row.status===1" >待审核</el-tag>
                        <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
                        <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
                        <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="发布时间" prop="pubdate"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" circle plain @click="toEdit(scope.row.id)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" circle plain @click="delArticle(scope.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 
                background-添加背景色，默认是flase
                layout-组件布局 上一页，页码按钮，下一页
                total-总条数，默认一页10条
            -->
            <el-pagination 
                style="margin-top:20px"
                background
                layout="prev, pager, next"
                :page-size="reqParams.per_page"
                :current-page="reqParams.page"
                @current-change="changePage"
                :total="total">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
// 导入插槽
// import MyBread from '@/components/my-bread'
export default {
    // components:{MyBread},
    
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
                end_pubdate:null,
                // 页码
                page:1,
                // 每页条数
                per_page:20
            },
            // 支持日期范围组件的数据，当你选择日期范围后分别给 begin和end日期赋值
            dateArr:[],
            // 文章数组
            articles:[],
            // 频道选项
            channelOptions:[],
            // 总条数
            total:0
        }
    },
    // 初始化拿到数据
    created() {
        this.getArticles()

    },
    methods:{
        // 获取文章数据
        async getArticles() {
            const res = await this.$http.get('articles',{params:this.reqParams})
            // console.log(res);
            // 文章列表
            this.articles = res.data.data.results
            // 总条数
            this.total = res.data.data.total_count
        },
        // 切换分页
        changePage(newPage) {
            this.reqParams.page = newPage
            this.getArticles()
        },
        // 筛选 删除状态查询后台不支持
        search() {
            this.reqParams.page = 1
            this.getArticles()
        },
        // 选择日期
        changeDate(arr) {
            //用户确认选定的值时触发
            // 组件绑定值。格式与绑定值一致，可受 value-format 控制
            // arr是数组[起始日期，结束日期]
            // 注意1：后台需要的日期格式是2019-10-01字符串格式
            // 组件支持日期格式
            // 注意2：清空日期时会触发该函数，arr数组是null
            if (arr) {
                this.reqParams.begin_pubdate = arr[0]
                this.reqParams.end_pubdate = arr[1]
            } else {
                this.reqParams.begin_pubdate = null
                this.reqParams.end_pubdate = null
            }
        },
        // 去编辑
        toEdit(id) {
            this.$router.push({
                path:'/publish',
                query:{
                    id
                }
            })
        },
        // 删除文章 测试的数据不能删除，可以在自己的账号中删除
        delArticle(id) {
            this.$confirm('此操作将永久删除该文章, 是否继续?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {  
                //点击确认
                // 考虑异常情况
                // 注意:1.测试账户的文章数据，不能删除
                // 2.请求成功，后台没有相应数据
                try {
                    // 删除文章
                    await this.$http.delete(`articles/${id}`)
                    //成功 提示
                    this.$message.success('删除文章成功');
                    // 刷新列表
                    this.getArticles()
                } catch (error) {
                    // 失败提示
                    this.$message.error('删除文章失败');
                }
            }).catch(() => {
                //点击取消没有任何逻辑
            });
        }
    }
}
</script>

<style lang="less" scoped>

</style>>
