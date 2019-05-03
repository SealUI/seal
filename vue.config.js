let path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  assetsDir: 'static',
  productionSourceMap: false,
  runtimeCompiler: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('css', path.resolve(__dirname, './src/assets/css'))
      .set('packages', path.resolve(__dirname, './packages'))
      .end()
    config.plugin('copy').use(CopyWebpackPlugin, [
      [
        {
          from: path.resolve(__dirname, './static'),
          to: 'static',
          ignore: ['.*']
        }
      ]
    ])
  }
}
