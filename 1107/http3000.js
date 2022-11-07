const Koa = require("koa");
const static = require("koa-static");
const Router = require("koa-router")
const app = new Koa()
const router = new Router()

app.use(static(__dirname + "/static"));
router.get("/", (ctx, next) => {
    ctx.body = "hello";
})
router.get("/getAjax", (ctx, next) => {
    ctx.body = {
        name: "lizi",
        age : 20
    }
})

app.use(router.routes());
app.listen(3000);