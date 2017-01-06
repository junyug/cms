// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var host = 'http://dev.cms.meixian.com'
module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, './../views/site/cms.php'),
    assetsRoot: path.resolve(__dirname, '../../web'),
    assetsSubDirectory: 'cms',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    host: host,
    port: 8099,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/page': {
        target: host,
        changeOrigin: true
      },
      '/page-module': {
        target: host,
        changeOrigin: true
      },
      '/ds-timeline': {
        target: host,
        changeOrigin: true
      },
      '/ds-item': {
        target: host,
        changeOrigin: true
      },
      '/img-material': {
        target: host,
        changeOrigin: true
      },
      '/gis': {
        target: host,
        changeOrigin: true
      },
      '/goods': {
        target: host,
        changeOrigin: true
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
