// stream 流
const fs = require("fs");
// let res = fs.readFileSync("/Users/qingchen/Developer/web-study/1022/1.txt")
// console.log(res.toString());

// 如果文件过大，内存溢出. 流把数据拆分成64k的大小
let rs = fs.createReadStream("./1022/1.txt");
let ws = fs.createWriteStream("./1022/2.txt");
rs.pipe(ws) // 管道
let str = "";
rs.on("data", chunk=>{
    str += chunk;
    // console.log(chunk);
    // console.log("拆封");
})
// 流完成了
rs.on("end", ()=>{
    console.log(str);
})
// 创建65kb的文件
// let buffer = Buffer.alloc(65*1024);
// fs.writeFile("./1022/65Kb", buffer, err=>{
//     if(err) return console.log(err);
//     console.log("创建成功");
// })