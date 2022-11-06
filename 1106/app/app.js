const Koa = require('koa');
const { koaBody } = require('koa-body');
const static = require('koa-static-cache')
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

// 处理cookie
app.use( async (ctx, next ) => {
    let id = ctx.cookies.get('id');
    let name = ctx.cookies.get('name');
    ctx.state.use = {}
    if (id) {
        // ctx.state 专门存储用户自定义数据
        ctx.state.user = {
            id, name
        }
    }
    await next();
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


// 静态
app.use(static({
    prefix: "/public",
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
    let start = (page - 1) * prepage;

    // 获取数据库总条数
    let [{ count }] = await query(
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

    ctx.body = {
        code: 0,
        message: '',
        data : {
            items, count, pages, page
        }
    }
    // ctx.body = tpl.render("index.html", { 
    //     categories, items, count, pages, page, user: ctx.state.user,
    // });
})


// 处理登陆请求
router.get('/login', async ctx => {
    let categories = await query(
        "select * from categories"
    )
    ctx.body = tpl.render("login.html", {categories,})
})
router.post('/login', koaBody(), async ctx => {
    let {name, password} = ctx.request.body;
    if (!name || !password) {
        return ctx.body = tpl.render("message.html", {
            message: "参数错误",
            url : 'javascript:history.back()',
        })
    }
    let [res] = await query(
        "select * from user where name = ? and password = ?",
        [name, password]
    )
    if (res) {
        // ctx.set('Set-Cookie', `id=${res.id}; name=${res.name}`)
        ctx.res.setHeader('Set-Cookie', ['id='+res.id, 'name=' + res.name])
        // ctx.cookies.set('key','value')
        return ctx.body = tpl.render("message.html", {
            message: "登陆成功",
            url : '/',
            user: ctx.state.user,
        })
    } else {
        return ctx.body = tpl.render("message.html", {
            message: "用户名密码不正确",
            url : 'javascript:history.back()',
            user: ctx.state.user,
            
        })
    }
})


// 处理注册请求
router.get('/register', async ctx => {
    let categories = await query(
        "select * from categories"
    )
    ctx.body = tpl.render("register.html", {categories})
})
router.post('/register', koaBody(), async ctx => {
    let {name, password, repassword} = ctx.request.body;
    if (!name || !password) {
        return ctx.body = tpl.render("message.html", {
            message: "参数错误",
            url : 'javascript:history.back()',
        })
    }
    if (password !== repassword) {
        return ctx.body = tpl.render("message.html", {
            message: "两次密码不一致",
            url : 'javascript:history.back()',
        })
    }
    let rs = await query(
        "insert into user (name, password) values (?, ?)",
        [
            name,password
        ]
    )
    ctx.body = tpl.render("message.html", {
        message: "注册成功，请登录",
        url: '/login',
        user: ctx.state.user,
    })
})


// 处理添加商品请求
router.get('/addItem', async ctx => {

    if (!ctx.state.user) {
        return ctx.body = tpl.render('message.html', {
            message: "你无权限访问此页面, 请先登录",
            url: "/login"
        })
    }


    let categories = await query(
        "select * from categories"
    )
    ctx.body = tpl.render("addItem.html", {
        categories,
        user: ctx.state.user,
    })
})

const addItemKoaBodyOptions = {
    // 开启 multipart/form-data 的支持 
    // 如果multipart包含了文件（图片、音频等file） 是通过 ctx.request.files 进行访问
    multipart: true,
    // 处理上传文件的后续逻辑，比如上传后的文件存储对象
    formidable: {
        // 上传后文件的存储目录
        uploadDir: __dirname + "/public/images",
        keepExtensions: true,
  }
}

router.post('/addItem', koaBody(addItemKoaBodyOptions), async ctx => {
    let { categoryId, name, price } = ctx.request.body;
    let { cover } = ctx.request.files;
    let file_name = "";
    // console.log(cover);
    if (cover) {
        // 通过caver.path 把上传后的文件名称获取到
        // 通过正则替换，统一路径格式，比如把windos下的 \ 替换为 /
        let path = cover.filepath.replace(/\\/g, '/');
        let lastIndex = path.lastIndexOf('/');
        file_name = path.substring(lastIndex + 1)
    }

    if (!categoryId || !name || !price || !cover) {
        return ctx.body = tpl.render("message.html", {
            message: "参数错误",
            url : 'javascript:history.back()',
            user: ctx.state.user,
        })
    }

    let rs = await query(
        "insert into items (category_id, name, price, cover) values (?, ?, ?, ?)",
        [
            categoryId,name,price, file_name
        ]
    )

    let categories = await query(
        "select * from categories"
    )

    // // ctx.body = "添加成功"; // ctx.body ==> ctx.response.body
    ctx.body = tpl.render("message.html", {
        message: "添加成功",
        url: "/",
        categories,
        user: ctx.state.user,
    })
})


// 处理推出逻辑
router.get('/quit', ctx => {
    ctx.cookies.set('name','')
    ctx.cookies.set('id','')
    ctx.body = tpl.render('message.html', {
        message: "您已退出，进入首页",
        url : '/'
    })
})

// Ajax-

// 获取分类
router.get('/getTypes', async ctx => {
    let types = await query(
        'select * from categories'
    );
    ctx.body = {
        code: 0,
        message: "",
        data: types
    }
})

// // 获取商品
// router.get('/getItems', async ctx => {
//     let types = await query(
//         'select * from items'
//     );
//     ctx.body = {
//         code: 0,
//         message: "",
//         data: types
//     }
// })







app.use(router.routes())

app.listen(8888);