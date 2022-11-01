const http = require("http")
const fs = require("fs")
// const nunjucks = require("./libs/nunjucks")
const nunjucks = require("nunjucks");
const mime = require("./mime.json")
const categories = require("./data/categories.json")

const tpl = new nunjucks.Environment(new nunjucks.FileSystemLoader("./template"), {
    // 每次都从硬盘读取
    noCache : true,
    // 动态编译， 模版变化就重新编译
    watch : true
});
// let content = tpl.renderString("hello {{ username }}", {
//     username: "qing-chen-zero"
// })


const server = http.createServer((req, res) => {
    const url = req.url;
    let responseContent = "";
    if (url.startsWith('/public')) {
        // 静态资源处理
        // 以/public开头，访问的是静态资源
        // /public/1.html
        // __dirname => 存储的是当前目标的绝对路径
        const file = __dirname + url;
        const lastIndex = url.lastIndexOf(".");
        const suff = url.substring(lastIndex);
        res.setHeader("Content-Type", mime[suff])

        responseContent = fs.readFileSync(file).toString()

        
    } else {
        // 动态资源处理
        if (url === "/") {
            // responseContent = fs.readFileSync("./template/index.html")
            // 在设置的目录下进行查找
            responseContent = tpl.render("index.html", {
                categories
            });
        }

    }
    res.end(responseContent);
});

server.listen(8888)