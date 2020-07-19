<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
            <slot></slot>
        </el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 如果你的组件，除了template选项还有其他选项，你才需要导出 -->
</template>