<template>
    <!-- 最外层大容器 -->
    <el-container class="container-layout">
        <!-- 左侧边栏 -->
        <el-aside :width="isOpen ?'200px':'64px'">
            <!-- logo -->
            <div class="logo" :class="{'mini_logo':!isOpen}"></div>
            <!-- 导航 -->
            <el-menu
                style="border-right:none" 
                :collapse=!isOpen 
                :collapse-transition=isOpen
                default-active="1" 
                background-color="#002233"
                text-color="#fff" 
                active-text-color="#ffd04b">
                <el-menu-item index="1">
                    <i class="el-icon-s-home"></i>
                    <span slot="title">首页</span>
                </el-menu-item>
                <el-menu-item index="2">
                    <i class="el-icon-document"></i>
                    <span slot="title">内容管理</span>
                </el-menu-item>
                <el-menu-item index="3">
                    <i class="el-icon-picture"></i>
                    <span slot="title">素材管理</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <i class="el-icon-s-promotion"></i>
                    <span slot="title">发布文章</span>
                </el-menu-item>
                <el-menu-item index="5">
                    <i class="el-icon-chat-dot-round"></i>
                    <span slot="title">评论管理</span>
                </el-menu-item>
                <el-menu-item index="6">
                    <i class="el-icon-present"></i>
                    <span slot="title">粉丝管理</span>
                </el-menu-item>
                <el-menu-item index="7">
                    <i class="el-icon-setting"></i>
                    <span slot="title">个人设置</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <!-- 右侧主体 -->
        <el-container>
            <!-- 头部 -->
            <el-header>
                <!-- 图标 -->
                <span class="icon" 
                @click="isOpen = !isOpen" 
                :class="{'el-icon-s-fold':isOpen,'el-icon-s-unfold':!isOpen}"></span>
                <!-- 文字 -->
                <span class="text">江苏传智播客科技教育有限公司</span>
                <!-- 下拉列表 -->
                <el-dropdown>
                    <!-- 默认显示 -->
                    <span>
                        <!-- 头像 -->
                        <img class="head" :src="user.photo" alt="">
                        <!-- 用户 -->
                        <span class="name">{{user.name}}</span>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-unlock">退出登录</el-dropdown-item>

                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <!-- 内容 -->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>

</template>

<script>
// 导入auth模块
import auth from '@/utils/auth.js'
export default {
    name:'layout',
    data() {
        return {
            isOpen:true,
            // 用户名称，用户头像
            user:{
                name:'',
                photo:''
            }
        }
    },
    // 组件初始化的时候，需要从本地拿出数据
    created() {
        const {name,photo} = auth.getUser()
        this.user = {name,photo}
    }
    
}
</script>

<style lang="less" scoped>
    .container-layout {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        .el-aside {
            background-color: #002233;
            .logo {
                width: 100%;
                height: 60px;
                background: #002244 url(../assets/logo_admin.png) no-repeat center /140px auto;
            }
            //小logo的样式需要在logo下方书写，因为要覆盖
            .mini_logo {
                background-image: url(../assets/logo_admin_01.png);
                background-size: 36px auto;
            }
        }
        .el-header {
            border-bottom: 1px solid #ddd;
            line-height: 60px;
            .icon {
                vertical-align:middle;
                font-style: 24px;
            }
            .text{
                vertical-align:middle; 
                margin-left: 10px;
            }
            .el-dropdown {
                float: right;
                .head {
                    width: 30px;
                    height: 30px;
                    vertical-align: middle;
                }
                .name {
                  font-weight:700;  
                  color: #333;
                  margin-left: 5px;
                  vertical-align: middle;
                }
            }
        }
        
        
    }
</style>