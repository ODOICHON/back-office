module.exports = {
  devServer: {
    port: 3000
  },
  lintOnSave: false,
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/tech/' : '/'
}
