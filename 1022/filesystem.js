const { log } = require("console");
const fs = require("fs");  // 文件操作
// 增删改查
// 1.文件操作
// 2.目录操作

// 1 文件操作
// fs.writeFile("1.txt", "我是写入的文字", function(err){
//     if(err) {
//         return console.log(err);
//     }
//     console.log("success");
// })
// flag :
//      a : 追加写入
//      w : 写入
//      r : 读取
// fs.writeFile("1.txt", "我是追加的文字", {flag: "a"}, function(err){
//     if(err) {
//         return console.log(err);
//     }
//     console.log("success");
// })


// 文件读取
// fs.readFile("1.txt","utf8", (err, data) => {
//     if (err) {
//         return console.log(err);
//     }
//     console.log(data);
// })

// fs.readFile("1.txt", (err, data) => {
//     if (err) {
//         return console.log(err);
//     }
//     console.log(data.toString());
// })

// 所有的文件操作， 没有加Sync都是异步， 否则都是同步

// let data = fs.readFileSync("1.txt")
// log(data.toString())

// 修改 修改名称
// fs.rename("1.txt", "2.txt", err=>{
//     if (err) {
//         return log(err)
//     }
//     log("修改成功")
// })

// 删除
// fs.unlink("2.txt", (err) => {
//     if (err) {
//         return log(err);
//     }
//     log("删除成功")
// })

// 复制 先读取，再写入，
// fs.copyFile("index.js", "myindex.js", err=>{
//     if (err) {
//         return log(err);
//     }
//     log("复制成功")
// })

// function myCopy(src, dest) {
//     fs.writeFileSync(dest,fs.readFileSync(src))
// }

// myCopy("index.js", "test.js")

// 目录操作
// 创建文件夹
// fs.mkdir("11", err=>{
//     if (err) {
//         return log(err)
//     }
//     log("创建成功")
// })

// fs.rename("11","22", err=> {
//     if (err){
//         return log(err)
//     };
//     log("修改成功")
// })

// fs.readdir("22",(err, data)=>{
//     if (err) {
//         return log(err)
//     }
//     log(data)
// })

// 删除目录 必须是空文件夹/目录
// fs.rmdir("11", err=>{
//     if (err) {
//         return log(err)
//     };
//     log("删除成功")
// })

// 判断文件或者目录是否存在
fs.exists("222", exist=>{
    log(exist)
})

// 获取文件或者目录的详细信息
fs.stat("index.js", (err, stat) => {
    if (err) {
        return log(err);
    }
    log(stat);
    // 判断是否是一个文件
    log(stat.isFile());
    // 判断是否为文件夹
    log(stat.isDirectory())
})