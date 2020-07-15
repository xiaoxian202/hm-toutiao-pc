<template>
    <div class="container-login">
        <el-card>
            <img src="../../assets/logo_index.png" alt="">
            <!-- 表单 -->
            <el-form>
                <el-form-item>
                    <el-input  v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input style="width:240px;margin-right:8px"  v-model="loginForm.code" placeholder="请输入验证码"></el-input>
                    <el-button>发送验证码</el-button>
                </el-form-item>
                <el-form-item>
                    <!-- value="ture"默认选中 -->
                    <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button style="width:100%" type="primary">登 录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    name:'page-login',
    data() {
        return {
            //表单数据对象
            //mobile和code是固定的，后台需要的字段名称
            loginForm:{
                mobile:'',
                code:''
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .container-login {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background:url(../../assets/login_bg.jpg) no-repeat center /cover;
        // el-card是组件，解析后并不存在，不能使用属性选择器
        // element-ui在组件的根容器上，加一个跟组件名称一致的类名
        .el-card {
            width: 400px;
            height: 350px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            img {
                display: block;
                width: 200px;
                margin:0 auto 20px;
            }
        }
    }
</style>