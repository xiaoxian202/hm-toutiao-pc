<template>
  <div class="container-publish">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <!-- 表单 -->
      <el-form label-width="80px">
        <el-form-item label="标题: ">
          <el-input v-model="articleForm.title" placeholder="请输入文章标题" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容: ">
          <!-- 双向绑定 富文本 
          ref="myQuillEditor"获取富文本组件实例对象
          @blur="onEditorBlur($event)"失去焦点是调用的回调函数
          @focus="onEditorFocus($event)"获取焦点是调用的回调函数
          @ready="onEditorReady($event)"
          editorOption配置对象-->
          <quill-editor
            v-model="articleForm.content"
            :options="editorOption"/>
        </el-form-item>
        <el-form-item label="封面: ">
          <!-- 单选按钮组 -->
          <el-radio-group v-model="articleForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 封面组件 -->
          <div style="margin-top:20px">
            <my-image></my-image>
            <my-image></my-image>
            <my-image></my-image>
          </div>
        </el-form-item>
        <el-form-item label="频道: ">
          <!-- 插件 -->
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">发布文章</el-button>
          <el-button>存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 导入富文本样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
    name:'page-publish',
    // 注册
    components: {quillEditor},
    data() {
      return {
        // 文章表单数据对象
        articleForm:{
          title:null,
          // 频道id
          channel_id:null,
          // 富文本输入信息
          content:null,
          // 封面
          cover:{
            // 封面类型
            type:1
          }
        },
        // 富文本配置对象
        editorOption:{
          modules: {
            toolbar: [
              // 切换按钮
              ['bold', 'italic', 'underline', 'strike'],  
              ['blockquote', 'code-block'],
              // 用户自定义按钮值
              [{ 'header': 1 }, { 'header': 2 }], 
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              // 减少缩进/缩进
              [{ 'indent': '-1'}, { 'indent': '+1' }], 
              ['image']
            ]
          },
          placeholder:'请输入文章内容'
        }
      }
    },
    methods:{
      
    }
}
</script>

<style lang="less" scoped>
// ::v-deep是深度作用符号，让选择器在其他组件下也生效
::v-deep .ql-toolbar.ql-snow {
  padding: 0 8px;
}
::v-deep .ql-editor {
  height: 250px;
}
</style>