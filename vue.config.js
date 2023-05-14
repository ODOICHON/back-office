module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://duaily.net',
        changeOrigin: true
      }
    }
  },
  lintOnSave: false,
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/tech/' : '/'
}
