
module.exports = {
  publicPath: './',
  devServer: {
    port: 5000,
    proxy: {
      '/config': {
        target: 'httt://localhost:5000/',
        ws: true,
        secure: true,
        changeOrigin: process.env.NODE_ENV !== 'production',
        pathRewritr: {
          '^/config': '/config'
        }
      }
    }
  }

}
