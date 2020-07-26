<template>
    <div class="container-setting">
        <el-card>
            <div slot="header">
                <my-bread>个人设置</my-bread>
            </div>
            <!-- element栅格布局 24列-->
            <el-row>
                <el-col :span="12">
                    <!-- 表单 -->
                    <el-form label-width="120px">
                        <el-form-item label="编号：">10010</el-form-item>
                        <el-form-item label="手机：">14331168455</el-form-item>
                        <el-form-item label="媒体名称：">
                            <el-input v-model="user.name" placeholder="请输入媒体名称"></el-input>
                        </el-form-item>
                        <el-form-item label="媒体介绍：">
                            <el-input v-model="user.intro" type="textarea" placeholder="请输入媒体介绍"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱：">
                            <el-input v-model="user.email" placeholder="请输入邮箱" :rows="3"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary">保存设置</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="12">
                    <!-- 上传 -->
                    <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <p class="text">修改头像</p>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
export default {
    name:'page-setting',
    data() {
        return {
            // 用户信息
            user:{
                name:'',
                intro:'',
                email:''
            },
            // 图片地址
            imageUrl:''
        }
    }
}
</script>

<style lang="less" scoped>
.text {
    font-size: 12px;
    text-align: center;
}
</style>