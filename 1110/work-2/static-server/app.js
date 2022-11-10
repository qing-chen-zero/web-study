const Koa = require("koa");
const http = require('http');
const koaStaticCache = require('koa-static-cache');
const proxy = require('koa-server-http-proxy')

const app = new Koa();

app.use(proxy('/api', {
    target: 'http://localhost:8888',
    pathRewrite : {
        '^/api' : ''
    }
}))


app.use(koaStaticCache({
    prefix: '/',
    dir: __dirname + "/static",
    gzip: true,
    dynamic: true
}))


app.listen(9999);

