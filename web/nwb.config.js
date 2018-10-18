module.exports = {
  type: 'react-app',
  webpack: {
    publicPath: process.env.NODE_ENV === 'production' ? '/static/' : '',
    // resolve: {
    //   mainFields: ['webpack', 'browser', 'main']
    // },
    config(config) {
      config.resolve.mainFields = ['webpack', 'browser', 'main']
      return config
    }
  }
}
