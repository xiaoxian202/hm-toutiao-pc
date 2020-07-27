module.exports = {
  lintOnSave: false,
  // 把一些第三方包排除在外，不去打包
  // vue-cli ---->  webpack打包工具
  configureWebpack: {
    // webpack的一个配置
    externals: {
      // key(包的名字):value(通过script标签引入后，暴露在全局的变量名)
      echarts: 'echarts'
    }
  },
  // 资源引入的路径前缀
  publicPath:'./'
}
