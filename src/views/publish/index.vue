<template>
  <div class="container-publish">
    <el-card>
      <div slot="header">
        <my-bread>{{$route.query.id ?'修改文章' :'发布文章'}}</my-bread>
      </div>
      <!-- 表单 -->
      <el-form label-width="80px" :model="articleForm" :rules="articleRules" ref="articleForm">
        <el-form-item label="标题: " prop="title">
          <el-input v-model="articleForm.title" placeholder="请输入文章标题" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容: " prop="content">
          <!-- 双向绑定 富文本 
          ref="myQuillEditor"获取富文本组件实例对象
          @blur="onEditorBlur($event)"失去焦点是调用的回调函数
          @focus="onEditorFocus($event)"获取焦点是调用的回调函数
          @ready="onEditorReady($event)"
          editorOption配置对象-->
          <quill-editor
            v-model="articleForm.content"
            :options="editorOption"
            @blur="checkContemt()"/>
        </el-form-item>
        <el-form-item label="封面: " prop="cover.type">
          <!-- 单选按钮组 -->
          <!-- @change="articleForm.cover.images=[]当改变类型的时候，重置图片数据 -->
          <el-radio-group v-model="articleForm.cover.type" @change="articleForm.cover.images=[]" >
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 封面组件 -->
          <!-- 一张 -->
          <div style="margin-top:20px"
            v-if="articleForm.cover.type===1">
            <!-- :value="testImgUrl" @input="testImgUrl = $event" -->
            <!-- <my-image v-model="testImgUrl"></my-image> -->
            <my-image @confirm="checkCover" v-model="articleForm.cover.images[0]"></my-image>
          </div>
          <!-- 三张 -->
          <div style="margin-top:20px"
            v-if="articleForm.cover.type===3">
            <my-image @confirm="checkCover" v-for="i in 3" :key="i" v-model="articleForm.cover.images[i-1]"></my-image>
          </div>
        </el-form-item>
        <el-form-item label="频道: " prop="channel_id">
          <!-- 插件 -->
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <!-- 如果有id显示修改文章，负责显示发布文章 -->
        <el-form-item v-if="$route.query.id">
          <el-button @click="editArticle" type="success">修改文章</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button @click="saveArticle(false)" type="primary">发布文章</el-button>
          <el-button @click="saveArticle(true)">存入草稿</el-button>
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
      // 校验封面数据
      const validCoverFn = (rule,value,callback) =>{
        // value是封面类型：1 3 0 -1
        const images = this.articleForm.cover.images
        // 单图校验逻辑
        if(value === 1) {
          // 里面有数据,并且长度为1
          if(images[0] && images.length === 1) {
            callback()
          }else {
            callback(new Error('请选择一张封面图'))
          }
        }else if(value ===3) {
          // 三图逻辑
          // 三张图都有数据，不用效验长度因为最多只有三张
          if(images[0] && images[1] && images[2]) {
            callback()
          }else {
            callback(new Error('请选择三张封面图'))
          }
        }else {
          callback()
        }
      }
      return {
        // 测试数据
        // testImgUrl:null,
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
            type:1,
            // 图片数据
            images:[]
          }
        },
        // 文章效验规则对象
        articleRules:{
          title:[
            { required: true, message: '请输入文章标题', trigger: 'blur' },
            { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
          ],
          channel_id:[
            { required: true, message: '请选择所属频道', trigger: 'change' },
          ],
          content:[
            { required: true, message: '请输入文章内容', trigger: 'blur' },
          ],
          // 单选框组绑定的是articleFrom.cover.type它能触发change来进行校验
          'cover.type':[
            {validator:validCoverFn,trigger: 'change'}
          ]
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
    created(){
      // 区分业务场景
      // 如果组件初始化默认就是发布文章场景
      // 如果是编辑文章，才有事情去做
      // 1.面包屑文字：修改文章；修改文章按钮
      if(this.$route.query.id) {
        this.getArticle()
      }
    },
    methods:{
      // 触发文章内容校验
      checkContemt() {
        // 通过表单组件来使用声明好的，content校验规则去校验content字段
        // 表单组件提供一个函数validateField('字段名字')进行校验
        this.$refs.articleForm.validateField('content')
      },
      // 触发文章封面校验
      checkCover() {
        // 触发cover.type校验规则，去校验封面图数据
        this.$refs.articleForm.validateField('cover.type')
      },
      // 添加文章
      saveArticle(draft) {
        // 整体表单校验
        this.$refs.articleForm.validate(async valid => {
          if(valid) {
            // 考虑异常情况
            try {
              // 进行添加请求
              await this.$http.post(`articles?draft=${draft}`,this.articleForm)
              this.$message.success(draft ? '存入草稿成功' :'发布文章成功')
              // 跳转内容管理
              this.$router.push('/article')
            } catch (error) {
              this.$message.error(draft ? '存入草稿失败' :'发布文章失败')
            }
          }
        })
      },
      // 获取文章，填充表单
      async getArticle() {
        const res = await this.$http.get(`articles/${this.$route.query.id}`)
        this.articleForm = res.data.data
      },
      // 修改文章
      editArticle() {
        // 整体表单校验
        this.$refs.articleForm.validate(async valid => {
          if(valid) {
            // 考虑异常情况
            try {
              // 进行修改请求
              await this.$http.put(`articles/${this.$route.query.id}?draft=false`,this.articleForm)
              this.$message.success('修改文章成功')
              // 跳转内容管理
              this.$router.push('/article')
            } catch (error) {
              this.$message.error('修改文章失败')
            }
          }
        })
      }
    },
    // 监听器
    watch:{
      // 监听地址栏id数据变化，去区分两种变化
      '$route.query.id':function() {
        if(this.$route.query.id) {
          // 修改文章 + 填充表单
          this.getArticle()
        }else {
          // 发布文章 + 重置表单（还原数据，清空校验）
          // resetFields即可对整个表单进行重置，也能将所有字段值重置为初始值并移除校验结果
          this.$refs.articleForm.resetFields()
          //复杂数据类型element没有清除，自己手动清除图片
          this.articleForm.cover.images = []
        }
      }
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