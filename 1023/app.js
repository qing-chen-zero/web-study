// 加载node.js内置模块 http 使用它进行基于http的网络编程
const http = require("http")
const fs = require("fs");
const mime = require("./mime.json");
// 使用http.Server 类创建一个server对象，
// 这个对象可以监听网卡、端口，就可以对请求发送的数据进行处理，然后进行返回
// const server = new http.Server()
// 也可以通过http的一个静态工厂方法来创建这个对象
// const server = http.createServer(()=>{
//     // 等同 connection 事件
//     console.log("有人发起了请求"); 
// });

const server = http.createServer();
// 后期使用数据库存储，数据会交互
const users = [
    {id : 1, username: "qing-chen", gender: "男"},
    {id : 2, username: "chen-qing", gender: "男"}
]

server.on("connection", (socket)=> {
    console.log("有人发生请求了");
    // console.log("socket", socket);
})

server.on("request", (req,res)=>{
    // 与请求的客户端信息有关的数据和方法通过 req 对象提供
    // console.log("req",req);
    // 与服务对岸信息有关的数据和方法通过 res 对象提供
    // console.log("res",res);

    // console.log("url", req.url);
    // res.write("hello nodejs");
    // res.end();

    const url = req.url;
    let resContnet = "";
    
    // if (url == "/") {
    //     // 返回一个字符串
    //     resContnet = "hello,nodejs";
    // } else if (url == "/now") {
    //     resContnet = (new Date).toString();
    // } else if (url == "/qqc") {
    //     resContnet = "hello, qqc";
    // } else {
    //     resContnet = "啥也不是";
    // }

    // if (url == "/1.html") {
    //     resContnet = fs.readFileSync("./public/1.html");
    // } else if (url == "/1.css") {
    //     resContnet = fs.readFileSync("./public/1.css");
    // }

    // 设置头部信息
    

    if (url.startsWith("/public")) {
        // url ==> /public/1.html ==> ./public/1.html
        // 截取最后一个. 获取文件类型
        const lastIndex = url.lastIndexOf(".")
        const suff = url.substring(lastIndex);

        res.setHeader("Content-Type", mime[suff] + ";charset=utf-8");

        resContnet = fs.readFileSync("." + url);
    } else {
        if (url == "/now") {
            resContnet = (new Date).toString();
        } else if (url == '/users') {
            res.setHeader("Content-Type", "text/html;charset=utf-8");
            // resContnet = JSON.stringify(users);

            let data = {
                title: 'qqc'
            };

            data.str =  users.map(user => {
                return `<li>${user.username}</li>`;
            }).join('')

            let tplConent = fs.readFileSync("./template/user.html").toString();
            tplConent = tplConent.replace(/\$\{(\w+)\}/gi, function($0, $1) {
                return data[$1];
            });
            
            resContnet = tplConent;
        } 
        else {
            resContnet = "啥也没有～";
        }
    }

    res.end(resContnet);
})

// 监听网卡和端口
server.listen(8888, ()=>{
    console.log("服务启动成功");
});