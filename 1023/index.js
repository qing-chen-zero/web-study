const http = require("http")
const fs = require("fs")
const server = http.createServer()

server.listen(8888);

server.on("request", (req, res)=>{
    const url = req.url
    let resContent = "";
    if (url == "/") {
        let res = fs.readFileSync("./public/index.html").toString();
        resContent = res
    }
    res.end(resContent)
})