<template>
    <div class="container-comment">
        <el-card>
            <div slot="header">
                <my-bread>评论管理</my-bread>
            </div>
            <!-- 表格 -->
            <el-table :data="comments">
                <el-table-column label="文章标题" prop="title"></el-table-column>
                <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
                <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
                <el-table-column label="状态" >
                    <template slot-scope="scope">
                        {{scope.row.comment_status ?'已打开':'已关闭'}}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="toggleStatus(scope.row)" size="small" v-if="scope.row.comment_status" type="danger">关闭评论</el-button>
                        <el-button @click="toggleStatus(scope.row)" size="small" v-else type="success">打开评论</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 
            page-sizes:每页显示个数选择器的选项设置。后台不支持100-->
            <el-pagination
                background
                layout="prev, pager, next,sizes"
                :total="total"
                :page-size="reqParams.per_page"
                :current-page="reqParams.page"
                @current-change="changePage"
                @size-change="changeSize"
                :page-sizes="[10,20,30,40,50]">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
export default {
    name:'page-comment',
    data() {
        return {
            // 评论列表（文章列表，查询的是每篇文章评论相关的信息）
            comments:[],
            // 筛选条件
            reqParams:{
                page:1,
                per_page:20,
                // 获取文章的评论相关信息
                response_type:'comment'
            },
            // 总条数
            total:0,

        }
    },
    created() {
        this.getComment()
    },
    methods:{
        // 获取评论列表
        async getComment() {
            const res = await this.$http.get('articles',{
                params:this.reqParams
            })
            this.comments = res.data.data.results
            this.total = res.data.data.total_count
        },
        // 分页改变时
        changePage(newPage) {
            this.reqParams.page = newPage
            this.getComment()
        },
        // pageSize每页个数改变时会触发,size每页条数
        changeSize(size) {
            this.reqParams.page = 1
            this.reqParams.per_page = size
            this.getComment()
        },
        // 打开/关闭评论
        toggleStatus(row) {
            // row中有id文章的ID,文章的状态comment_status
            const {id,comment_status} =row
            const text1 ='此操作会关闭该文章的评论功能，关闭后用户将无法对该文章进行评论，您确认吗？'
            const text2 = '此操作会开启该文章的评论功能，您确认吗？'
            const text = row.comment_status ? text1 : text2
            // 确认框
            this.$confirm(text, '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                // 点击确认
                // 快捷写法axios.get()/post()
                // 综合写法axios({})
                await this.$http({
                    method:'put',
                    url:'comment/status',
                    // ?后键值对参数
                    params:{
                        // row.id超出最大安全值，json-bigint转化成了对象,转成字符传
                        article_id:row.id.toString()
                    },
                    // 请求体传参
                    data:{
                        allow_comment:!row.comment_status
                    }
                })
                this.$message.success(row.comment_status ? '关闭成功' : '打开成功')
                //修改row当前的文章状态，驱动当前视图
                row.comment_status = !row.comment_status
            }).catch(() => {
                // 取消不做任何逻辑
            });          
            
        }
    }
}
</script>

<style lang="less" scoped>

</style>