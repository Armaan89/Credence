module.exports = {
  devServer: {
    proxy: {
      '/movies': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/movies_poster': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
}