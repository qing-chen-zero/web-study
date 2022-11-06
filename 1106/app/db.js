const mysql = require("mysql2");
const items = require('./data/items.json');
const categories = require('./data/categories.json');

// 创建一个mysql的连接对象
const connection = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "123456",
    database: "shop"
})

// connection.query(
//     'select * from categories',
//     function(err, results) {
//         if (err) {
//             console.log("err:", err);
//         }
//         console.log(results);
//     }
// );

/*
    node中 针对异步有一些约定
    1. 通过回调函数方式
    2. 回调函数通常第一个参数是err， 第二个异步操作后的结果 first error
*/

for (let i = 0; i < items.length; i++) {
    let item = items[i];
    connection.query(
        "insert into `items` (`category_id`, `name`, `price`, `cover`) values (?,?,?,?)",
        [
            item.category_id,
            item.name,
            item.price,
            item.cover
        ],
        function(err, results) {
            if (err) {
                console.log(err);
            }
            console.log(results);
        }
    )
}

// for (let i = 0; i < categories.length; i++) {
//     let category = categories[i];
//     connection.query(
//         "insert into `categories` (`name`) values (?)",
//         [
//             category.name
//         ],
//         function(err, results) {
//             if (err) {
//                 console.log(err);
//             }
//             console.log(results);
//         }
//     )
// }
