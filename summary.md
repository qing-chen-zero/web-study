# 面向对象编程思想

一、面向过程：注重解决问题的步骤、分析问题需要的每一步，实现函数依次调用

二、面向对象：是一种程序设计思想。讲数据和处理数据的程序封装到对象中

三、面向对象特征：抽象、继承、封装、多态

优点：提高代码的复用性及可维护性

new 运算法

## 简化工程模式

```javascript
        //改写Person 类
        function Person1(name, age, hobby){
            // let obj = {}
            this.name = name;
            this.age = age;
            this.hobby = function() {
                console.log(hobby);
            }
            // return obj; 自动返回this
        }
	
				//原Person类
				function Person(name, age, hobby){
            let obj = {}
            obj.name = name;
            obj.age = age;
            obj.hobby = function() {
                console.log(hobby);
            }
            return obj;
        }
```

### 类里的方法创建很浪费空间。使用原型解决问题

~~~javascript
//使用原型解决空间浪费问题
function Person2(name) {
    this.name = name;
    this.age = 20;
}
Person2.prototype.hobby = function() {
		console.log("喜欢我");
}
~~~

### 每个实例化对象都有一个__"___proto_"与 函数的prototype 一致

### 使用constructor判断类型

~~~javascript
//使用constructor判断类型
let type = new String("test");
let types = "test";
console.log(type.constructor === String);
console.log(types.constructor ===  String);
~~~

![image-20221011192410752](/Users/qingchen/Library/Application Support/typora-user-images/image-20221011192410752.png)

### 原型链

~~~ javascript
//原型查找顺序
//构造函数内部查找->原型上->原型链上
function Person() {
		this.age=20;
		this.test = "hello";
}
Person.prototype.test = "hi";
Object.prototype.test = "你好";
~~~

### call改变this指向

~~~ javascript
function foo(name, age) {
  console.log(this, "姓名：" + name + "年龄是：" + age);
}
let call_test = {
  name: "张三"
}
foo.call(call_test, "张三", 20); // 改变this指向
        
~~~

### apply不同的是，传参需要用数组

~~~ javascript
foo.apply(call_test, ["张三", 20]);
~~~

### bind不同，返回的是新的函数，需要通过第二个括号进行传参

~~~ javascript
foo.bind(call_test)("张三",20);
~~~

## 继承

### 子类继承父类

#### 子类的prototype = 父类的prototype时，重写子类的原型，回覆盖父类

~~~ javascript	
function Dad(name, age) {
  this.name = name;
  this.age = age;
  this.money = "10000";
}
Dad.prototype.fn = function() {
  console.log("fn");
}
function Son(name,age) {
  // Dad.call(this,name, age);
  // Dad.apply(this,[name,age])
  Dad.bind(this)(name,age);
}
Son.prototype = Dad.prototype;
Son.prototype.fn = function() {
  console.log("我是重写的fn");

}
let zhangsan = new Son("张三", 20);
zhangsan.fn()
let father = new Dad("father",42);
father.fn()
//log 我是重写的fn 
~~~

##### 简单数据类型 传值、 复杂数据类型 传址

## 深拷贝

### 1. JSON转换

#### 问题：函数、undefined 不会拷贝

~~~ javascript
// 使用深拷贝解决此问题  深拷贝 重新开辟地址空间
let DadPrototype = {
  name: "张三",
  age: 20,
  fn: function () {
    console.log("fn...");
  },
  test: undefined
}
//使用JSON进行转化，序列化 但会丢失方法与undefined

let SonPrototype = JSON.parse(JSON.stringify(DadPrototype));
SonPrototype.name = "里斯";
console.log("son:", SonPrototype);
console.log("dad:", DadPrototype);
~~~

### 2. 自制深拷贝方法

~~~ javascript
let obj = {
  name: "张三",
  age: 20,
  fn: function () {
    console.log("fn...");
  },
  test: undefined,
  arr: [1,5,1,7]
}

let obj2 = deepCopy(obj);
obj2.name = "里斯"
console.log(obj);

console.log(obj2);
// 使用深拷贝方法
function deepCopy(obj) {
  let newObj = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === "object") {
        newObj[key] = deepCopy(obj[key]);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  return newObj;
}
~~~

# 面向对象01 

## ES5 类

~~~ javascript
function Person(name) {
  this.name = name;
  this.age = 20;
  this.fn = function() {
    console.log("fn");
  }
}
Person.prototype.hobby = function() {
  console.log("love me");
}
let zhagnsan = new Person("张三")
~~~

## ES6 类 语法糖

~~~ javascript
//ES6 语法糖
class People {
  constructor(name) {
    this.name = name;
    this.age = 20;
    this.fn = function() {
      console.log("fn");
    }
  }
  hobby() {
    console.log("love you");
  }
}
let lisi = new People("里斯")
~~~

## 共有私有 ES5 compare ES6

~~~ javascript	
// ES5 共有私有
function Person(name) {
  let _little_name = "狗蛋";
  this.name = name;
  this.age = 20;
}

let zhangsan = new Person("张三");
console.log(zhangsan._little_name);

//ES6 共有私有
class Personal {
  // 私有属性
  #little_name = "杨二狗";
  constructor(name) {
    this.name = name;
    this.age = 20;

  }
  getName() {
    console.log(this.#little_name);
  }
}
let liwu = new Personal("里屋");
liwu.getName()
console.log(liwu.little_name)
~~~

## 静态属性

~~~ javascript
// 静态属性 属于类， 实例话对象后访问不到 ES5
function Person(name) {
  let _little_name = "狗蛋";
  this.name = name;
  this.age = 20;
}
let zhangsan = new Person("张三");
Person.num = 10;
console.log(Person.num);
console.log(zhangsan.num);
// ES6 静态属性
class Man {
  static num = 10;
  constructor(name) {
    this.name = name;
    this.age = 20;
  }
}

let xiaoming = new Man("小明")
console.log(xiaoming.num); // 访问不到
console.log(Man.num);
~~~

## 实例化一次

~~~ javascript
// 只实例化一次
class Once {
  static instance = null;
  constructor(name) {
    if (!Once.instance) {
      //记录实例化对象
      console.log("第一次实例化");
      Once.instance = this;
    } else {
      return Once.instance;
    }
    this.name = name;
  }
}

let wanger = new Once("王二");
let mazi = new Once("麻子");
console.log(wanger, mazi);
//Once {name: '王二'}name: "王二"[[Prototype]]: Object Once {name: '王二'}
~~~

## 继承

~~~ javascript
//ES5 继承
function Dad(name) {
  this.name = name;
  this.age = 50;
}
function Son(name) {
  Dad.call(this,name);
}
let test = new Son("test");
console.log(test.age);

// ES6 继承
class Daddy {
  constructor(name) {
    this.name = name;
    this.age = 50;
  }
}
class Daughter extends Daddy {
  constructor(name) {
    super(name); // 使用super把name 传给父类 super 一定要在自定义属性之前
    this.height = "180cm";
  }
}

let test1 = new Daughter("test1");
console.log(test1.age);
~~~

## 合并空运算符

~~~ javascript
function test(name, age) {
  // name = name || "默认名称";
  // age = age || 25;
  name = name ?? "默认名称";
  age = age ?? 25;
  console.log(name,age);
}
test("", 0);
test("张三",20)
~~~

## 可选链式操作

~~~ javascript	
// 可选链式操作
let obj = {
  name: {
    age:20
  }
};
console.log(obj?.name?.age); // 如果没有不会报错， 输出undefined
~~~

# ESM 模块化 ES Module

## 导入 import from

~~~ html
<script type="module">
  import b, {a, c} from "./a.js";
</script>
~~~

## 导出 export / export default

~~~ javascript
// a.js
//导出多个
export let a = 10;
export let c = 30;

let b = 20;
//导出一个
export default b;
~~~

## 通过as 起别名

~~~ javascript
import {obj as info} from "./a.js";
~~~

## 通过通配符 * 一次性导入

~~~ javascript
import * as info from "./a.js";
~~~

## 按需导入

~~~ javascript
document.onclick = async function() {
  // import b from "./b.js";  // 此写法会报错，不能这样导入。 只能在外面导
  // 返回Promise对象
  // import("./b.js").then(res => {
  //     console.log(res);
  // })
  // 改写同步异步
  let res = await import("./b.js");
  console.log(res);
}
~~~

# 设计模式

## 设计原则

###　单一原则

### 开闭原则

· 对内是封闭、对外扩展开放

## 设计模式

· 设计模式∶是软件开发人员在软件开发过程中面临的一些具有代表性问题的解决方案。这些解决方案是众多软件开发人员经过相当长的一段时间的试验和错误总结出来的

### 单例模式

·一个实例 （jq --> $）

~~~ javascript
class Person {
    static instance = null;
    constructor(name) {
        if (Person.instance) {
            return Person.instance;
        }
        Person.instance = this
        this.name = name
    }
}
let zhangsan = new Person("张三");
let lisi = new Person("里斯");
console.log(zhangsan, lisi);

// 模块化效果
// single.js
class Person {
    // static instance = null;
    constructor(name) {
        // if (Person.instance) {
        //     return Person.instance;
        // }
        // Person.instance = this
        this.name = name
    }
}
let instance;

export default function createInstance(arg){
    if (!instance) {
        instance = new Person(arg);
    }
    return instance;
}

// js 调用
console.log(new Person("张三"));
console.log(new Person("里斯"));

// 输出
Person {name: '张三'}
Person {name: '张三'}
~~~

