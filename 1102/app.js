const Koa = require('koa');
const static = require('koa-static-cache')
const Router = require('@koa/router')
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "shop"
})

function query(sql, values) {
    return new Promise( (resolve, reject) => {
        connection.query(sql, values, function(err, results) {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        })
    })
}

const app = new Koa();
const router = new Router();
// const categories = require("./data/categories.json");
// const items = require("./data/items.json");
const nunjucks = require("nunjucks")

const tpl = new nunjucks.Environment(new nunjucks.FileSystemLoader("./template"), {
    // 每次都从硬盘读取
    noCache : true,
    // 动态编译， 模版变化就重新编译
    watch : true
});

// 静态
app.use( static({
    prefix : "/public",
    dir: __dirname + '/public',
    gzip: true,
    // 开发中使用，动态监控静态目录文件变化
    dynamic: true
}))

// 动态
router.get('/', async ctx => {

    let categories = await query(
        "select * from categories"
    )
    let items = await query(
        "select * from items limit 0,5"
    )

    ctx.body = tpl.render("index.html", {categories, items});
})
router.get('/login', async ctx => {
    ctx.body = tpl.render("login.html")
})
router.get('/register', async ctx => {
    ctx.body = tpl.render("register.html")
})
app.use( router.routes() )

app.listen(8888);