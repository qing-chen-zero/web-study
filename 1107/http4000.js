const Koa = require("koa");
const static = require("koa-static");
const Router = require("koa-router")
const app = new Koa()
const router = new Router()

app.use(static(__dirname + "/static"));
router.get("/", (ctx, next) => {
    ctx.body = "hello run at 4000 port";
})
router.get("/getAjax", (ctx, next) => {
    // console.log(123);
    // ctx.body = {
    //     name: "zhangsan",
    //     age : 21
    // }
    let cb = ctx.query.callback;
    let obj = {
        a: 20,
        b: 21
    }
    // ctx.body = "var a = 10"
    ctx.body = `${cb}(${JSON.stringify(obj)})`;
})

app.use(router.routes());
app.listen(4000);