<template>
  <div class="container-image">
        <div class="btn-img" @click="openDialog">
            <!-- 如果父组件传了图片就用value如果没传值就用默认图 -->
            <img :src="value || previewImg" alt="">
        </div>
        <!-- 对话框 -->
        <el-dialog
            :visible.sync="dialogVisible"
            width="720px">
            <span>
                <!-- tabs选项卡 
                label选项卡标题-->
                <el-tabs v-model="activeName" type="card">
                    <el-tab-pane label="素材库" name="images">
                        <!-- 单选按钮 -->
                        <el-radio-group v-model="reqParams.collect" size="small" @change="toggelList">
                            <el-radio-button :label="false">全部</el-radio-button>
                            <el-radio-button :label="true">收藏</el-radio-button>
                        </el-radio-group>
                        <!-- 素材列表 -->
                        <div class="img-list">
                             <div v-for="item in images" :key="item.id" class="item-img" @click="selectedImg(item.url)" :class="{'select':selectedImgUrl===item.url}">
                                <img :src="item.url" alt="">
                            </div>
                        </div>
                        <!-- 分页 -->
                        <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="total"
                            :page-size="reqParams.per_page"
                            :current-page="reqParams.page"
                            @current-change="changePager">
                        </el-pagination>
                    </el-tab-pane>
                    <el-tab-pane label="上传图片" name="uploadImg">
                        <!-- 图像上传 -->
                        <el-upload
                            class="avatar-uploader"
                            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
                            :show-file-list="false"
                            :on-success="uploadSuccess"
                            name="image"
                            :headers="headers">
                            <img v-if="uploadImgUrl" :src="uploadImgUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-tab-pane>
                </el-tabs>   
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmImg">确 定</el-button>
            </span>
        </el-dialog>
  </div>
</template>

<script>
// 导入auth.js
import auth from '@/utils/auth.js'
// 通过import导入封面预览图
import img from '../assets/default.png'
export default {
    name:'my-image',
    props:['value'],
    data() {
        return {
            // 对话框默认隐藏
            dialogVisible:false,
            // 绑定值，选中选项卡的 name
            activeName:"images",
            reqParams:{
                // 是否收藏
                collect:false,
                // 页码
                page:1,
                // 每页数量
                per_page:8
            },
            // 素材列表
            images:[],
            // 图片总数
            total:0,
            // 当前选中的图片地址
            selectedImgUrl:null,
            // 请求头
            headers:{Authorization:`Bearer ${auth.getUser().token}`},
            // 当前上传的图片地址
            uploadImgUrl:null,
            // 封面预览图(默认图)
            previewImg:img
        }
    },
    methods:{
        // 点击图片按钮
        openDialog() {
            this.dialogVisible = true
            // 点击时获取列表
            this.getImage()
            // 清除之前的操作
            this.activeName = "images"
            this.selectedImgUrl = null
            this.uploadImgUrl = null
        },
        // 获取素材列表
        async getImage() {
            const res = await this.$http.get('user/images',{
                params:this.reqParams
            })
            this.images = res.data.data.results
            this.total = res.data.data.total_count
        },
        // 当前点击的图片
        selectedImg(url) {
            this.selectedImgUrl = url
        },
        // 页码改变触发的事件
        changePager(newPage) {
            this.reqParams.page = newPage
            this.getImage()
        },
        //全部与收藏切换,绑定值变化时触发的事件
        toggelList() {
            // 页码变成第一页
            this.reqParams.page = 1
            this.getImage()
        },
        // 上传图片成功后触发的事件
        uploadSuccess(response) {
            // 预览
            this.uploadImgUrl = response.data.url
        },
        // 确定图片
        confirmImg() {
            if(this.activeName === 'images') {
                // 激活素材库
                if(!this.selectedImgUrl) return this.$message.warning("请选择一张图片")
                // this.previewImg = this.selectedImgUrl
                // 本地不需要保存，把选中图片传给父组件
                this.$emit('input',this.selectedImgUrl)
            }else {
                // 激活上传图片
                 if(!this.uploadImgUrl) return this.$message.warning("请选择一张图片")
                //  this.previewImg = this.uploadImgUrl
                // 把上传图片传给父组件
                this.$emit('input',this.uploadImgUrl)
            }
            // 关闭对话框
            this.dialogVisible = false
            // 在这个位置需要去做其他组件的业务
            // 在确认图片后，会触发my-image组件的自定义事件confirm
            this.$emit('confirm')
        }
    }
}
</script>

<style lang="less" scoped>
.container-image {
    display: inline-block;
    margin-right: 20px;
    .btn-img{
        border: 1px dashed #ddd;
        width: 150px;
        height: 150px;
        img {
            display: block;
            width: 100%;
            height: 100%;
        }
    }
}
// 素材列表
.img-list {
    margin-top: 20px;
    .item-img {
        display: inline-block;
        width: 150px;
        height: 120px;
        margin-top: 15px;
        margin-right: 15px;
        border: 1px dashed #ddd;
        position: relative;
        img {
            display: block;
            width: 100%;
            height: 100%;
        }
        &.select::after {
            content: '';
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.3) url('../assets/selected.png') no-repeat center / 50px auto;
            position: absolute;
            top: 0;
            left: 0;
        }
    }

}
</style>