const CracoLessPlugin = require('craco-less')
const antdTheme = require('./src/config/theme')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: antdTheme,
            javascriptEnabled: true
          }
        }
      }
    }
  ]
}
