const path = require('path')
const { generateThemeTemplate, preBuildThemes } = require('./src/theme-temp')
generateThemeTemplate()
preBuildThemes()

module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        import: [path.join(__dirname, './src/assets/css/variables.styl')]
      }
    }
  }
}
