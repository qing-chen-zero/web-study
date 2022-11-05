const Koa = require('koa');
const static = require("koa-static")
const Router =require("koa-router")
const usersData = require("./data/users.json")
const { koaBody } = require('koa-body');
const fs = require('fs');

let app = new Koa();
app.use( static(__dirname+"/static") );

let router = new Router();

router.get("/", (ctx, next) => {
    ctx.body = "hello";
})

router.get('/checkUserName', (ctx,next) => {
    let res = usersData.find(v=>v.username == ctx.query.username);
    if (res) {
        ctx.body = {
            status: 1,
            info: "用户名正确"
        };
    }else {
        ctx.body = {
            status: 2,
            info: "用户名错误"
        }
    }
    
})

router.get('/get/:id', (ctx, next) => {
    console.log(ctx.params);
    ctx.body = {
        status: 1,
        info: "请求成功"
    }
})

router.post('/post', koaBody(), (ctx, next)=> {
    console.log(ctx.request.body);
    ctx.body = {
        status : 1,
        info: "post请求成功"
    }
})

router.get('/xml', (ctx, next) => {
    // ctx.set("content-type","text/xml");
    ctx.body = `<?xml version='1.0' encoding='utf-8' ?>
                    <books>
                        <nodejs>
                            <name>nodejs</name>
                            <price>16</price>
                        </nodejs>
                        <react>
                            <name>react</name>
                            <price>26</price>
                        </react>
                    </books>
                `
})

router.post('/upload', koaBody({multipart:true}), (ctx,next) => {
    console.log(ctx.request.body);
    console.log(ctx.request.files.img);
    let fileData = fs.readFileSync(ctx.request.files.img.filepath);
    fs.writeFileSync("static/imgs/" + ctx.request.files.myfile.originalFilename,fileData)
    ctx.body = "success";
})

router.post('/fileUpload', (ctx, next) => {
    console.log(ctx.request.files);
    let fileData = fs.readFileSync(ctx.request.files.myfile.filepath);
    fs.writeFileSync("static/imgs/" + ctx.request.files.myfile.originalFilename,fileData)
    ctx.body = "请求成功";
})
app.use(router.routes());
app.listen(3000);