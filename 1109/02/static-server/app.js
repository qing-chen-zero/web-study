const Koa = require("koa");
const koaStaticCache = require('koa-static-cache');

const app = new Koa();
app.use(koaStaticCache({
    prefix: '/',
    dir: __dirname + "/static",
    gzip: true,
    dynamic: true
}))


app.listen(9999);