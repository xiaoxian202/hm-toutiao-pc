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
                        <el-form-item label="编号：">{{user.id}}</el-form-item>
                        <el-form-item label="手机：">{{user.mobile}}</el-form-item>
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
                            <el-button @click="saveSetting" type="primary">保存设置</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="12">
                    <!-- 上传 -->
                    <!-- 注意 el-upload组件，必须配置action属性 -->
                    <el-upload
                        class="avatar-uploader"
                        action=""
                        :http-request="uploadAvatar"
                        :show-file-list="false">
                        <img v-if="user.photo" :src="user.photo" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <p class="text">修改头像</p>
                </el-col>
            </el-row>
            <!-- 测试非父子传值 A组件-->
            <!-- <com-a></com-a> -->
        </el-card>
        <!-- 测试非父子传值 B组件-->
        <!-- <com-b></com-b> -->
    </div>
</template>

<script>
// import ComA from '@/components/com-a'
// import ComB from '@/components/com-b'
// 导入eventBus
import eventBus from "@/eventBus"
// 导入auth
import auth from '@/utils/auth'
export default {
    name:'page-setting',
    // components:{ComA,ComB},
    data() {
        return {
            // 用户信息
            user:{
                name:'',
                // 媒体介绍
                intro:'',
                email:'',
                // 头像
                photo:'',
            },
        }
    },
    created() {
        this.getUserProFile()
    },
    methods:{
        // 获取个人资料
        async getUserProFile() {
            const res = await this.$http.get('user/profile')
            this.user = res.data.data
        },
        // 保存设置
        async saveSetting() {
            // 异常
            try {
                // 获取编辑时需要的三个字段
                const {name,intro,email} = this.user
                // 发起编辑请求
                await this.$http.patch('user/profile',{name,intro,email})
                // 编辑资料成功
                this.$message.success('保存设置成功')
                // 同步用户名称给Layout组件,传递数据
                eventBus.$emit('updateUserName',name)

                // 同步用户名称给本地存储
                // 1.获取信息
                const localUser = auth.getUser()
                // 2.修改信息
                localUser.name = name
                // 3.保存信息
                auth.setUser(localUser)
            } catch (e) {
                if(e.response && e.response.status===409) {
                    this.$message.error('媒体名称已存在')
                }else {
                    this.$message.error('保存设置失败')
                }
            }
        },
        // 选择图片后会触发
        // infoObj组件配置信息
        async uploadAvatar({file}) {
            // console.log({file});
            // console.log(infoObj) === {file:File就是图片文件对象}
            // 图片对应的file对象
            // 异常
            try {
                // 实例化formdata对象
                const formdata = new FormData()
                formdata.append('photo',file)
                // 通过axios上传图片
                const res = await this.$http.patch('user/photo',formdata)
                this.$message.success('修改头像成功')
                // 预览
                this.user.photo = res.data.data.photo
                // 同步头像到Layout
                eventBus.$emit('updateUserPhoto',this.user.photo)
                // 同步头像到本地
                // 1.获取信息
                const localUser = auth.getUser()
                // 2.修改信息
                localUser.photo = this.user.photo
                // 3.保存信息
                auth.setUser(localUser)
            } catch (error) {
                this.$message.error('修改头像失败')
            }
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