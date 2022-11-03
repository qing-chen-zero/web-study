// node 内置的http模块可以监听网卡数据 进行网络编程
const http = require('http');

const server = http.createServer((req, res) => {
    res.end("app");
})

server.listen(8888);