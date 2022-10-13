// 导出  模块化 防止 变量污染
let str = "我不导出，就拿不到"
console.log("==>>a.js<<===");
//导出多个
export let a = 10;
export let c = 30;
export let obj = {
    name: "张三",
    age : 20
}

let b = 20;
//导出一个
// export default b;
export {b as default};