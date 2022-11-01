const fs = require("fs");

const defaultOptions = {
    prefix: '',
    dir: ''
}

module.exports = (options) => {
    options = { ...defaultOptions, ...options }
    return async (ctx, next) => {

        /**
         * ctx 包装了 req => 原生nodejs的InComingMessage
         *           res => 原生nodejs的ServerResponse对象
         *           request、response => 被koa包装过的
         */
        // console.log("static 中间件");

        // const file = __dirname + url;
        // ctx.request.url == ctx.url
        // const file = options.dir

        if (ctx.url.startsWith(options.prefix)) {
            let url = options.dir + ctx.url.replace(options.prefix, "");
            ctx.body = fs.readFileSync(url).toString()
        } else {
            await next()
        }

    }
}