<template>
  <div class="container-image">
    <el-card>
        <!-- 面包屑 -->
        <div slot="header">
            <my-bread>素材管理</my-bread>
        </div>
        <!--按钮 -->
        <div class="btn-box">
            <el-radio-group v-model="reqparams.collect" size="small" @change="toggleList">
                <!-- label属性单个按钮的值，当你选中点击后，这个值赋值给reqparams.collaps -->
                <!-- 但你el-radio-button组件中没有文字说明，label的值直接当做文字说明 -->
                <el-radio-button :label="false">全部</el-radio-button>
                <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
            <el-button @click="openDialog" style="float:right" type="success" size="small">添加素材</el-button>
        </div>
        <!-- 列表 -->
        <div class="list-box">
            <div class="item-box" v-for="item in images" :key="item.id">
                <img :src="item.url" alt />
                <div class="option" v-if="!reqparams.collect">
                    <span class="el-icon-star-off" @click="toggStatus(item)" :class="{'red':item.is_collected}"></span>
                    <span class="el-icon-delete" @click="delImage(item.id)"></span>
                </div>
            </div>
        </div>
        <!-- 分页 -->
        <el-pagination 
            background 
            layout="prev, pager, next" 
            :total="total"
            :page-size="reqparams.per_page"
            :current-page="reqparams.page"     
            @current-change="changePager"      
            >
        </el-pagination>
    </el-card>
    <!-- 对话框 -->
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="300px">
        <!-- 上传组件 -->
        <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images" 
            name="image" 
            :headers="headers"
            :show-file-list="false"
            :on-success="uploadSuccess">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </el-dialog>
  </div>
</template>

<script>
// 导入auth
import auth from '@/utils/auth.js'
export default {
    name:'page-image',
    data() {
        return {
            // 查询条件
            reqparams:{
                // 是否为收藏，true查询收藏图片 false查询全部图片
                //后台提供
                collect:false, 
                //页码
                page:1,
                // 每页数量
                per_page:10
            },
            // 素材列表
            images:[],
            // 总条数
            total:0,
            // 对话框显示或隐藏
            dialogVisible:false,
            // 预览图地址
            imageUrl:'',
            // 上传请求头对象
            headers:{Authorization:`Bearer ${auth.getUser().token}`}
        }
    },
    created() {
        this.getImage()
    },
    methods:{
        // 上传成功的钩子函数
        // response后台返回的数据
        uploadSuccess(response) {
            // console.log(response);
            // 提示+预览
            this.$message.success('上传成功')
            this.imageUrl = response.data.url
            // 3s后：关闭弹框，刷洗列表
            window.setTimeout(() => {
                this.dialogVisible = false
                this.getImage()
            },3000)
        },
        // 获取素材列表
        async getImage() {
            const res = await this.$http.get('user/images',{params:this.reqparams})
            // console.log(res.data);
            // 素材列表
            this.images = res.data.data.results
            // 总条数
            this.total = res.data.data.total_count
        },
        // 切换分页 页码改变时触发，回调函数是最新页码
        changePager(newPage) {
            this.reqparams.page = newPage
            // 刷新列表
            this.getImage()
        },
        // 全部与收藏切换 定值变化时触发的事件,
        // 回调参数是选中的 Radio label 值
        toggleList() {
            this.reqparams.page = 1
            this.getImage()
        },
        // 删除功能
        delImage(id) {
            this.$confirm('此操作将永久删除该图片素材, 是否继续?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                // 点击确认
                try {
                    //调用接口
                    await this.$http.delete(`user/images/${id}`)
                    // 提示
                    this.$message.success("'删除图片素材成功!'")
                    this.getImage()
                } catch (error) {
                    this.$message.error("'删除图片素材失败!'")
                }
            }).catch(() => {
                // 点击取消不作任何逻辑 
            })
        },
        //收藏功能切换
        async toggStatus(item) {
            const updateStatus = !item.is_collected
            try {
                await this.$http.put(`user/images/${item.id}`,{
                    // 和当前状态取反即可，收藏 -> 取消收藏，没收藏 -> 已收藏
                    collect:updateStatus
                })
                // 成功提示
                this.$message.success(updateStatus ? "添加收藏成功" : "取消收藏成功")
                // 根据修改后的状态去改，星星的颜色，修改图片数据对应的状态is_collected即可
                item.is_collected = updateStatus
            } catch (error) {
                this.$message.error(updateStatus ? "添加收藏失败" : "取消收藏失败")
            }
        },
        // 添加素材
        openDialog() {
            // 显示上传组件
            this.dialogVisible = true
            // 清空预览图
            this.imageUrl = null
        },
        
    }
}
</script>

<style lang="less" scoped>
    // 列表样式
    .list-box {
        margin-top: 20px;
        .item-box {
            display: inline-block;
            width: 180px;
            height: 180px;
            margin-right: 60px;
            border: 1px dashed #ddd;
            position: relative;
            margin-bottom: 20px;
            img{
               display: block;
               width: 100%;
               height: 100%; 
            }
            .option{
                width: 100%;
                height: 30px;
                position: absolute;
                left: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.3);
                text-align: center;
                line-height: 30px;
                span{
                    color: #fff;
                    margin: 0 20px;
                    // 不加&解析后：span .red{} 后代选择器
                    // 加上&节后后：span.red{}  交集选择器
                    &.red {
                        color:red;
                    }
                }
            }
        }
    }
</style>
