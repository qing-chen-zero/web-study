const Koa = require('koa');
const Router = require("koa-router");
const mysql = require("mysql2");
const static = require('koa-static-cache');
const { koaBody  } = require("koa-body");
const nunjucks = require("nunjucks")

// 创建应用
const app = new Koa();
// 创建路由
const router = new Router();
// 创建mysql连接
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "shop"
})
// 抽离执行数据库操作方法
function query(sql, valus) {
    return new Promise((resolve, reject) => {
        connection.query(sql, valus, function (err, results) {
            if (err) {
                reject(err);
            } else {
                resolve(results)
            }

        })
    })
}
// 配置静态数据
const tpl = new nunjucks.Environment(new nunjucks.FileSystemLoader("./template"), {
    // 每次都从硬盘读取
    noCache: true,
    // 动态编译， 模版变化就重新编译
    watch: true
})
// 静态资源
app.use(static({
    prefix : "/public",
    dir: __dirname + '/public',
    gzip: true,
    // 开发中使用，动态监控静态目录文件变化
    dynamic: true
}))

// 动态资源
router.get('/register', async ctx => {
    ctx.body = tpl.render("register.html")
})

router.post('/register', koaBody(), async ctx => {
    let {name, password} = ctx.request.body;
    if (!name || !password) {
        return ctx.body = "注册参数出错"
    }
    let rs = await query(
        "insert into user (name, password) values (?, ?)",
        [
            name,password
        ]
    )
    ctx.body = "注册成功！"
})




app.listen(8888);
app.use(router.routes());
