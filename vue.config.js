module.exports = {
  configureWebpack: {
    resolve: {
      alias:{
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'assets': '@/assets',
        'views': '@/views',
        'store': '@/store',
      }
    }
  },
  publicPath: './', // 相对于 HTML 页面（目录相同）
}