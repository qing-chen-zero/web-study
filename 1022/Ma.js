console.log("我是Ma.js");
require("./Mb.js")
let a = 10;
class Person {
    constructor() {
        this.name = "张三"
    }
    hobby() {
        console.log("喜欢篮球");
    }
}

// module.exports = {
//     a,
//     Person
// }
exports.a = a;
exports.Person = Person;
// exports 是 module.exports 的 引用 module.exports = exports