const Koa = require("koa")
const {koaBody} = require("koa-body")
const Router = require("koa-router")
const mysql = require("mysql2")
const static = require("koa-static-cache")
const nunjucks = require("nunjucks")

const app = new Koa()
const router = new Router()
// 数据库连接
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "test_qingchen"
})

function query(sql, values) {
    return new Promise( (resolve, reject) => {
        connection.query(sql, values, (err, results)=> {
            if (err) {
                reject(err);
            }else {
                resolve(results);
            }
        })
    })
}

const tpl = new nunjucks.Environment(new nunjucks.FileSystemLoader("./template"), {
    // 每次都从硬盘读取
    noCache : true,
    // 动态编译， 模版变化就重新编译
    watch : true
});

router.get('/upload', ctx => {
    ctx.body = tpl.render('upload.html');
})

const addItemKoaBodyOptions = {
    multipart: true,
    formidable: {
        // 上传后文件的存储目录
        uploadDir: __dirname + "/attachments",
        keepExtensions: true,
  }
}

router.post('/upload', koaBody(addItemKoaBodyOptions), async ctx => {
    let {file} = ctx.request.files;
    let filename = "";
    let type = "";
    let size = 0;
    if (file) {
        let path = file.filepath.replace(/\\/g, '/');
        let lastIndex = path.lastIndexOf("/");
        filename = path.substring(lastIndex+1);
    }
    type = file.mimetype
    size = file.size;

    let rs = await query(
        'insert into attachments (filename, type, size) values (?,?,?)',
        [
            filename,type,size
        ]
    )
    
    return ctx.body = "success";
})

app.use( router.routes());

app.listen(8888);