const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'static',
    devServer: {
        proxy: {
            '/*': {
                target: 'http://127.0.0.1:8080', // 改成需要代理的接口地址
                changeOrigin: true
            }
        }
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@component', resolve('src/components'))
    },
    productionSourceMap: false
}