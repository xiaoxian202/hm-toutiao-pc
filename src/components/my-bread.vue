<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
            <slot></slot>
        </el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 如果你的组件，除了template选项还有其他选项，你才需要默认导出 -->
</template>
<script>
export default {
    // 当组件不是路由组件的时候，name属性可以做组件的名称
    name:'my-bread'
}
</script>