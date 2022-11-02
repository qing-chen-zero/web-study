const Koa = require('koa');
const { koaBody } = require('koa-body');
const static = require('koa-static-cache')
const Router = require('@koa/router')
const mysql = require('mysql2');
const nunjucks = require("nunjucks")


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
router.get('/:categoryId(\\d?)', async ctx => {
    
    let categoryId = Number(ctx.params.categoryId);
    let page = Number(ctx.query.page) || 1;

    // console.log(page);
    let categories = await query(
        "select * from categories"
    )
    let where = ""
    if (categoryId) {
        where = `where category_id = ${categoryId}`;
    }

    // 处理分页 
    // 每页显示条数
    let prepage = 8;
    let start = (page-1) * prepage;

    // 获取数据库总条数
    let [{count}] = await query(
        `select count(id) as count from items ${where}`
    )
    let pages = Math.ceil(count / prepage)

    page = Math.max(page, 0);
    page = Math.min(page, pages);
    let items = await query(
        `select * from items ${where} order by id desc limit ?, ?`,
        [
            start,
            prepage
        ]
    )

    ctx.body = tpl.render("index.html", {categories, items, count, pages, page});
})
router.get('/login', async ctx => {
    ctx.body = tpl.render("login.html")
})
router.get('/register', async ctx => {
    ctx.body = tpl.render("register.html")
})

router.get('/addItem', async ctx => {
    let categories = await query(
        "select * from categories"
    )
    ctx.body = tpl.render("addItem.html", {
        categories
    })
})


router.post('/addItem', koaBody(), async ctx => {
    let {categoryId, name, price} = ctx.request.body

    if ( !name || !price ) {
        return ctx.body = "参数错误";
    }

    let rs = await query(
        "insert into items (category_id, name, price) values (?, ?, ?)",
        [
            categoryId,name,price
        ]
    )


    ctx.body = "添加成功"; // ctx.body ==> ctx.response.body
})

app.use( router.routes() )

app.listen(8888);