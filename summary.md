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

### 工厂模式

~~~ javascript
function Factory() {
    let obj = {}
    obj.name = "张三";
    obj.age = 20;
    //出厂
    return obj;

}
let object = Factory()
console.log(object);

class Luban {
    constructor () {
        this.name = "鲁班"
    }
}
class Yase {
    constructor () {
        this.name = "亚瑟"
    }
}
class Wangzhaojun {
    constructor () {
        this.name = "王昭君"
    }
}

function fac(name){
    switch(name) {
        case 'yase' :
            return new Yase();
            break;
        case 'luban' :
            return new Luban();
            break;
        case 'wangzhaojun' :
            return new Wangzhaojun();
            break;    
    }
}
console.log(fac("luban"));
~~~

### 装饰者模式

~~~ javascript
// @ 装饰器  需要配置webpack环境
class Hero {
    constructor(name) {
        this.name = name;
    }
    fire() {
        console.log("释放技能");

    }
}

class MyHero extends Hero {
    constructor(name) {
        super(name);
    }
    fire() {
        super.fire()
        // 造成伤害
        console.log("造成100点伤害");
    }
}
let yase = new MyHero("亚瑟")
yase.fire()


//装饰器
function Hurt() {
    console.log("造成200点伤害");
}
Function.prototype.Decorator = function (fn) {
    this();
    fn()
}

let luban = new Hero("鲁班");
// luban.fire();
luban.fire.Decorator(Hurt)
~~~

# 封装组件

~~~ html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>组件封装</title>
    <style>
      .k-dialog {
        width: 30%;
        z-index: 20001;
        display: block;
        position: absolute;
        background: #fff;
        border-radius:  2px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
        margin: 0 auto;
        top: 15vh;
        left: 30%;
      }
      .k-wrapper {
        position: fixed;
        left: 0px;
        top: 0px;
        bottom: 0px;
        right: 0px;
        background: black;
        opacity: .4;
        z-index: 20000;
      }
      .k-header {
        padding: 20px 20px 10px;
      }
      .k-header .k-title {
        line-height: 24px;
        font-size: 18px;
        color: #303133;
        float: left;
      }
      .k-body {
        padding: 30px 20px;
        color: #606266;
        font-size: 14px;
      }
      .k-footer {
        padding: 10px 20px 30px;
        text-align: right;
      }
      .k-close {
        color:  #909399;
        font-weight: 400;
        float: right;
        cursor: pointer;
      }
      .k-cancel {
        color: #606266;
        border: 1px solid #dcdfe6;
        text-align: center;
        cursor: pointer;
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 4px;
        font-weight: 500;
        margin-right: 10px;
      }
      .k-cancel:hover {
        color: #409eff;
        background: #ecf5ff;
        border-color: #c6e2ff;
      }
      .k-primary {
        border: 1px solid #dcdfe6;
        text-align: center;
        cursor:pointer;
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 4px;
        font-weight: 500;
        background: #409eff;
        color: #fff;
        margin-left: 10px;
      }
      .k-primary:hover {
        background: #66b1ff;
      }
      .k-input {
        width: 100%;
        margin-left: 20px;
        margin-bottom: 20px;
      }
      .input-inner {
        -webkit-appearance:none;
        background-color:#fff;
        background-image:none;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        height: 40px;
        line-height: 40px;
        outline: none;
        padding: 0 15px;
        transition: border-color .2s
          cubic-bezier(.645, .045, .355, 1);
        width: 100%;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <!-- <div class="k-wrapper"></div>
<div class="k-dialog">
<div class="k-header">
<span class="k-title">提示</span>
<span class="k-close">X</span>
</div>
<div class="k-body">
<span>这是一段文本</span>
<input type="text" class="input-inner" />
</div>
<div class="k-footer">
<span class="k-cancel">取消</span>
<span class="k-primary">确定</span>
</div>
</div> -->

    <button class="btn">点击</button>
    <button class="btn2">输入框</button>
    <my-dialog
               title="我的标题"
               content="我的内容"
               >自定义组件</my-dialog>

    <script type="module">

      // 原生组件 webComponent
      import Dialog, {InputDialog} from "./dialog.js";

      let dialog = new Dialog({
        // 进行配置
        title: "This is a title",
        content: "Amazing",
        isCancel: true,
        maskable: true,
        dragable: true,
        // 自定义
        success(e) {
          console.log("===>>You are successing<<===", e.detail);
        },
        cancel() {
          console.log("===>>You are canceling<<===");
        }
      })

      document.querySelector(".btn").onclick = function() {
        dialog.open();
      }

      // let obj1 = {
      //     name: "张三",
      //     height: "178cm"
      // }
      // let obj2 = {
      //     name: "里斯",
      //     height: "180cm"
      // }
      // // 合并参数以后面的为准
      // let newObj =  Object.assign(obj1, obj2)
      // console.log(newObj);

      let dialog2 = new InputDialog({
        success: function(e){
          console.log("点击了输入框的Dialog", e);
        }
      })

      document.querySelector(".btn2").onclick = function() {
        dialog2.open();
      }

      document.querySelector("my-dialog").addEventListener("success", function(e) {
        console.log("ee点击了确定ee");
      })
    </script>
  </body>
</html>
~~~

~~~ javascript
import GameEvent from "../1013/模拟游戏/js/gameEvent.js";

// 封装组件；
export default class Dialog extends EventTarget { // 系统提供的事件  //GameEvent {  // 自定义的事件
    constructor(opts) {
        super();
        // 合并配置参数
        this.opts = Object.assign({
            width: "30%",
            height: "250px",
            title: "测试标题",
            content: "测试内容",
            dragable: true, // 是否可拖拽
            maskable: true, // 是否有遮罩
            isCancel: false, // 是否可取消
            success(){},
            cancel(){}
        }, opts);
        console.log(this.opts);
        this.init()
    }

    open() {
        console.log("open....");
        this.dialogEle.style.display = "block";
    }
    init() {
        this.createHtml();
        if (!this.opts.maskable) {
            this.dialogEle.querySelector(".k-wrapper").style.display = "none";
        }

        // 绑定自定义事件
        // this.addEvent("success", this.opts.success);
        // 关联系统提供的事件
        this.addEventListener("success", this.opts.success);


        // 事件委托
        this.dialogEle.querySelector(".k-dialog").addEventListener('click', e => {
            switch (e.target.className) {
                case "k-cancel":
                    this.close();
                    break;
                case "k-primary":
                    this.close();
                    this.confirm();
                    break;
                case "k-close":
                    this.close();
                    break;
            }
        })

        if (this.opts.dragable) this.dragable();

    }
    createHtml() {
        let dialogEle = document.createElement("div");
        dialogEle.style.display = "none";
        dialogEle.innerHTML = `
        <div class="k-wrapper"></div>
        <div class="k-dialog" style="width:${this.opts.width};height:${this.opts.height}">
            <div class="k-header">
                <span class="k-title">${this.opts.title}</span>
                <span class="k-close">X</span>
            </div>
            <div class="k-body">
                <span>${this.opts.content}</span>
            </div>
            <div class="k-footer">
                ${this.opts.isCancel ? '<span class="k-cancel">取消</span>' : ''}
                <span class="k-primary">确定</span>
            </div>
        </div>
        `
        document.body.appendChild(dialogEle);
        this.dialogEle = dialogEle
    }

    close() {
        this.dialogEle.style.display = "none"; 
    }

    dragable() {
        let kDialog = this.dialogEle.querySelector(".k-dialog")
        kDialog.onmousedown = function(e) {
            let x = e.clientX - kDialog.offsetLeft;
            let y = e.clientY - kDialog.offsetTop;
            kDialog.onmousemove = function(e) {
                let xx = e.clientX;
                let yy = e.clientY;
                kDialog.style.left = xx - x + "px";
                kDialog.style.top = yy - y + "px";
            }
            kDialog.onmouseup = function() {
                kDialog.onmousemove = ""
            }
        }
    }
    // 点击确认 触发succe
    confirm(value) {
        // 触发自定义事件
        // this.trigger("success");
        // 使用系统提供的触发事件
        this.dispatchEvent(new CustomEvent("success", {
            detail: value
        }));
    }
}


export class InputDialog extends Dialog {
    constructor(opts) {
        super(opts);
        this.createInput();
    }
    createInput() {
        let myInput = document.createElement("input");
        myInput.type = "text";
        myInput.classList.add("input-inner");
        this.dialogEle.querySelector(".k-body").appendChild(myInput);
        this.myInput = myInput;
    }
    confirm() {
        // console.log("点了InputDialog的确定");
        console.log(this.myInput);
        let value = this.myInput.value; 
        // console.log(this.myInput);
        super.confirm(value);
    }
}

// 自定义组件
class MyDialog extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `<button>${this.innerText}</button>`;

        let dialog = new Dialog({
            // 进行配置
            title: this.title,
            content: this.content,
            success:(e)=>{
                this.dispatchEvent(new CustomEvent("success",{detail: e.detail}))
            }
        })

        this.onclick = function() {
            dialog.open()
        }
    }

    // 通过get处理默认参数
    get title() {
        return this.getAttribute("title") ?? "默认标题"; 
    }
    get content() {
        return this.getAttribute("content") ?? "默认内容";
    }
}

customElements.define("my-dialog", MyDialog);
~~~

## 自定义组件

~~~ html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>原生组件</title>
  </head>
  <body>
    <!-- <span></span>
<p></p>
<img src="" alt=""> -->

    <img src="" alt="" is="my-img">

    <my-com></my-com>
    <script>

      // 继承HTML的组件；
      class MyImg extends HTMLImageElement {
        constructor() {
          super();
          console.log(this);
          setTimeout( () => {
            this.src = "https://source.unsplash.com/1920x1080/?nature,water,1";
          }, 2000)
        }
      }
      customElements.define("my-img", MyImg, {
        extends : "img"
      })

      // 自定义组件
      class MyCom extends HTMLElement {
        constructor() {
          super();
          console.log(this);
          this.innerHTML = "<button>按钮</button>";
        }

      }
      customElements.define("my-com", MyCom)
    </script>
  </body>
</html>
~~~

# 自定义封装库，实现Jquery的功能

解析Jquery 中的$ 符号

## 自定义JS库

click 方法  --> 绑定一个节点 --> 绑定多个节点 --> 多种传入情况

~~~ javascript
// Jq类
class Jq {
    constructor(args) {
        this.args = args;
    };

    // 把函数当成参数传入另一个函数，或者函数把函数当成返回参数， 高阶函数
    click(fn) {
        // console.log("clicking me",this.args);
        fn();
    }
}



// 实现$符号选择器
function $(args) {
    // return {
    //     click() {
    //         console.log("clicking me", args);
    //     }
    // }

    return new Jq(args);
}
~~~

### 通过原生方法进行执行

~~~ javascript
// Jq类
class Jq {
    constructor(args) {
        // 通过传入参数 拿到 选择的节点
        this.ele = document.querySelector(args);
    };
    // 把函数当成参数传入另一个函数，或者函数把函数当成返回参数， 高阶函数
    click(fn) {
        // 通过原生方法执行
        this.ele.addEventListener("click", fn);
    }
}
~~~

### 获取一个节点 --> 获取多个节点

~~~ javascript
class Jq {
 	constructor(args) {
        // 获取多个节点
        let eles = document.querySelectorAll(args)
        // this -> 就是一个对象 可通过不同的赋值 this[0] = eles[0] ... this[n] = eles[n]
        // 使用循环的方式进行渲染
        for (let i = 0; i < eles.length; i++) {
            this[i] = eles[i];
        }
        // 挂载length
        this.length = eles.length;
    };   
    click(fn) {
        // 需要绑定多个
        for (let i = 0; i < this.length; i++) {
            this.addEvent(this[i],"click", fn);
        }
    }
    // 添加事件监听的方法
    addEvent(ele, eventName, fn) {
        ele.addEventListener(eventName, fn);
    }
}

~~~

### 链式操作

~~~ javascript
// 案例一
$(".box").click(()=> {
    console.log("first click");
}).on("click", function(){
    console.log("second click");
})

// 通过return this 实现链式操作
click(fn) {
    for (let i = 0; i < this.length; i++) {
        this.addEvent(this[i], "click", fn);
    }
    // 链式操作；
    return this;
}


// 案例二 eq选择器
$(".box").eq(1).click( function(){
    console.log("this is eq selector click link-operate");
})

// 通过创建新的Jq对象，进行返回
eq(index) {
    // return this[index];
    return new Jq(this[index])
}
~~~

### CSS操作扩展

~~~ JavaScript
// css 处理
css(...arg) {
    if (arg.length === 1) {
        // 1.字符串 2. 对象
        // $(".box").css("background");
        // $(".box").css({width:"300px; height:300px"});
        if (typeof arg[0] === "object") {
            // 对象  设置多个样式
            for (let i = 0; i < this.length; i++) {
                for (let j in arg[0]) {
                    this.setStyle(this[i], j, arg[0][j])
                }
            }
        } else {
            // 字符串  获取样式
            return this.getStyle(this[0], arg[0])
        }
    } else {
        // 设置一个样式  多个节点
        // $(".box").css("width","300px");
        for (let i = 0; i < this.length; i++) {
            this.setStyle(this[i], arg[0], arg[1]);
        }
    }
}
getStyle(ele, styleName) {
    if (styleName in $.cssHooks) {
        return $.cssHooks[styleName].get(ele);
    }
    return getComputedStyle(ele, null)[styleName];
}
setStyle(ele, styleName, styleValue) {
    if (typeof styleValue === "number"  && !(styleName in $.cssNumber)) {
        styleValue += "px"; 
    }

    if (styleName in $.cssHooks) {
        $.cssHooks[styleName].set(ele, styleValue);
    }
    ele.style[styleName] = styleValue
}


// 设置扩展
// 扩展
$.cssHooks["wh"] = {
    get(ele) {
        return getComputedStyle(ele,null)["width"] + " " + getComputedStyle(ele,null)["height"];
    },
    set(ele, value) {
        ele.style["width"] = value;
        ele.style["height"] = value;
    }
}
$(".box").css("wh","600px");
~~~

