const Koa = require("koa");
const http = require('http');
const koaStaticCache = require('koa-static-cache');

const app = new Koa();
app.use(async (ctx, next) => {
    const options = {
        protocol: "http:",
        hostname: "localhost",
        port: 8888,
        path: '/getUsers',
        method: 'get'
    }

    if (ctx.url == '/getUsers') {
        // ctx.body = "数据给你"; 
        let data = await proxyRequest(options)
        ctx.body = data;
    } else {
        await next();
    }
})
app.use(koaStaticCache({
    prefix: '/',
    dir: __dirname + "/static",
    gzip: true,
    dynamic: true
}))


app.listen(9999);


function proxyRequest(options) {
    return new Promise( (resolve, reject) => {
        // 类似通过代码模拟一个浏览器请求, 有点类似ajax请求
        const req = http.request(options, (res) => {
            // 当请求的服务器响应的时候触发
            // data 事件是不断触发的， 服务器会不断的发送数据包，直到这次请求数据全部完成
            // 因为这不是浏览器，所以不受同源策略的影响
            let data = ""
            res.on('data', (chunk) => {
                console.log(`body : ${chunk}`);
                data += chunk.toString();
            })
            // 表示这次请求已经完成
            res.on('end', () => {
                console.log('done', data);
                resolve(data);
            })
        });
        req.write("");
        req.end();
    })
}