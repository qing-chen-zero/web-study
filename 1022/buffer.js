// buffer 创建
// new Buffer()
// let buffer = Buffer.alloc(10);
// console.log(buffer);
let buffer = Buffer.from([0xe4,0xbd,0xa0,0xe5,0xa5,0xbd,0xe5,0x95,0x8a]);
console.log(buffer.toString());

let buffer1 = Buffer.from([0xe4,0xbd,0xa0,0xe5]);
let buffer2 = Buffer.from([0xa5,0xbd,0xe5,0x95,0x8a]);
console.log(buffer1.toString());
console.log(buffer2.toString());
let buffer_concat = Buffer.concat([buffer1, buffer2]);
console.log(buffer_concat.toString());

let { StringDecoder } = require("string_decoder");
let decoder = new StringDecoder();
let res1 = decoder.write(buffer1);
let res2 = decoder.write(buffer2)
console.log(res1);
console.log(res2);