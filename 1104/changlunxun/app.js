const http = require('http')
const fs = require('fs');


let resData;

http.createServer( async (req, res) => {
    let url = req.url;
    res.setHeader('content-type', 'text/html;charset=utf-8')
    if (url === "/") {
        res.end( fs.readFileSync('./index.html'));
    } else {
        if (url === '/getData') {
            resData = await new Promise((resolve) => {
                renderData();
                function renderData() {
                    let data = fs.readFileSync("./data.json").toString()
                    if (data == resData) {
                        // 数据没变化，等1秒再读
                        console.log("数据没变化");
                        setTimeout(renderData, 1000);
                    } else {
                        console.log("数据变了");
                        resolve(data);
                    }
                }
            })
            res.end(resData);
        }
    }
}).listen(9999);


