const Koa = require("koa")
const Static = require("./middlewares/static");
const app = new Koa();

// use ==> http.createServer 的回调函数 方便扩展 
// 类似事件注册、通过use注册N个多个不同的callback
// 多个事件函数、独立平行 koa 需要关联，执行逻辑顺序问题
// middleware 中间件
// const qingchen = (ctx, next) => {

//     // ctx.req;
//     // ctx.res;
//     console.log("the first");
//     // next();

//     // 鉴权
//     let isLogin = true;
//     if (isLogin) {
//         next();
//     }
// }

// app.use(qingchen);


// app.use(()=> {
//     console.log("next_one");
// });

// 静态资源 koa-static-cache
app.use(Static({
    prefix: '/public',
    dir: __dirname + "/public"
}));

// 动态资源 koa-router
app.use( (ctx) => {
    console.log(123);
});

app.listen(8888);
