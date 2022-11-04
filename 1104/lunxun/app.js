const http = require('http')
const fs = require('fs');

http.createServer( (req, res) => {
    let url = req.url;
    res.setHeader('content-type', 'text/html;charset=utf-8')
    if (url === "/") {
        
        res.end( fs.readFileSync('./index.html'));
    } else {
        if (url === '/getData') {
            let data = [
                {id :1 , title: "one"},
                {id :2 , title: "two"},
                {id :3 , title: "three"}
            ]
            res.end(JSON.stringify(data));
        }
    }
}).listen(9999);
