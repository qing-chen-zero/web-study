const Koa = require('koa');
const { koaBody } = require('koa-body');
const Router = require('@koa/router')
const mysql = require('mysql2');
const app = new Koa();
const router = new Router();
const jwt = require('jsonwebtoken');


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
    if (ctx.get('Authorization')) {
        let token = ctx.get('Authorization');
        let decoded = jwt.verify(token.replace('Bearer ', ''), 'jiajia');
        // console.log(decoded);
        if (!decoded) {
            ctx.body = '无权限访问';
            return;
        }
    }
    ctx.body = "欢迎使用api";
})

let users = [
    { id: 1, name: "the one", password: '123' },
    { id: 2, name: "the two", password: '123' }
]


router.post('/login', async ctx => {
    let token = jwt.sign({id: 1, name: 'the one'}, 'jiajia')
    console.log("token", token);
    ctx.set('Authorization', 'Bearer ' + token)
    ctx.body = "登陆成功";
})



app.use(router.routes())

app.listen(8888);