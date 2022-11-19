const path = require("path")
// 当我们运行webpack 命令的时候， 会默认从运行目录找 webpack.config.js 进行配置
// webpack是node实现的， 是运行在node环境， 所以可以写node代码
module.exports = {
    mode : "development",
    entry: './src/1.js',

    output: {
        // path 必须是绝对路径
        path: path.resolve(__dirname , "dist"),
        filename : 'index.js'
    }
}