const http = require('http')
const fs = require('fs');
const socket = require('socket.io');

// 创建httpserver 服务器对象
const server = http.createServer( async (req, res) => {
    let url = req.url;
    if (url === "/") {
        res.setHeader('content-type', 'text/html;charset=utf-8');
        res.end( fs.readFileSync('./index.html'));
    } else {
        
    }
});

// 在httpServer构建一个socket server 对象
// io 已经处理了一个特殊请求 /socket.io/socket.io.js 
const io = socket(server)

io.on('connection', (socket) => {
    console.log('a user connected');

    // 给当前连接的客户端 socket 发送一个事件
    // socket.emit 给指定的客户端socket对象发消息
    socket.emit('hello', {
        id: socket.id
    })
    // 给处理自己以外的其他对象发送消息
    socket.broadcast.emit('hi',{id:socket.id});

    // 接受来自客户端推送过来的消息
    socket.on('message', function(data){
        socket.emit('data', {
            id: socket.id,
            message: data.message
        })
        socket.broadcast.emit('data',{id:socket.id,message: data.message});
    })
})

server.listen(9999);



