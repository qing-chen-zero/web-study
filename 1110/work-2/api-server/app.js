const Koa = require('koa');
const { koaBody } = require('koa-body');
const Router = require('@koa/router')
const static = require("koa-static-cache");
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const app = new Koa();
const router = new Router();


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "test_qingchen"
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
app.use(static({
    dir: __dirname + "/static/upload",
    prefix: "/static/upload",
    gzip: true,
    dynamic: true
}))

router.get('/api', async ctx => {
    ctx.body = "欢迎使用api";
})

let users = [
    { id: 1, name: "the one" },
    { id: 2, name: "the two" }
]

router.get("/getUsers", async ctx => {
    ctx.body = users
})
router.post("/postUser", koaBody({
    multipart: true
}), async ctx => {
    console.log(ctx.request.body);
    ctx.body = "提交成功";
})

router.get('/getPhotos', author, async ctx => {
    let data = await query("select * from attachments where uid = ?",[ctx.state.user.id])
    return ctx.body = {
        code: 0,
        message: "success",
        data
    }
})


const addItemKoaBodyOptions = {
    multipart: true,
    formidable: {
        // 上传后文件的存储目录
        uploadDir: __dirname + "/static/upload",
        keepExtensions: true,
    }
}

router.post('/upload', author, koaBody(addItemKoaBodyOptions), async ctx => {
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
        'insert into attachments (filename, type, size,uid) values (?,?,?,?)',
        [
            filename, type, size, ctx.state.user.id
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

router.post('/login', author,  koaBody({ multipart: true }), async ctx => {
    const { name, password } = ctx.request.body;
    if (!name || !password) {
        ctx.body = {
            code: 1,
            message: "用户名或密码不能为空"
        }
        return ;
    };
    let [data] = await query(
        "select * from user where name = ? and password = ?", 
        [
            name, password
        ]
    );
    if (!data) {
        ctx.body = {
            code: 2,
            message: "用户名或密码不正确"
        }
        return ;
    }

    let token = jwt.sign({id: data.id, name: data.name}, 'jiajia');
    ctx.set("Authorization", token)

    console.log(data);
    ctx.body = {
        code: 0,
        message: "登陆成功",
        data
    }
})


app.use(router.routes())

app.listen(8888);

async function author(ctx, next) {
    let authorization = ctx.get('authorization');
    // console.log(authorization);
    let user;
    try {
        user = jwt.verify(authorization, "jiajia");
    }catch(e) {
        console.log(e);
    }
    if (user) {
        ctx.state.user= user;
        await next();
    } else {
        ctx.throw(401);
    }
}