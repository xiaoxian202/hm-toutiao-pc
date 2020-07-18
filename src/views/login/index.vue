<template>
    <div class="container-login">
        <el-card>
            <img src="../../assets/logo_index.png" alt="">
            <!-- 表单
                status-icon:反馈图标 对-> 打对号 错->打错号
             -->
            <el-form :model="loginForm" :rules="loginRules" status-icon ref="loginForm">
                <el-form-item prop="mobile">
                    <el-input  v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input style="width:240px;margin-right:8px"  v-model="loginForm.code" placeholder="请输入验证码"></el-input>
                    <el-button>发送验证码</el-button>
                </el-form-item>
                <el-form-item>
                    <!-- value="ture"默认选中 -->
                    <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button style="width:100%" type="primary" @click="login">登 录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
// 导入本地用户信息相关函数
import auth from '@/utils/auth.js'
export default {
    name:'page-login',
    data() {
        //自定义效验函数
        const checkMobile = (rule,value,callback) => {
            //vale:待效验的数据
            //callback:效验完毕后调用的回调函数
            // 手机号规则：必须以1开头，第二位是3-9之间，9个数字结尾
            if(/^1[3-9]\d{9}$/.test(value)) {
                callback()
            }else {
                callback(new Error('手机号不正确'))
            }
        }
        return {
            //表单数据对象
            //mobile和code是固定的，后台需要的字段名称
            loginForm:{
                mobile:'',
                code:''
            },
            //表单验证规则对象
            loginRules:{
                mobile:[
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    //自定义手机效验规则
                    {validator:checkMobile,trigger: 'blur'}
                ],
                code:[
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                    { len: 6, message: '验证码是6个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        login() {
            //整体表单校验
            this.$refs.loginForm.validate((valid) => {
                //valid代表整体校验是否成功 是布尔值
                if(valid) {
                    //登录
                    this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations',this.loginForm)
                    .then((res) => {
                        // res.data表示返回后台所有信息
                        // console.log(res.data);
                        // 成功保存用户信息
                        auth.setUser(res.data.data)

                        // 成功跳转到首页 先保存在跳转
                        this.$router.push({
                            path:'/'
                        })
                    })
                    .catch((err) => {
                        //失败，提示手机号或验证码错误
                        this.$message.error('手机号或者验证码错误');
                    })
                }
            })
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