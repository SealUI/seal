const nodeExternals = require('webpack-node-externals')
const path = require('path')
const pkg = require('./package.json')

const _BANNER = [
  ' ' + pkg.name + ' v' + pkg.version,
  ' Author    : ' + pkg.author,
  ' Copyright : ' + new Date().getFullYear()
].join('\n')

let configureWebpack = {}
configureWebpack.externals = [
  {
    vue: 'vue',
    axios: 'axios'
  },
  nodeExternals(),
  nodeExternals({
    modulesDir: path.resolve(__dirname, 'node_modules')
  })
]


module.exports = {
  publicPath: '',
  outputDir: 'lib',
  assetsDir: '',
  filenameHashing: false,
  productionSourceMap: false,
  css: {
    extract: true,
    sourceMap: false
  },
  configureWebpack,
  chainWebpack(webpackConfig) {
    webpackConfig
      .plugin('banner')
      .use(require('webpack/lib/BannerPlugin'), [_BANNER])
      .end()
  }
}
