const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap:false, // 关闭生成源代码映射
  lintOnSave: false,
  // 代理跨域
  devServer: {
    proxy: {
      'api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        // pathRewriter: { '^/api': '' }
      }
    }
  }
})
