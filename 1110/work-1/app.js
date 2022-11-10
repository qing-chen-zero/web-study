const Koa = require("koa")
const { koaBody } = require("koa-body")
const Router = require("koa-router")
const mysql = require("mysql2")
const static = require("koa-static-cache")
const fs = require('fs')

const app = new Koa();
const router = new Router();
// 数据库连接
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "test_qingchen"
})

app.use(static({
    dir: __dirname + "/public",
    prefix: "/public",
    gzip: true,
    dynamic: true
}))
app.use(static({
    dir: __dirname + "/static/upload",
    prefix: "/static/upload",
    gzip: true,
    dynamic: true
}))

function query(sql, values) {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        })
    })
}


router.get('/upload', ctx => {
    ctx.body = fs.readFileSync('/public/index.html').toString();
})

const addItemKoaBodyOptions = {
    multipart: true,
    formidable: {
        // 上传后文件的存储目录
        uploadDir: __dirname + "/static/upload",
        keepExtensions: true,
    }
}

router.post('/upload', koaBody(addItemKoaBodyOptions), async ctx => {
    let { file } = ctx.request.files;
    let filename = "";
    let type = "";
    let size = 0;
    if (file) {
        let path = file.filepath.replace(/\\/g, '/');
        let lastIndex = path.lastIndexOf("/");
        filename = path.substring(lastIndex + 1);
    }
    type = file.mimetype
    size = file.size;

    let rs = await query(
        'insert into attachments (filename, type, size) values (?,?,?)',
        [
            filename, type, size
        ]
    )

    return ctx.body = {
        code: 0,
        message: "sucess",
        data: {
            filename
        }
    }
})

router.get('/', async ctx => {
    let res = await query(
        "select * from attachments"
    )
    return ctx.body = {
        code: 0,
        message: "success",
        data: {
            res
        }
    }
})

app.use(router.routes());

app.listen(8888);