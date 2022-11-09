const Koa = require('koa');
const { koaBody } = require('koa-body');
const Router = require('@koa/router')
const mysql = require('mysql2');
const app = new Koa();
const router = new Router();


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "shop"
})

function query(sql, values) {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, function (err, results) {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        })
    })
}

router.get('/api', async ctx => {
    ctx.body = "欢迎使用api";
})

let users = [
    {id:1,name:"the one"},
    {id:2,name:"the two"}
]

router.get("/getUsers", async ctx => {
    ctx.body = users
})
router.post("/postUser", koaBody({
    multipart: true
}), async ctx =>{
    console.log(ctx.request.body);
    ctx.body = "提交成功";
})



app.use(router.routes())

app.listen(8888);