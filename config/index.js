// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'st', // 编译输出的二级目录
        assetsPublicPath: '/', // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
        productionSourceMap: true,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: require('./dev.env'),
        port: 8088,
        autoOpenBrowser: true,
        assetsSubDirectory: 'st',
        assetsPublicPath: '/',
        proxyTable: {
            '/api': {
                target: 'http://192.168.100.210:8085/api',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        //http://testapi.baikanmovie.com(公测)
        //http://bkdy.tunnel.qydev.com/bkdy/front
        //http://www.baikanmovie.com:8080/front
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
}