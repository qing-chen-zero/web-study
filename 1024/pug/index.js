const Koa = require("koa");
const Router = require("koa-router");
const views = require("koa-views");

let app = new Koa();
let router = new Router();
app.use(views(__dirname + "/views", {
    map: {
        html: "pug"
    }
}));
router.get("/", async ctx => {
    let users = [
        {
            name: "zhangsan",
            age: 20,
            height: "178cm"
        },
        {
            name: "lisi",
            age: 18,
            height: "176cm"
        },
        {
            name: "wuwang",
            age: 22,
            height: "168cm"
        },

    ]
    // ctx.body = "hello, pug!";
    await ctx.render("index.pug", {
        data: "this is a test data",
        users
    })
})
app.use(router.routes());
app.listen(3000);