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

### 实现animate函数

# 贪吃蛇项目

## 模块划分

### Map地图类

		- clearData 清空数据
		- setData 设置数据
		- include 该坐标是否包含数据
		- render 将数据渲染在地图元素上

### Food 食物类

- create 创建食物

### Snake 蛇类

- move 移动蛇
- eatFood 吃食物

### Game 游戏类

- start 开始游戏
- stop 暂停游戏
- isOver 判断游戏是否结束
- control 游戏控制器

## Step First Map 类实现

- parseFloat()  函数可解析一个字符串,并返回一个浮点数
- Math.ceil() 向上取整
- push() 把元素推进数组里
- concat() 把元素都接受进去，不区分类型
- some() 检测数组中的元素是否满足指定条件
- find() 检测数组是否有该元素，返回对象 找不到返回undefined
- map()  返回一个新的数组，数组中的元素为原始数组调用函数处理后的值
- join() 就是将array数据中每个元素都转为字符串,用自定义的连接符分割 ("") 无缝连接 (" ") 空格连接

~~~javascript
class Map {
  constructor(el, rect = 10) {
    this.el = el;
    this.rect = rect;
    this.data = [
      // {
      //     x:0,
      //     y:0,
      //     color: "red"
      // }
    ]
    this.rows = Math.ceil(Map.getStyle(el, "height") / rect);
    this.cells = Math.ceil(Map.getStyle(el, "width") / rect);
    Map.setStyle(el,"height", this.rows*rect);
    Map.setStyle(el,"width", this.cells*rect);
  }
  static getStyle(el, attr) {
    return parseFloat(getComputedStyle(el)[attr]);
  }
  static setStyle(el, attr, val) {
    el.style[attr] = val + "px";
  }
  setData(newData) {
    // this.data.push(newData) 如果类型不一样就有问题
    this.data = this.data.concat(newData); // concat解决
  }
  clearData() {
    this.data.length = 0;
  }
  include({x,y}) {
    // return this.data.some(item=>(item.x==x && item.y==y));
    return !!this.data.find(item=>(item.x==x && item.y==y)); // 返回的是对象 反向再反向实现返回布尔值
  }
  render() {
    this.el.innerHTML = this.data.map(item=> {
      return `<span style="position: absolute; left: ${item.x * this.rect}px; 
                    top: ${item.y * this.rect}px; width: ${this.rect}px; height: ${this.rect}px; background: ${item.color};"></span>`;
    }).join("");
  }
}
{
  let map = document.querySelector("#map");
  let gameMap = new Map(map, 12);
  gameMap.setData([
    {
      x: 0,
      y: 10,
      color: "green"
    },
    {
      x: 1,
      y: 10,
      color: "#fff"
    },
    {
      x: 2,
      y: 10,
      color: "#fff"
    },
    {
      x: 3,
      y: 10,
      color: "#fff"
    },

  ])
  // gameMap.clearData();
  gameMap.setData([
    {
      x:10,
      y:10,
      color: "red"
    }
  ])
  console.log(gameMap.include({x:10, y:20}));
  gameMap.render();
  console.log(gameMap);
}
~~~

## Step Secone Food 类的实现

~~~ javascript
// 食物类
class Food {
  // 传入map对象， 随机生成的颜色数组（可不传）
  constructor(map, colors = ["red", "#fff", "yellow","pink", "blue"]) {
    this.map = map;
    this.data = null;
    this.colors = colors;
  }
  // 创建食物
  create() {
    // 每次仅生成一个
    let x = Math.floor(Math.random()*this.map.cells); // x坐标
    let y = Math.floor(Math.random()*this.map.rows); // y坐标
    let color = this.colors[parseInt(Math.random()*this.colors.length)]; // 颜色
    this.data = {x,y,color}; // 生成data
    if (this.map.include(this.data)) { // 判断是否存在map中
      this.create(); // 存在重新生成
    }
    this.map.setData(this.data);
  }
}
~~~

## Step Third Snake 类的实现

- 需要初始生成一条蛇
- 按照移动的方向进行移动 - switch 语句

~~~ javascript
// 蛇类
class Snake {
  // 仅处理数据
  constructor(map, food) {
    this.data = [
      { x: 6, y: 4, color: "green" },
      { x: 5, y: 4, color: "white" },
      { x: 4, y: 4, color: "white" },
      { x: 3, y: 4, color: "white" },
      { x: 2, y: 4, color: "white" },
    ]
    this.map = map;
    this.food = food;
    this.map.setData(this.data);
    this.direction = "right";  // 移动方向
  }
  move() {
    let i = this.data.length - 1;
    this.lastData = {
      x: this.data[i].x,
      y: this.data[i].y,
      color: this.data[i].color
    }
    for (i; i > 0; i--) {
      this.data[i].x = this.data[i - 1].x
      this.data[i].y = this.data[i - 1].y
    }

    /*
      让后面每一格都走到前一格的位置
    */
    // 根据方向移动
    switch (this.direction) {
      case "left":
        this.data[0].x--;
        break;
      case "right":
        this.data[0].x++;
        break;
      case "up":
        this.data[0].y--;
        break;
      case "down":
        this.data[0].y++;
        break;
    }
  }
}
~~~

## Step Fourth Snake 的方向移动实现

- 蛇正在左右移动，不能改变左右方向
- 蛇正在上下移动，不能改变上下方向

~~~ javascript
// 改变方向 如果蛇正在左右移动，则不能改变左右、 正在上下移动，则不能改变上下方向
changeDir(dir) {
  if (this.direction === "left" || this.direction === "right") {
    if (dir === "left" || dir === "right") return false; // 此时不能修改方向              
  } else {
    if (dir === "up" || dir === "dowm") return false;
  }
  this.direction = dir;
  return true;
}
~~~

## Step Fifth Snake 实现吃的功能

- 在移动方法中，添加一个获取最后一个节点的信息
- 吃了就把该节点推进数组里

~~~ javascript
// 蛇吃到食物，应该变大
// this.lastData 在move方法中 设置
eatFood() {
  this.data.push(this.lastData);
}
~~~

## Step Sixth Game 类的初始化

~~~ javascript
// Game 类 -- 游戏控制类
class Game {
  constructor(el, rect) {
    this.map = new Map(el, rect);
    this.food = new Food(this.map);
    this.snake = new Snake(this.map);
    this.map.render();
    this.timer = 0;
    this.interval = 200;
  }
  // 开始游戏
  start() {
    this.move();
  }
  // 暂停游戏
  stop() {
    clearInterval(this.timer);
  }
  // 控制移动
  move() {
    this.stop();
    this.timer = setInterval(() => {
      this.snake.move();
      this.map.clearData();
      this.map.setData(this.snake.data);
      this.map.setData(this.food.data);
      this.map.render();
    }, this.interval);
  }
  // 判断是否结束
  isOver() {

  }
  // 游戏结束
  over() {

  }
  // 游戏控制器
  control() {

  }
} 
~~~

## Step Seventh 方向控制 以及 自定义方向控制

- 使用switch 判断keydown的事件，获取用户输入了哪个键

~~~ javascript
// 重载constructor
constructor(el, rect, toControl = null) {
  this.map = new Map(el, rect);
  this.food = new Food(this.map);
  this.snake = new Snake(this.map);
  this.map.render();
  this.timer = 0;
  this.interval = 200;
  this.toControl = toControl;
  this.keyDown = this.keyDown.bind(this); // 绑定this
  this.control();
}

// keyDown 方法
keyDown({ keyCode }) {
  // console.log(keyCode);
  let isDir;
  switch (keyCode) {
      // left
    case 37:
      isDir = this.snake.changeDir("left");
      break;
      // up
    case 38:
      isDir = this.snake.changeDir("up");
      break;
      // right
    case 39:
      isDir = this.snake.changeDir("right");
      break;
      // down
    case 40:
      isDir = this.snake.changeDir("down");
      break;
  }
  console.log(isDir);
}
// 游戏控制器
control() {
  // 判断用户是否又自己的控制器
  if (this.toControl) {
    this.toControl();
    return;
  }
  window.addEventListener("keydown", this.keyDown);
}
// 添加控制
addControl(fn) {
  fn.call(this);
  // 移除已有的控制器
  window.removeEventListener("keydown", this.keyDown);
}

// 自定义控制
game.addControl(function(){
  window.addEventListener("keydown", ({keyCode}) => {
    // w => 87 上  d => 68 右  s => 83 下  a => 65 左
    switch (keyCode) {
        // left
      case 65:
        this.snake.changeDir("left");
        break;
        // up
      case 87:
        this.snake.changeDir("up");
        break;
        // right
      case 68:
        this.snake.changeDir("right");
        break;
        // down
      case 83:
        this.snake.changeDir("down");
        break;
    }
  })
})
~~~

## Step Eighth 检测吃食物

~~~ javascript
// 判断是否吃到食物
isEat() {
  return this.snake.data[0].x === this.food.data.x && this.snake.data[0].y === this.food.data.y;
}
// 添加分数
let gradeEL = document.querySelector("#grade");
game.toGrade = function(grade) {
  gradeEL.innerHTML = grade;
}
document.onclick = function () {
  game.start();
}
// 控制移动
move() {
  this.stop();
  this.timer = setInterval(() => {
    this.snake.move();
    this.map.clearData();
    if (this.isEat()) {
      this.grade++;
      this.snake.eatFood();
      this.food.create();
      this.changeGrade(this.grade);
      this.interval *= 0.99; // 设置移动速度
      this.stop();
      this.start();
    }
    this.map.setData(this.snake.data);
    this.map.setData(this.food.data);
    this.map.render();
  }, this.interval);
}

<div id="map"></div>
~~~

## Step Nineth 判断游戏是否结束

- 蛇撞墙
- 蛇撞到自生
- 达到指定分数

~~~ javascript
// 判断是否结束
isOver() {
  // 判断蛇出了地图
  if (this.snake.data[0].x < 0
      || this.snake.data[0].x >= this.map.cells
      || this.snake.data[0].y < 0
      || this.snake.data[0].y >= this.map.rows) {
    return true;
  }
  // 判断蛇装到了自己
  for (let i = 1; i < this.snake.data.length; i++) {
    if (this.snake.data[0].x === this.snake.data[i].x
        && this.snake.data[0].y === this.snake.data[i].y) {
      return true;
    }
  }
  return false; // 没装
}
// 游戏结束
// overStatus = 0 中间停止，完死了  1 游戏胜利
over(overStatus = 1) {
  if (overStatus) {
    this.toWin && this.toWin();
  } else {
    this.toOver && this.toOver();
  }
  this.stop();
}
// 游戏结束
game.toOver = function () {
  alert("游戏结束")
}
// 游戏胜利
game.toWin = function () {
  alert("您胜利了！");
}

  ---- move 方法更新 ----
move() {
  this.stop();
  this.timer = setInterval(() => {
    this.snake.move();
    this.map.clearData();
    if (this.isEat()) {
      this.grade++;
      this.snake.eatFood();
      this.food.create();
      this.changeGrade(this.grade);
      this.interval *= 0.95; // 加速
      this.stop();
      this.start();
      if (this.grade >= 5) {
        this.over(1);
      }
    }
    if(this.isOver()) {
      this.over(0);
      return;
    }
    this.map.setData(this.snake.data);
    this.map.setData(this.food.data);
    this.map.render();
  }, this.interval);
}
~~~

## Step Tenth 整合游戏 总结

- 拆解类  单一原则

- 低耦合/高内聚

- //TODO : 总结

- 1. 首先分析游戏所需要的模型  
     - Map 地图类 
     - Snake 蛇类 
     - Food 食物类 
     - Game 游戏类
     - Event 事件类

  2. 抽离模型，低耦合（控制每个类仅做自己的事情）
  3. 编写所需要的方法
  4. 调用

### Map 类

~~~ javascript
// Map 类
export default class Map {
  constructor(el, rect = 10) {
    this.el = el;
    this.rect = rect;
    this.data = [
      // {
      //     x:0,
      //     y:0,
      //     color: "red"
      // }
    ]
    this.rows = Math.ceil(Map.getStyle(el, "height") / rect);
    this.cells = Math.ceil(Map.getStyle(el, "width") / rect);
    Map.setStyle(el, "height", this.rows * rect);
    Map.setStyle(el, "width", this.cells * rect);
  }
  // 静态方法 获取样式
  static getStyle(el, attr) {
    return parseFloat(getComputedStyle(el)[attr]);
  }
  // 静态方法 设置样式
  static setStyle(el, attr, val) {
    el.style[attr] = val + "px";
  }
  // 设置data
  setData(newData) {
    // this.data.push(newData) 如果类型不一样就有问题
    this.data = this.data.concat(newData); // concat解决
  }
  // 清楚数据
  clearData() {
    this.data.length = 0;
  }
  // 是否包含数据
  include({ x, y }) {
    // return this.data.some(item=>(item.x==x && item.y==y));
    return !!this.data.find(item => (item.x == x && item.y == y)); // 返回的是对象 反向再反向实现返回布尔值
  }
  // 渲染数据
  render() {
    this.el.innerHTML = this.data.map(item => {
      return `<span style="position: absolute; left: ${item.x * this.rect}px; 
            top: ${item.y * this.rect}px; width: ${this.rect}px; height: ${this.rect}px; background: ${item.color};"></span>`;
    }).join("");
  }
}
~~~

### Snake 类

~~~ javascript
// 蛇类
export default class Snake {
  // 仅处理数据
  constructor() {
    this.data = [
      { x: 6, y: 4, color: "green" },
      { x: 5, y: 4, color: "white" },
      { x: 4, y: 4, color: "white" },
      { x: 3, y: 4, color: "white" },
      { x: 2, y: 4, color: "white" },
    ]
    this.direction = "right";
  }
  // 移动方法
  move() {
    let i = this.data.length - 1;
    this.lastData = {
      x: this.data[i].x,
      y: this.data[i].y,
      color: this.data[i].color
    }
    for (i; i > 0; i--) {
      this.data[i].x = this.data[i - 1].x
      this.data[i].y = this.data[i - 1].y
    }

    /*
            让后面每一格都走到前一格的位置
        */
    // 根据方向移动
    switch (this.direction) {
      case "left":
        this.data[0].x--;
        break;
      case "right":
        this.data[0].x++;
        break;
      case "up":
        this.data[0].y--;
        break;
      case "down":
        this.data[0].y++;
        break;
    }
  }

  // 改变方向 如果蛇正在左右移动，则不能改变左右、 正在上下移动，则不能改变上下方向
  changeDir(dir) {
    if (this.direction === "left" || this.direction === "right") {
      if (dir === "left" || dir === "right") return false; // 此时不能修改方向              
    } else {
      if (dir === "up" || dir === "dowm") return false;
    }
    this.direction = dir;
    return true;
  }
  // 蛇吃到食物，应该变大
  eatFood() {
    this.data.push(this.lastData);
  }
}
~~~

### Food 类

~~~ javascript
// 食物类
export default class Food {
  constructor(cells = 10, rows = 10, colors = ["red", "#fff", "yellow", "pink", "blue"]) {
    this.cells = cells;
    this.rows = rows;
    this.data = null;
    this.colors = colors;
    this.create();
  }
  // 创建食物
  create() {
    // 每次生成一个
    let x = Math.floor(Math.random() * this.cells);
    let y = Math.floor(Math.random() * this.rows);
    let color = this.colors[parseInt(Math.random() * this.colors.length)];
    this.data = { x, y, color };
  }
}
~~~

### Game 类

~~~ javascript
// Game 类 -- 游戏控制类

import Event from "./Event.js";
import Snake from "./Snake.js";
import Food from "./Food.js";
import Map from "./Map.js";

export default class Game extends Event {
  constructor(el, rect) {
    super();
    this.map = new Map(el, rect);
    this.food = new Food(this.map.cells, this.map.rows);
    this.snake = new Snake();
    this.map.setData(this.snake.data);
    this.createFood();
    this.render()
    this.timer = 0;
    this.interval = 200;
    this.keyDown = this.keyDown.bind(this); // 绑定this
    this.grade = 0;
    this.control();
  }
  // 开始游戏
  start() {
    this.move();
  }
  // 暂停游戏
  stop() {
    clearInterval(this.timer);
  }
  // 控制移动
  move() {
    this.stop();
    this.timer = setInterval(() => {
      this.snake.move();
      if (this.isEat()) {
        this.grade++;
        this.snake.eatFood();
        this.createFood();
        this.changeGrade(this.grade);
        this.interval *= 0.95; // 加速
        this.stop();
        this.start();
        if (this.grade >= 50) {
          this.over(1);
        }
      }
      if (this.isOver()) {
        this.over(0);
        return;
      }
      this.render();
    }, this.interval);
  }
  // 判断是否吃到食物
  isEat() {
    return this.snake.data[0].x === this.food.data.x && this.snake.data[0].y === this.food.data.y;
  }

  // 判断是否结束
  isOver() {
    // 判断蛇出了地图
    if (this.snake.data[0].x < 0
        || this.snake.data[0].x >= this.map.cells
        || this.snake.data[0].y < 0
        || this.snake.data[0].y >= this.map.rows) {
      return true;
    }
    // 判断蛇装到了自己
    for (let i = 1; i < this.snake.data.length; i++) {
      if (this.snake.data[0].x === this.snake.data[i].x
          && this.snake.data[0].y === this.snake.data[i].y) {
        return true;
      }
    }
    return false; // 没装
  }
  // 游戏结束
  // overStatus = 0 中间停止，完死了  1 游戏胜利
  over(overStatus = 1) {
    if (overStatus) {
      // this.toWin && this.toWin();
      this.dispatch("win");
    } else {
      // this.toOver && this.toOver();
      this.dispatch("over");
    }
    this.stop();
  }
  keyDown({ keyCode }) {
    // console.log(keyCode);
    let isDir;
    switch (keyCode) {
        // left
      case 37:
        isDir = this.snake.changeDir("left");
        break;
        // up
      case 38:
        isDir = this.snake.changeDir("up");
        break;
        // right
      case 39:
        isDir = this.snake.changeDir("right");
        break;
        // down
      case 40:
        isDir = this.snake.changeDir("down");
        break;
    }
  }
  // 游戏控制器
  control() {
    // 判断用户是否又自己的控制器
    if (this.toControl) {
      this.toControl();
      return;
    }
    window.addEventListener("keydown", this.keyDown);
  }
  // 添加控制
  addControl(fn) {
    fn.call(this);
    // 移除已有的控制器
    window.removeEventListener("keydown", this.keyDown);
  }
  // 分数改变
  changeGrade(grade) {
    this.dispatch("changeGrade", grade);
  }
  createFood() {
    this.food.create();
    if (this.map.include(this.food.data)) {
      this.createFood();
    }
  }
  // 向地图渲染数据
  render() {
    this.map.clearData();
    this.map.setData(this.snake.data);
    this.map.setData(this.food.data);
    this.map.render();
  }
}
~~~

### Event 类

~~~ javascript
// Event 类
export default class Event {
  events = {}; // 事件池， 记录所有的相关事件及处理函数
  on(eventName, fn) { // 添加一个事件处理
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    if (!this.events[eventName].includes(fn)) {
      this.events[eventName].push(fn);
    }
  }
  off(eventName, fun) {  // 删除一个事件处理
    if (!this.events[eventName]) {
      return;
    }
    this.events[eventName] = this.events[eventName].filter(item => item != fn);
  }
  dispatch(eventName, ...arg) {// 触发事件
    if (!this.events[eventName]) {
      return;
    }
    this.events[eventName].forEach(item => {
      item.call(this, ...arg);
    });
  }
}
~~~

### 游戏整合调用

~~~ html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>贪吃蛇</title>
    <style>
      #grade {
        text-align: center;
      }

      #map {
        position: relative;
        height: 400px;
        width: 400px;
        background: #000;
        margin: 0 auto;
      }

      #control {
        height: 100px;
        width: 400px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        text-align: center;
      }

      #control span {
        display: inline-block;
        font-size: 50px;
        cursor: pointer;
      }

      #contol_down span {
        margin: 0 5px;
      }
    </style>
  </head>

  <body>
    <h1 id="grade">0</h1>
    <div id="map"></div>
    <div id="control">
      <div id="control_up">
        <span>⬆️</span>
      </div>
      <div id="contol_down">
        <span>⬅️</span>
        <span>⬇️</span>
        <span>➡️</span>
      </div>
    </div>
    <script type="module">
      import Game from "./js/Game.js";
      {
        let map = document.querySelector("#map");
        let game = new Game(map, 10);
        let gradeEL = document.querySelector("#grade");
        game.on("changeGrade", (grade) => {
          gradeEL.innerHTML = grade;
        })
        document.onclick = function () {
          if (!game.isOver()) {
            game.start();
          }
        }
        game.on("win", () => {
          alert("您胜利了！");
        })
        game.on("over", () => {
          alert("游戏结束");
        })

        let buttons = document.querySelectorAll("#control span");
        [...buttons].forEach((item, index) => {
          item.onclick = () => {
            switch (index) {
              case 0:
                game.keyDown({ keyCode: 38 });
                break;
              case 1:
                game.keyDown({ keyCode: 37 });
                break;
              case 2:
                game.keyDown({ keyCode: 40 });
                break;
              case 3:
                game.keyDown({ keyCode: 39 });
                break;
            }
          }
        })
      }
    </script>
  </body>

</html>
~~~

# 正则表达式(Regular Expression)

## 初识正则

~~~ javascript
// 1.查找 2.替换  3.验证 4.分割
let str = "sd21ads21321sahdw2131diuwq213";

function getNumber(str) {
  let arr = [];
  let temp = "";
  for (let i = 0; i < str.length; i++) {
    if (!isNaN(str[i])) {  // isNaN 判断是不是 不是数字
      // 数字
      temp += str[i];
    } else {
      if (temp != "")
        arr.push(parseInt(temp));
      temp = "";
    }
  }
  if (temp != "")
    arr.push(parseInt(temp));
  return arr;
}
let result = document.querySelector("#result");
result.innerHTML = getNumber(str);

// 正则写法
let reg = /\d+/g;
result.innerHTML = "正则之后的结果：" + str.match(reg);

// 两个结果都是一致的
~~~

## 正则表达式的创建

### 字面量创建

~~let temp = "dnwaid";~~

~~let reg = /temp/g;~~ 

~~~ javascript
let str = "dsaw12321dnwaidsa8921321da";
let reg = /\d+/g;  // g - 全局匹配
let reg = /dnwaid/g; // 精确匹配  //之间就是一个字符串

// 错误的使用
let temp = "dnwaid";
let reg = /temp/g; // 这里不会识别temp这个变量，仅仅会识别temp这个字符串
~~~



### 构造函数

* 注意转义字符、可以传变量

~~~ javascript
let reg = new RegExp("\d+","g"); // d,d,d,d
let reg = new RegExp("\\d+","g"); // 需要进行转义字符 \\ 12321,8921321
let reg = new RegExp("aid","g");  // 精确匹配
let temp = "aid"
let reg = new RegExp(temp, "g"); // 构造函数可以传字符串变量，但是字面量创建不可以实现传参，它只会识别为字符串
~~~

## 正则匹配方法

### 正则对象底下方法

#### test

~~~ javascript
let str = "ad1sa2145asw1642bgcx";
let reg = /\d+/g;
// res.innerHTML = reg.test(str);  // test 匹配到了返回true 否则 false
~~~

#### exec

~~~ javascript
let str = "ad1sa2145asw1642bgcx";
res.innerHTML += "</br>" + reg.exec(str);  // exec 匹配可执行多次 和索引有关 lastIndex;
console.log(reg.lastIndex);
res.innerHTML += "</br>" + reg.exec(str); // exec 匹配可执行多次 和索引有关 lastIndex;
console.log(reg.lastIndex);
res.innerHTML += "</br>" + reg.exec(str); // exec 匹配可执行多次 和索引有关 lastIndex;
console.log(reg.lastIndex);
res.innerHTML += "</br>" + reg.exec(str); // exec 匹配可执行多次 和索引有关 lastIndex;
console.log(reg.lastIndex);
~~~

### 字符串方法

#### split

~~~ javascript
let str = "ad1sa2145asw1642bgcx";
res.innerHTML = str.split("1");  // ad,sa2,45asw,642bgcx  以1分割
res.innerHTML = str.split(/\d+/); // ad,sa,asw,bgcx 以数字分割
~~~

#### search

~~~ javascript
let str = "ad1sa2145asw1642bgcx";
res.innerHTML = str.search("1"); // 输出下标 2
res.innerHTML = str.search(/c/); // 寻找下标 无则返回-1并且仅只是找到第一个索引值 输出18
// 全局匹配失效
~~~

#### match

~~~ javascript
let str = "ad1sa2145asw1642bgcx";
res.innerHTML = str.match(/\d+/); // 输出 1
res.innerHTML = str.match(/\d+/g); // match 可进行全局匹配 输出 1,2145,1642
~~~

#### replace

~~~ javascript
let str = "ad1sa2145asw1642bgcx";
res.innerHTML = str.replace(/\d/g, "*");  // ad*sa****asw****bgcx 替换
res.innerHTML = str.replace(/\d/g, function(arg) {  // 回掉函数
  console.log(arg); // 返回匹配到的字符串
  return "*";
})	
~~~

## 元字符 - 字符相关

### 字符相关 \w \W \d \D \s \S .

- \w : 匹配数字、字母、下划线
  ~~~ javascript
  \w: 匹配数字、字母、下划线；
  let str = "~213";
  let reg = /\w/g
  first.innerHTML = reg.test(str); // true
  ~~~

  

- \W : 匹配非（数字、字母、下划线）；

  ~~~ javascript
  \W: 匹配非（数字、字母、下划线）；
  let str = "213";
  let reg = /\W+/g;
  first.innerHTML = reg.test(str); // false
  ~~~

  

- \d : 匹配数字

- \D : 匹配非数字

- \s : 匹配空格

  ~~~ javascript
  let str = "";
  let reg = /\s+/g;
  reg.test(str); // false
  ~~~

  

- \S : 匹配非空格

  ~~~ javascript
  let reg = /\S+/g;
  first.innerHTML = reg.test(str);
  ~~~

  

-  .  : 匹配非 \n \r \u2028 \u2029

  ~~~ javascript
  let str = `afb`; // true
  let str = `a        
  b`;                 // false
  let reg = /a.b/;
  first.innerHTML = reg.test(str);
  ~~~

### 数量相关 {} ? + *

- {} 、 ？ 、 + 、*

~~~ javascript
let str = "abceeeeeeffd";
// let reg = /ceeef/g;
let reg = /ce{3}f/g;  // 这里的3只能是3次，多或者少都不行
second.innerHTML = reg.test(str);

reg = /ce{1,4}f/g;    //  e 出现的次数只能是1～4次 [1,4]
second.innerHTML += reg.test(str);
reg = /ce{1,}f/g;     // e 出现的次数是 [1, +无穷]
second.innerHTML += reg.test(str);

// ? --> {0,1}  + --> {1,}   * --> {0,}
str = "my name is lilei";
reg = /my\s?name/g;
second.innerHTML += "</br>" + reg.test(str);


str = "123456789";
reg = /\d{2,4}/g;   // 贪婪匹配  按照最多的次数匹配
reg = /\d{2,4}?/g;  // 惰性匹配  按照最低的次数匹配
second.innerHTML += "</br>" + str.match(reg);
~~~

### 位置相关 ^ $ \b \B

- ^ : 字符串开始的位置

~~~ javascript
// ^ $ \b \B
// ^ 字符串开始的位置
let str = "abedde"
let reg = /^\w/g;   // *bedde
// let reg = /^/g; // *abedde
third.innerHTML = str.replace(reg, "*")
~~~

- $: 字符串结尾的位置

~~~ javascript
// $ 结尾的位置
reg = /\w$/g;   // abedd*
reg = /$/g;     // abedde*
third.innerHTML += "</br>" + str.replace(reg,"*");
~~~

- \b : 边界符   边界： 非\w （数字、字母、下划线）都是边界

~~~ javascript
// \b 边界符
// 边界： 非\w （数字、字母、下划线）都是边界
str = "this is a book";
reg = /is/g; // is,is
reg = /\bis\b/g; // is  // 空格是边界的一种
third.innerHTML += "</br>" + str.match(reg);
str = "~love# me loveme";
reg = /love/g; //love,love
third.innerHTML += "</br>" + str.match(reg);
reg = /\blove\b/g; //love
third.innerHTML += "</br>" + str.match(reg);

~~~

- \B : 非边界

~~~ javascript
// \B 非边界
str = "this is a book";
reg = /\B\w{2}\b/g;
third.innerHTML += "</br>" + str.match(reg); // is,ok
~~~

### 括号相关 () [] {}

- () 分组 提取值 替换 反向引用

~~~ javascript
// () 分组
let str = "abababfsadas";
let reg = /ababab/g;
fourth.innerHTML = reg.test(str); // true

reg = /ab{3}/g;
fourth.innerHTML += "</br>" + reg.test(str); // false  此次应该是匹配的abbb

reg = /(ab){3}/g;
fourth.innerHTML += "</br>" + reg.test(str); // true;
// () 提取值
str = "2020-01-02";
reg = /\d{4}-\d{2}-\d{2}/;
fourth.innerHTML += "</br>" + str.match(reg); //2020-01-02

reg = /(\d{4})-(\d{2})-(\d{2})/;
fourth.innerHTML += "</br>" + str.match(reg);
/*
                0: "2020-01-02"
                1: "2020"
                2: "01"
                3: "02"
            */
console.log(str.match(reg));
console.log(RegExp.$1); // 2020   RegExp.$1 是与正则表达式匹配的第一个 子匹配(以括号为标志)字符串 总共可以有99个匹配
console.log(RegExp.$2); // 01
console.log(RegExp.$3); // 02

// () 替换
// 2020-01-02 改为 01/02/2020
fourth.innerHTML += "</br>" + str.replace(reg, "$2/$3/$1");  //01/02/2020
fourth.innerHTML += "</br>" + str.replace(reg, function (arg, year, month, day) {
  return month + "/" + day + "/" + year
});   // 01/02/2020

// () 反向引用
let className = "news-container_nav"; //news_container_nav
// reg = /\w{4}(-|_)\w{9}(-|_)\w{3}/; //  true 
reg = /\w{4}(-|_)\w{9}(\1)\w{3}/;  // false  \1 引用之前第一个匹配的字符
fourth.innerHTML += "</br>" + reg.test(className);  // true

className = "news-container_nav_sda"; //news_container_nav
// reg = /\w{4}(-|_)\w{9}(-|_)\w{3}/; //  true 
reg = /\w{4}(-|_)\w{9}(-|_)\w{3}(\2)\w{3}/;  // false  \2 引用之前第二个匹配的字符
fourth.innerHTML += "</br>" + reg.test(className);  // true
~~~

- [] 字符集合

~~~ javascript
// [] : 字符集合
str = "My name is LiLei";
reg = /Li(l|L)ei/;  // true
reg = /Li[lL]ei/;   // true  中括号不需要 ｜ 
reg = /[0-9]/g;     // fasle 改字符串没有数字  [a-z]  [A-Z] 闭区间
fourth.innerHTML += "</br>" + reg.test(str);  // true

reg = /[^0-9]/g; // 匹配非数字0-9
fourth.innerHTML += "</br>" + reg.test(str);  // true

// \d [0-9] \w [a-zA-Z0-9_];
~~~

- {} 字符出现次数

## 匹配模式

- g : 全局匹配

~~~ javascript
// g : 全局匹配
let str = "213assd124qwadfsaz1231";
let reg = /[0-9]/;  // 2
reg = /[0-9]/g;  // 2,1,3,1,2,4,1,2,3,1
reg = /[0-9]{3}/g;  //213,124,123
reg = /\d+/; // 213
reg = /\d+/g; // 213,124,1231

result.innerHTML = str.match(reg); 
~~~

- i : 忽略大小写

~~~ javascript
// i : 忽略大小写
str = "abcABc";
reg = /ABC/g;  // false
reg = /ABC/gi; // true
result.innerHTML = reg.test(str);
~~~

- m : 多行模式

~~~ javascript
// m : 多行模式
str = `abc
efg
hij`;

reg = /^\w/g;   // *bc efg hij
console.log(str.replace(reg, "*")); 
result.innerHTML = str.replace(reg, "*"); 

reg = /^\w/gm;  // *bc *fg *ij
result.innerHTML = str.replace(reg, "*"); 
~~~

- s : 让.匹配到换行

~~~ javascript
// s : 让.匹配到换行
str = `abcefg`;
reg = /^a.*g$/g;  // true
str = `abc
efg`;
reg = /^a.*g$/g;  // false
reg = /^a.*g$/gs;  // true
result.innerHTML = reg.test(str);
~~~

- u : 让正则匹配unicode编码

~~~ javascript
// u : 让正则匹配unicode编码
str = "a";
reg = /\u{61}/g;  //false
reg = /\u{61}/gu;  //true
result.innerHTML = reg.test(str);
~~~

- y : 粘性模式

~~~ javascript
// y : 粘性模式
str = "12345gdasfads42456";
reg = /\d/g;
result.innerHTML = "</br>" + reg.exec(str); //1
result.innerHTML += "</br>" + reg.exec(str);//2
result.innerHTML += "</br>" + reg.exec(str);//3
result.innerHTML += "</br>" + reg.exec(str);//4
result.innerHTML += "</br>" + reg.exec(str);//5
result.innerHTML += "</br>" + reg.exec(str);//4
result.innerHTML += "</br>" + reg.exec(str);//2 ...

reg = /\d/gy; // 后面必须也是 /d 数字 才能继续匹配
result.innerHTML += "</br>" + "下面是粘性模式"
result.innerHTML += "</br>" + reg.exec(str);//1
result.innerHTML += "</br>" + reg.exec(str);//2
result.innerHTML += "</br>" + reg.exec(str);//3
result.innerHTML += "</br>" + reg.exec(str);//4
result.innerHTML += "</br>" + reg.exec(str);//5
result.innerHTML += "</br>" + reg.exec(str);//null
result.innerHTML += "</br>" + reg.exec(str);//1 ...
result.innerHTML += "</br>" + reg.exec(str);//2
result.innerHTML += "</br>" + reg.exec(str);//3
result.innerHTML += "</br>" + reg.exec(str);//4
result.innerHTML += "</br>" + reg.exec(str);//5
~~~

## 命名分组及零宽断言

### 命名分组

(?<>)

~~~ javascript
let str = "2020-01-06";
let reg = /\d{4}-\d{2}-\d{2}/; //2020-01-06 未分组
reg = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/; //2020-01-06,2020,01,06 分组
res.innerHTML = str.match(reg);
console.log(str.match(reg));   //groups : {year: '2020', month: '01', day: '06'}  自定义分组
~~~

### 零宽断言

#### 正向

##### 肯定

~~~ javascript
str = "iphone3iphone4iphone5iphonenumber";
reg = /iphone\d/g       // 苹果苹果苹果iphonenumber
reg = /iphone(?=\d)/g  // 苹果3苹果4苹果5iphonenumber 
res.innerHTML = str.replace(reg, "苹果");
~~~

##### 否定

~~~ javascript
// 正向否定零宽断言
reg = /iphone(?!\d)/g  // iphone3iphone4iphone5苹果number
res.innerHTML = str.replace(reg, "苹果"); 
~~~

#### 负向

##### 肯定

~~~ javascript
// 负向肯定零宽断言
str = "10px20px30pxipx";  // px --> 替换像素
reg = /\d+px/g;  // 像素像素像素ipx
reg = /(?<=\d+)px/g; // 10像素20像素30像素ipx
res.innerHTML = str.replace(reg, "像素"); 
~~~

##### 否定

~~~ javascript
// 负向否定零宽断言
reg = /(?<!\d+)px/g; // 10px20px30pxi像素
res.innerHTML = str.replace(reg, "像素");
~~~

# ES6 高阶

## 迭代器

- for of 循环使用的就是迭代器

~~~ javascript
let arr = ["a", "b", "c", "d"];

// 迭代对象 可被迭代对象 - 实现了[Symbol.iterator] -> 迭代器方法
// Object 中，没有迭代方法
let obj = {
  a: 1,
  b: 2,
  c: 3
}
obj[Symbol.iterator] = function () {
  // 迭代协议 每次都是走的next
  let keys = Object.keys(obj);
  let index = 0;

  return {
    next() {
      // return {
      //     // value: "", // 循环过程中的值
      //     // done: true // done 代表循环是否完成 true 已完成 false 未完成  
      // }
      if (index >= keys.length) {
        return {
          done: true
        }
      } else {
        return {
          value: {
            key: keys[index],
            value: obj[keys[index++]]
          },
          done : false
        }
      }
    }
  }
}
for (let val of obj) {
  console.log(val);
}


~~~

## Generator 方法	

~~~ javascript
function* fn() {
  yield new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("a");
      resolve(1);
    }, 500)
  });
  yield new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("b");
      resolve(2);
    }, 500)
  });
  yield new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("c");
      resolve(3);
    }, 500)
  });
}
// let f = fn();
// console.log(f);
// console.log(f.next());
// console.log(f.next());
// console.log(f.next());
// ==> 
// for (let val of f) {
//     console.log(val);
// }// 一次就执行完毕

function co(fn) {
  let f = fn();
  next();
  function next(data) {
    let result = f.next();
    if (!result.done) {
      // 上一个异步走完了，在执行下一个异步
      result.value.then((info)=>{
        console.log(info,data);
        next(info); 
      })
    }
    // console.log(result);
  }
}
co(fn);
~~~

## 同步异步

### 通过回调，解决异步 一对一

~~~ javascript
function test(cb) {
  setTimeout(() => {
    console.log("test");
    cb && cb();
  }, 1000);
}

test(function() {
  console.log("2222");
})
~~~

### 自定义事件 一对多

~~~ javascript
let myEventObj = new EventTarget();


function test() {
  setTimeout(() => {
    console.log("test");
    myEventObj.dispatchEvent(new CustomEvent("myevent"));
  }, 1000);
}

test();
myEventObj.addEventListener("myevent",function(){
  console.log("22222");
})
myEventObj.addEventListener("myevent",function(){
  console.log("33333");
})
// test
// 22222
// 33333
~~~

### 使用回调处理异步 回调地狱

~~~ javascript
// 1. 回调处理异步  回调地狱
move(box, "left", 300, function() {
  console.log("向右运动完成");
  move(box, "top", 300 ,function() {
    console.log("向下运动完成");
    move(box, "left", 0, function() {
      console.log("向左运动完成");
      move(box, "top", 0, function() {
        console.log("向上运动完成");
      })
    })
  })
})

function move(ele,direction, target, cb) {
  let start = parseInt(ele.style[direction]) || 0;
  let speed = Math.abs(target - start)/(target - start) * 5;
  start += speed;
  // console.log(start);  
  setTimeout(() => {
    if (start === target) {
      // console.log("运动完成");
      cb && cb();
    } else {
      ele.style[direction] = start + "px";
      move(ele,direction,target, cb);
    }
  }, 20);
}
~~~

### 通过自定义事件处理异步

~~~ javascript
// 2.自定义事件
let myEventObj = new EventTarget();
myEventObj.num = 1;

function move(ele,direction, target) {
  let start = parseInt(ele.style[direction]) || 0;
  let speed = Math.abs(target - start)/(target - start) * 5;
  start += speed;
  // console.log(start);  
  setTimeout(() => {
    if (start === target) {
      // console.log("运动完成");
      // cb && cb();
      myEventObj.dispatchEvent(new CustomEvent("myevent"+myEventObj.num));
      myEventObj.num++;
    } else {
      ele.style[direction] = start + "px";
      move(ele,direction,target);
    }
  }, 20);
}

move(box, "left", 300);
myEventObj.addEventListener("myevent1", ()=> {
  console.log("向右运动完成");
  move(box,"top", 300);
})
myEventObj.addEventListener("myevent2",()=> {
  console.log("向下运动完成");
  move(box,"left",0);
})
myEventObj.addEventListener("myevent3",()=> {
  console.log("向左运动完成");
  move(box,"top",0);
})
myEventObj.addEventListener("myevent4",()=>{
  console.log("向上运动完成");
})
~~~

### Promise

~~~ javascript
// 三种状态 : resolved（fullfilled）、rejected、pending
// then的2个参数 : onResolved, onRejected 
// then => 3种返回值 
let p1 = new Promise((resolve, reject) => {
  resolve("value")
  // reject("err")
})

// console.log(p1);

// then的2个参数 : onResolved, onRejected 
// p1.then((res)=>{
//     // onResolved  成功
//     console.log("成功", res);
// }, err=>{
//     // onRejected  失败
//     console.log("失败了", err);
// })

// then => 3种返回值 
// -1 没有任何返回，自动返回Promise 对象
// -2 返回普通值，会包装成Promise对象，promiseValue的值是 返回的值
// -3 返回Promise 直接返回新的Promise对象
let res = p1.then(res=>{
  return new Promise(resolve=>{
    resolve("success")
  })
})
res.then(res=>{
  console.log(res);
})
console.log(res);


// 加载图片 通过canvas 绘制 加载的图片
function loadImg() {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.src = "https://img0.baidu.com/it/u=1345303087,1528317222&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1082"

    img.onload = function () {
      // 加载完成
      resolve(img)
    }
    img.onerror = function () {
      reject("图片加载失败")
    }
  })
}
// then 链式操作
loadImg().then(res => {
  drawImg(res);
}, err => {
  console.log(err);
}).catch(e=>{ // 可通过catch捕获所有的错误
  console.log(e); 
})

// 绘制图片
function drawImg(img) {
  const cavans = document.querySelector("#mycanvas");
  const context = cavans.getContext("2d");
  context.drawImage(img, 0, 0, 100, 100);
}


// 移动盒子
// 3. promise 
function move(ele, direction, target) {
  return new Promise(resolve => {
    function redo() {
      let start = parseInt(ele.style[direction]) || 0;
      let speed = Math.abs(target - start) / (target - start) * 5;
      start += speed;
      setTimeout(() => {
        if (start === target) {
          resolve("完成运动")
        } else {
          ele.style[direction] = start + "px";
          redo();
        }
      }, 20);
    }
    redo();
  })
}

move(box, "left", 300).then(res=>{
  console.log("运行1已完成");
  return move(box, "top", 300);
}).then(res=>{
  console.log("运动2已完成");
  return move(box,"left",0);
}).then(res=>{
  console.log("运动3已完成");
  return move(box,"top",0);
}).then(res=>{
  console.log("运动4已完成");
}).catch(err=>{
  console.log(err);
})
~~~

### async-await

~~~ javascript
const p1 = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('1111');
    }, 1000);
  })
}
const p2 = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve('2222');
      reject('err');
    }, 2000);
  })
}

// 链式操作
// p1().then(res=>{
//     console.log(res);
//     return p2()
// }).then(res=>{
//     console.log(res);
// }).catch(err=>{
//     console.log(err);
// })


async function asyncFn() {
  try {
    let res1 = await p1();
    console.log(res1);
    let res2 = await p2();
    console.log(res2);
  } catch (err) {
    console.log(err);
  }
}
asyncFn();

// 错误
// let arr = [function(){},function(){},function(){}];
// arr.forEach(async item =>{  // 导致3个async 对应三个 await  
//     await item();
// })
// 正确 一个async 对应三个await
async function test() {
  await arr.forEach(item => {
    item();
  });	
}

// 改写移动盒子
function move(ele, direction, target) {
  return new Promise(resolve => {
    function redo() {
      let start = parseInt(ele.style[direction]) || 0;
      let speed = Math.abs(target - start) / (target - start) * 5;
      start += speed;
      setTimeout(() => {
        if (start === target) {
          resolve("完成运动")
        } else {
          ele.style[direction] = start + "px";
          redo();
        }
      }, 20);
    }
    redo();
  })
}
async function test() {
  await move(box, "left", 300);
  console.log("向右完成移动");
  await move(box, "top", 300);
  console.log("向下完成移动");
  await move(box, "left", 0);
  console.log("向左完成移动");
  await move(box, "top", 0);
  console.log("向上完成移动");
}
test();

~~~

## Promise 原理解析和实现

### Promise 的三种状态

- pending 等待
- fulfilled 成功
- rejected 出错

### Promise 三个状态实现

~~~ javascript
import MyPromise from "./MyPromise.js";
// Promise 三种状态  pending fulfilled rejected
let res = document.querySelector("#res");
let p = new MyPromise((resolve, reject)=>{
  // resolve("success")
  reject("error")
})
res.innerHTML = p;
console.log(p);

// 功能实现
export default class MyPromise {
  constructor(handle) {
    this.status = "pending";
    this.value = undefined;
    handle(this._resolve.bind(this), this._reject.bind(this));
  }
  _resolve(val) {
    this.status = "fulfilled";
    this.value = val;
  };
  _reject(val) {
    this.status = "rejected";
    this.value = val;
  }
}
~~~

### Promise then 方法

~~~ javascript
then(onResolved, onRejected) {
  if (this.status === "fulfilled") {
    onResolved && onResolved(this.value);
  }else if (this.status === "rejected") {
    onRejected && onRejected(this.value);
  }else if (this.status === "pending") {// 不执行，但是保存onResolved 或者 onRejected
    this.fulfilledFn = onResolved;
    this.rejectedFn = onRejected;
  }
}

// 改写_resolve _reject 
_resolve(val) {
  this.status = "fulfilled";
  this.value = val;
  this.fulfilledFn && this.fulfilledFn(val)
};
_reject(val) {
  this.status = "rejected";
  this.value = val;
  this.rejectedFn && this.rejectedFn(val)
}

// 添加参数
constructor(handle) {
  this.status = "pending";
  this.value = undefined;
  handle(this._resolve.bind(this), this._reject.bind(this));
  this.fulfilledFn = undefined;
  this.rejectedFn = undefined;
}
~~~

### Promise 多个then执行，非链式

- 使用数组队列保存，再循环推出执行

~~~ javascript
// 多个then 非链式操作  此时第一个会被第二个覆盖，则只会输出222 
// 数组保存，循环执行
p.then(res => {
  console.log("111", res);
}, err => {
  console.log("111", err);
})
p.then(res => {
  console.log("222", res);
}, err => {
  console.log("222", err);
})

// 改写then方法
then(onResolved, onRejected) {
  if (this.status === "fulfilled") {
    onResolved && onResolved(this.value);
  }else if (this.status === "rejected") {
    onRejected && onRejected(this.value);
  }else if (this.status === "pending") {// 不执行，但是保存onResolved 或者 onRejected
    // this.fulfilledFn = onResolved;
    // this.rejectedFn = onRejected;
    // 修改为队列
    // 保存
    this.fulfilledFnQueue.push(onResolved);
    this.rejectedFnQueue.push(onRejected);
  }
}

// 改写_resolved方法
_resolve(val) {
  this.status = "fulfilled";
  this.value = val;
  // this.fulfilledFn && this.fulfilledFn(val)
  // 循环执行
  let cb;
  while(cb = this.fulfilledFnQueue.shift()) {
    cb && cb(val);
  }
};

// 改写_reject方法
_reject(val) {
  this.status = "rejected";
  this.value = val;
  // this.rejectedFn && this.rejectedFn(val)
  let cb;
  while(cb = this.rejectedFnQueue.shift()) {
    cb && cb(val);
  }
}
~~~

### Promise 同步执行问题

- 使用setTimeout解决此问题

~~~ javascript
// 调用 执行
let p = new MyPromise((resolve, reject)=>{
  // setTimeout(()=>{
  resolve("success")
  // }, 1000)
  // reject("error")
})

p.then(res => {
  console.log("111", res);
}, err => {
  console.log("111", err);
})

// 改写_resolved

_resolve(val) {
  let run = () => {
    this.status = "fulfilled";
    this.value = val;
    // this.fulfilledFn && this.fulfilledFn(val)
    // 循环执行
    let cb;
    while (cb = this.fulfilledFnQueue.shift()) {
      cb && cb(val);
    }
  }

  setTimeout(run, 0);

};

// 改写_rejected
_reject(val) {
  let run = () => {
    this.status = "rejected";
    this.value = val;
    // this.rejectedFn && this.rejectedFn(val)
    let cb;
    while (cb = this.rejectedFnQueue.shift()) {
      cb && cb(val);
    }
  }
  setTimeout(run, 0); 

}
~~~

### 微任务 宏任务

~~~javascript
// 设置setTimeout 在之前的代码上，会比Promise先执行
// 解决方法 设置MutationObserve
// 调用
import MyPromise from "./MyPromise.js";

/*
            异步队列 【1、2、3、4】
            每个微任务 1、2、3、4里面都有一个宏任务
            先执行微任务，再执行宏任务
        */

setTimeout(() => {
  console.log("timeout");
}, 0);


// Promise 三种状态  pending fulfilled rejected
let res = document.querySelector("#res");
let p = new MyPromise((resolve, reject)=>{
  resolve("success")

})
res.innerHTML = p;

p.then(res => {
  console.log("111", res);
}, err => {
  console.log("111", err);
})

// 改写_resolve _reject 函数中的setTimeout
let ob = new MutationObserver(run)
ob.observe(document.body, {
  attributes: true
})
document.body.setAttribute("qc", Math.random());
~~~

### Promise 链式操作

~~~ javascript
// 调用
import MyPromise from "./MyPromise.js";


// Promise 三种状态  pending fulfilled rejected
let res = document.querySelector("#res");
let p = new MyPromise((resolve, reject)=>{
  resolve("success")

})
res.innerHTML = p;


// 4. then的链式调用问题
let p2 = p.then(res=>{
  console.log("111", res);
  // 返回普通值
  // return "这是返回的值";
  // 返回MyPromise 对象
  return new MyPromise(resolve => {
    resolve("返回的MyPromise 对象");
  })
})
p2.then(res=>{
  console.log("??", res);
})

//  改写then
then(onResolved, onRejected) {
  return new MyPromise((resolve, reject) => {
    if (this.status === "fulfilled") {
      onResolved && onResolved(this.value);
    } else if (this.status === "rejected") {
      onRejected && onRejected(this.value);
    } else if (this.status === "pending") {
      let resolveFn = (val)=> {
        let res = onResolved && onResolved(val);
        if (res instanceof MyPromise) {
          // 返回的是一个Mypromise 对象
          // res.then(res=>{
          //     resolve(res);
          // })
          // 简写
          res.then(resolve);
        } else {
          resolve(res);
        }
      }

      let rejectFn = (val)=> {
        let res = onRejected && onRejected(val);
        reject(res);
      }

      this.fulfilledFnQueue.push(resolveFn);
      this.rejectedFnQueue.push(rejectFn);
    }
  })

}
~~~

### Promise.resolve 静态方法

~~~ javascript
static resolve(val) {
  return new MyPromise(resolve => {
    resolve(val);
  })
}
~~~

### Promise.reject 静态方法

~~~ javascript
static reject(val) {
  return new MyPromise((resolve, reject) => {
    reject(val);
  })
}
~~~

### Promise.all 静态方法

~~~ javascript
static all(lists) {
  return new MyPromise((resolve) => {
    let arr = [];
    let num = 0;
    lists.forEach(item => {
      // item 多个promise对象， 谁快，谁就先调用，谁调用就返回谁
      item.then(res => {
        // console.log(res);
        num++;
        arr.push(res);
        if (num >= lists.length) {
          resolve(arr)
        }
      })
    })
  })
}
~~~

### Promise.race 静态方法

~~~ javascript
static race(lists) {
  return new MyPromise((resolve, reject)=>{
    lists.forEach(item=>{
      item.then(res=>{
        resolve(res)
      }, err=>{
        reject(err)
      })
    })
  })
}
~~~

### Promise.finally 方法

~~~ javascript
finally(cb) {
  // return this.then((value)=>this._resolve(cb()).then(()=>value),
  // (reason)=>this._resolve(cb()).then(()=>{
  //     console.log(reason);
  // }))
  // return this.then(resolve=>{
  //     this._resolve(cb())
  // }, rejecet=>{
  //     this._reject(cb())
  // })

  // teach
  this.then(cb,cb);
}
~~~

## Vue 原理解析与实现

### 1. 初次编译

~~~ javascript
// 1. 初次编译 --> 多层编译
// 调用
let app = new Vue({
  el: '#app',
  data: {
    message: "数据"
  },
  methods: {

  }
});
// 实现
class Vue {
  constructor(opts) {
    this.opts = opts;
    this._data = opts.data
    this.compile();
  }
  compile() {
    // 作用域
    let el = document.querySelector(this.opts.el);
    // 获取子节点
    let childNodes = el.childNodes;
    childNodes.forEach(node => {
      if (node.nodeType === 1) {
        console.log("元素节点");
      } else if (node.nodeType === 3) {
        console.log("文本节点");
        // 查找 {{}}
        let reg = /\{{2}\s*([^\{\}\s]+)\s*\}{2}/g
        let textContent = node.textContent;
        if (reg.test(textContent)) {
          let $1 = RegExp.$1;
          // console.log($1);
          // 替换内容
          node.textContent = node.textContent.replace(reg,this._data[$1])
        }
      }
    })
  }
}
~~~

### 2. 解决多层编译问题

- 抽离方法 compileNodes(el)
- 递归调用

HTML 文档

~~~ html
<div id='app'>
  第一层 231312{{message}}
  <div class="test">
    第二层 {{message}}  目前这里的 message 不会被替换
    <div>
      第三层 {{message}}
      <div>第四层 {{message}}</div>
    </div>
  </div>
</div>
~~~

~~~ javascript
// 重写compile
compile() {
  // 作用域
  let el = document.querySelector(this.opts.el);
  this.compileNodes(el);
}

// 添加comileNodes方法
compileNodes(el) {
  // 获取子节点
  let childNodes = el.childNodes;
  childNodes.forEach(node => {
    if (node.nodeType === 1) {
      console.log("元素节点");
      if (node.childNodes.length > 0) {
        // 如果子节点下面还有节点，递归调用
        this.compileNodes(node);
      }
    } else if (node.nodeType === 3) {
      console.log("文本节点");
      // 查找 {{}}
      let reg = /\{{2}\s*([^\{\}\s]+)\s*\}{2}/g
      let textContent = node.textContent;
      if (reg.test(textContent)) {
        let $1 = RegExp.$1;
        // console.log($1);
        // 替换内容
        node.textContent = node.textContent.replace(reg, this._data[$1])
      }
    }
  })
}
~~~

### 3. Object.defineProperty 

- 在对象上直接定义个新的属性，或者修改现有的属性，并返回此对象

~~~ javascript
let obj = {
  name: "张三"
}
// obj.name = "里斯"
// console.log(obj);
Object.defineProperty(obj, "name", {
  configurable: true,
  enumerable: true,
  get() {
    console.log("getting...");
    return "张三"
  },
  set(newValue) {
    console.log("setting...");
    return newValue;
  }
})
// 获取
obj.name
// 设置
obj.name = "里斯"

// configurable : false 不能删、删不掉
//                true  能删掉
// delete obj.name
// console.log(obj);
// enumerable : true 可循环 false 不能遍历
// for (let key in obj) {
//     console.log(key);
// }
~~~

### 4. 设置get、set方法

~~~ javascript
// 调用数据
let app = new Vue({
  el: '#app',
  data: {
    message: "数据"
  },
  methods: {

  }
});
setTimeout(() => {
  console.log("正在改变中...");
  app._data.message = "修改过了"
}, 1000);

constructor(opts) {
  this.opts = opts;
  this._data = opts.data
  this.compile();
  this.observe(this._data);
}
// 观察数据
observe(data) {
  let keys = Object.keys(data);
  keys.forEach(key=>{
    let value = data[key];
    Object.defineProperty(data, key, {
      configurable: true,
      enumerable:true,
      get() {
        // 获取data[key]  会触发get 重复触发造成死循环
        console.log("getting... Please waiting");
        return value;
      },
      set(newVal){
        console.log("setting... Please waiting");
        value = newVal;
      }
    })
  })
}
~~~

### 添加自定义事件，监听数据修改事件

~~~ javascript
// 调用
let app = new Vue({
  el: '#app',
  data: {
    message: "数据"
  },
  methods: {

  }
});

setTimeout(() => {
  console.log("正在改变中...");
  app._data.message = "修改过了"
}, 1000);

// Vue 类 constructor
constructor(opts) {
  super();
  this.opts = opts;
  this._data = opts.data
  this.compile();
  this.observe(this._data);
}
// 改写compileNodes方法
compileNodes(el) {
  // 获取子节点
  let childNodes = el.childNodes;
  childNodes.forEach(node => {
    if (node.nodeType === 1) {
      console.log("元素节点");
      if (node.childNodes.length > 0) {
        // 如果子节点下面还有节点，递归调用
        this.compileNodes(node);
      }
    } else if (node.nodeType === 3) {
      console.log("文本节点");
      // 查找 {{}}
      let reg = /\{{2}\s*([^\{\}\s]+)\s*\}{2}/g
      let textContent = node.textContent;
      if (reg.test(textContent)) {
        let $1 = RegExp.$1;
        // console.log($1);
        // 替换内容
        node.textContent = node.textContent.replace(reg, this._data[$1])
        // 添加部分
        this.addEventListener($1, e=>{
          console.log("触发了事件..", e);
          let newVal = e.detail;
          let oldVal = this._data[$1]
          node.textContent = node.textContent.replace(oldVal, newVal);
        })
      }
    }
  })
}

// 改写observe 方法
// 观察数据
observe(data) {
  let keys = Object.keys(data);
  keys.forEach(key=>{
    let value = data[key];
    let _this = this;
    Object.defineProperty(data, key, {
      configurable: true,
      enumerable:true,
      get() {
        // 获取data[key]  会触发get 重复触发造成死循环
        console.log("getting... Please waiting");
        return value;
      },
      set(newVal){
        console.log("setting... Please waiting");
        // 编译  --> 较麻烦 --> 自定义事件
        _this.dispatchEvent(new CustomEvent(key, {
          detail: newVal
        }))
        value = newVal;
      }
    })
  })
}
~~~

### 添加收集器、订阅者

~~~ javascript
// 收集器
class Dep {
  constructor() {
    this.subs = [];
  }
  // 添加订阅者
  addSub(sub) {
    this.subs.push(sub);
  }
  // 发布
  notify(newVal) {
    this.subs.forEach(sub => {
      sub.update(newVal);
    })
  }
}

// 订阅者
class Watcher {
  constructor(data, key, cb) {
    this.cb = cb;
    Dep.target = this;
    data[key]; // 触发get方法
    Dep.target = null;
  }
  update(newVal) {
    this.cb(newVal);
  }
}

// 更改Vue类
class Vue {
  // 取消extend
  constructor(opts) {
    this.opts = opts;
    this._data = opts.data
    this.observe(this._data);
    this.compile();

  }
  compile() {
    // 作用域
    let el = document.querySelector(this.opts.el);
    this.compileNodes(el);
  }
  compileNodes(el) {
    // 获取子节点
    let childNodes = el.childNodes;
    childNodes.forEach(node => {
      if (node.nodeType === 1) {
        // console.log("元素节点");


        if (node.childNodes.length > 0) {
          // 如果子节点下面还有节点，递归调用
          this.compileNodes(node);
        }
      } else if (node.nodeType === 3) {
        // console.log("文本节点");
        // 查找 {{}}
        let reg = /\{{2}\s*([^\{\}\s]+)\s*\}{2}/g
        let textContent = node.textContent;
        if (reg.test(textContent)) {
          let $1 = RegExp.$1;
          // console.log($1);
          // 替换内容
          node.textContent = node.textContent.replace(reg, this._data[$1])
          // 触发Watcher 回调
          // 人为触发 get 方法 收集 watcher

          new Watcher(this._data, $1, (newVal)=>{
            let oldVal = this._data[$1]
            let reg = RegExp(oldVal,"g")
            node.textContent = node.textContent.replace(reg, newVal);
          })
        }
      }
    })
  }
  // 观察数据
  observe(data) {
    let keys = Object.keys(data);

    keys.forEach(key => {
      let value = data[key];
      let _this = this;
      let dep = new Dep();
      Object.defineProperty(data, key, {
        configurable: true,
        enumerable: true,
        get() {
          console.log("get...");
          if (Dep.target) {
            dep.addSub(Dep.target)
          }
          return value;
        },
        set(newVal) {
          console.log(dep);
          dep.notify(newVal)
          value = newVal;
        }
      })
    })
  }
}
~~~

### 实现v-model  v-html

~~~ javascript
// 修改方法
compileNodes(el) {
  // 获取子节点
  let childNodes = el.childNodes;
  childNodes.forEach(node => {
    if (node.nodeType === 1) {
      // console.log("元素节点");
      let attrs = node.attributes;
      [...attrs].forEach(attr=>{
        let attrName = attr.name;
        let attrValue = attr.value;
        if (attrName === "v-model" ) {
          node.value = this._data[attrValue];
          node.addEventListener("input", e=>{
            this._data[attrValue] = e.target.value
          })
        } else if(attrName === "v-html") {
          let str = this._data[attrValue];
          node.innerHTML = str;
        }
      })


      if (node.childNodes.length > 0) {
        // 如果子节点下面还有节点，递归调用
        this.compileNodes(node);
      }
    } else if (node.nodeType === 3) {
      // console.log("文本节点");
      // 查找 {{}}
      let reg = /\{{2}\s*([^\{\}\s]+)\s*\}{2}/g
      let textContent = node.textContent;
      if (reg.test(textContent)) {
        let $1 = RegExp.$1;
        // console.log($1);
        // 替换内容
        node.textContent = node.textContent.replace(reg, this._data[$1])
        // 触发Watcher 回调
        // 人为触发 get 方法 收集 watcher

        new Watcher(this._data, $1, (newVal)=>{
          let oldVal = this._data[$1]
          let reg = RegExp(oldVal,"g")
          node.textContent = node.textContent.replace(reg, newVal);
        })
      }
    }
  })
}
~~~

# Git

- git init 初始化仓库
- git status 查看当前仓库所在目录的文件状态
- git add filename 使文件加入追踪 git add . 添加所有未提交的文件
- git commit 提交
- git commit -a -m '提交日志' 直接添加暂存区后，直接提交
- git log 查看提交记录
- git rm <file> 删除git区域中记录的文件，并且不保留在工作目录中
- git rm -f <file> 强制删除
- git rm --cache <file> 删除git仓库中，保留工作目录中的文件
- git mv file_from file_to 移动文件
- git status -s 
  - ?? 未追踪文件
  - A 添加到暂存区文件
  - M 被修改但是未放入暂存区
  - MM 修改后放入暂存区，并且又再次修改
  - 被修改后放入暂存区
- git diff 查看当前文件的修改
- git diff --<> 查看暂存区和提交区域之间的差异
- git log -p 查看详细信息
- git log -2 查看最近的n条信息
- git log --stat 列出所有被修改的文件，以及简略的统计信息

# Node.js

## 服务端

~~~ javascript
// 创建服务器框架
// require 引入模块
const http = require("http");
const server = http.createServer((req, res) => {
  res.write("hello, javascript");
  res.end()
})
server.listen(3000) // 监听端口号
~~~

## 模块化

~~~ javascript
console.log("我是Ma.js");
let a = 10;
class Person {
  constructor() {
    this.name = "张三"
  }
  hobby() {
    console.log("喜欢篮球");
  }
}
// 导出
// module.exports = {
//     a,
//     Person
// }
exports.a = a;
exports.Person = Person;
// exports 是 module.exports 的 引用 module.exports = exports

// 引用 
let Ma = require("./Ma.js"); // 自定义文件夹需要./
let cai = new Ma.Person();
console.log("我的index.js文件");
console.log(Ma.a);
cai.hobby()

// 引用node_modules里面的模块
require("mytest") // 只需要写文件夹名称- 即模块名称

// package.json
{
  "name": "mytest",
  "version": "1.0",
  "main": "main.js"
}
~~~

## npm

- npm i  安装模块
- Dependencies: 运行依赖
- devDependencies: 开发依赖 

## FS模块

### 文件操作

#### 写文件

~~~ javascript
fs.writeFile("1.txt", "我是写入的文字", function(err){
  if(err) {
    return console.log(err);
  }
  console.log("success");
})
// flag :
//      a : 追加写入
//      w : 写入
//      r : 读取
fs.writeFile("1.txt", "我是追加的文字", {flag: "a"}, function(err){
  if(err) {
    return console.log(err);
  }
  console.log("success");
})
~~~

#### 读文件

~~~ javascript
fs.readFile("1.txt","utf8", (err, data) => {
  if (err) {
    return console.log(err);
  }
  console.log(data);
})
// buffer
fs.readFile("1.txt", (err, data) => {
    if (err) {
        return console.log(err);
    }
    console.log(data.toString());
})

// 所有的文件操作， 没有加Sync都是异步， 否则都是同步

let data = fs.readFileSync("1.txt")
log(data.toString())
~~~

#### 删除文件

~~~ javascript
// 删除
fs.unlink("2.txt", (err) => {
  if (err) {
    return log(err);
  }
  log("删除成功")
})
~~~

#### 修改文件名

~~~ javascript
// 修改 修改名称
fs.rename("1.txt", "2.txt", err=>{
  if (err) {
    return log(err)
  }
  log("修改成功")
})
~~~

#### 复制文件

~~~ javascript
fs.copyFile("index.js", "myindex.js", err=>{
  if (err) {
    return log(err);
  }
  log("复制成功")
})

function myCopy(src, dest) {
  fs.writeFileSync(dest,fs.readFileSync(src))
}
~~~

### 目录操作

#### 创建文件夹

~~~ javascript
fs.mkdir("11", err=>{
  if (err) {
    return log(err)
  }
  log("创建成功")
})
~~~

#### 修改目录名称

~~~ javascript
fs.rename("11","22", err=> {
  if (err){
    return log(err)
  };
  log("修改成功")
})
~~~

#### 读取目录

~~~ javascript
fs.readdir("22",(err, data)=>{
  if (err) {
    return log(err)
  }
  log(data)
})
~~~

#### 删除目录

~~~ javascript
// 删除目录 必须是空文件夹/目录
fs.rmdir("11", err=>{
  if (err) {
    return log(err)
  };
  log("删除成功")
})
~~~

#### 判断文件或目录是否存在

~~~ javascript
// 判断文件或者目录是否存在
fs.exists("222", exist=>{
  log(exist)
})
~~~

#### 获取文件的详细信息

~~~ javascript
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
~~~

#### 删除非空的目录-删除非空文件夹

~~~ javascript
// 删除非空文件夹
// 先把目录里面的文件删除 -> 删除空目录

function removeDir(path) {
  let data = fs.readdirSync(path);
  data.forEach(item => {
    // item 文件-> 直接删除  目录继续查找
    let file_path = path + "/" + item
    let stat = fs.statSync(file_path);
    if (stat.isFile()) {
      fs.unlink(file_path, err => {
        if (err) return log(err);
        log("删除文件: " + file_path + "成功！");
      })
    }
    if (stat.isDirectory()) {
      removeDir(file_path);
    }
  })

  fs.rmdir(path, err => {
    if (err) return log(err);
    log("删除目录成功");
  })

}

removeDir("/Users/qingchen/Developer/web-study/1022/22");
~~~

## Buffer

~~~ javascript
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
~~~

## Stream

~~~ javascript
// stream 流
const fs = require("fs");
// let res = fs.readFileSync("/Users/qingchen/Developer/web-study/1022/1.txt")
// console.log(res.toString());

// 如果文件过大，内存溢出. 流把数据拆分成64k的大小
let rs = fs.createReadStream("./1022/1.txt");
let ws = fs.createWriteStream("./1022/2.txt");
// 相当于复制的功能
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
~~~

## Server

### 初始化

~~~ js
// 加载node.js内置模块 http 使用它进行基于http的网络编程
const http = require("http")
// 使用http.Server 类创建一个server对象，
// 这个对象可以监听网卡、端口，就可以对请求发送的数据进行处理，然后进行返回
// const server = new http.Server()
const server = http.createServer(()=>{
    // 等同 connection 事件
    console.log("有人发起了请求");
});
~~~

### 监听网络请求

~~~ js
// 也可以通过http的一个静态工厂方法来创建这个对象
const server = http.createServer();
server.on("connection", ()=> {
  console.log("有人发生请求了");
})
// 监听网卡和端口
server.listen(8888, ()=>{
  console.log("服务启动成功");
});
~~~

### 路由设置

~~~ js
server.on("request", (req,res)=>{

  const url = req.url;
  let resContnet = "";

  if (url.startsWith("/public")) {
    // url ==> /public/1.html ==> ./public/1.html
    resContnet = fs.readFileSync("." + url);
  } else {
    if (url == "/now") {
      resContnet = (new Date).toString();
    } else {
      resContnet = "啥也没有～";
    }
  }

  res.end(resContnet);
})
~~~

### 头文件 Content-Type

~~~ js
res.setHeader("Content-Type", "text/html;charset=utf-8");
~~~

### 处理静态资源

~~~ js
server.on("request", (req,res)=>{
  const url = req.url;
  let resContnet = "";

  if (url.startsWith("/public")) {
    // url ==> /public/1.html ==> ./public/1.html
    // 截取最后一个. 获取文件类型
    const lastIndex = url.lastIndexOf(".")
    const suff = url.substring(lastIndex);

    res.setHeader("Content-Type", mime[suff] + ";charset=utf-8");

    resContnet = fs.readFileSync("." + url);
  } else {
    if (url == "/now") {
      resContnet = (new Date).toString();
    } else {
      resContnet = "啥也没有～";
    }
  }
  res.end(resContnet);
})
~~~

- mime.json

~~~ json
{
  ".323": "text/h323",
  ".3gp": "video/3gpp",
  ".aab": "application/x-authoware-bin",
  ".aam": "application/x-authoware-map",
  ".aas": "application/x-authoware-seg",
  ".acx": "application/internet-property-stream",
  ".ai": "application/postscript",
  ".aif": "audio/x-aiff",
  ".aifc": "audio/x-aiff",
  ".aiff": "audio/x-aiff",
  ".als": "audio/X-Alpha5",
  ".amc": "application/x-mpeg",
  ".ani": "application/octet-stream",
  ".apk": "application/vnd.android.package-archive",
  ".asc": "text/plain",
  ".asd": "application/astound",
  ".asf": "video/x-ms-asf",
  ".asn": "application/astound",
  ".asp": "application/x-asap",
  ".asr": "video/x-ms-asf",
  ".asx": "video/x-ms-asf",
  ".au": "audio/basic",
  ".avb": "application/octet-stream",
  ".avi": "video/x-msvideo",
  ".awb": "audio/amr-wb",
  ".axs": "application/olescript",
  ".bas": "text/plain",
  ".bcpio": "application/x-bcpio",
  ".bin ": "application/octet-stream",
  ".bld": "application/bld",
  ".bld2": "application/bld2",
  ".bmp": "image/bmp",
  ".bpk": "application/octet-stream",
  ".bz2": "application/x-bzip2",
  ".c": "text/plain",
  ".cal": "image/x-cals",
  ".cat": "application/vnd.ms-pkiseccat",
  ".ccn": "application/x-cnc",
  ".cco": "application/x-cocoa",
  ".cdf": "application/x-cdf",
  ".cer": "application/x-x509-ca-cert",
  ".cgi": "magnus-internal/cgi",
  ".chat": "application/x-chat",
  ".class": "application/octet-stream",
  ".clp": "application/x-msclip",
  ".cmx": "image/x-cmx",
  ".co": "application/x-cult3d-object",
  ".cod": "image/cis-cod",
  ".conf": "text/plain",
  ".cpio": "application/x-cpio",
  ".cpp": "text/plain",
  ".cpt": "application/mac-compactpro",
  ".crd": "application/x-mscardfile",
  ".crl": "application/pkix-crl",
  ".crt": "application/x-x509-ca-cert",
  ".csh": "application/x-csh",
  ".csm": "chemical/x-csml",
  ".csml": "chemical/x-csml",
  ".css": "text/css",
  ".cur": "application/octet-stream",
  ".dcm": "x-lml/x-evm",
  ".dcr": "application/x-director",
  ".dcx": "image/x-dcx",
  ".der": "application/x-x509-ca-cert",
  ".dhtml": "text/html",
  ".dir": "application/x-director",
  ".dll": "application/x-msdownload",
  ".dmg": "application/octet-stream",
  ".dms": "application/octet-stream",
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".dot": "application/msword",
  ".dvi": "application/x-dvi",
  ".dwf": "drawing/x-dwf",
  ".dwg": "application/x-autocad",
  ".dxf": "application/x-autocad",
  ".dxr": "application/x-director",
  ".ebk": "application/x-expandedbook",
  ".emb": "chemical/x-embl-dl-nucleotide",
  ".embl": "chemical/x-embl-dl-nucleotide",
  ".eps": "application/postscript",
  ".epub": "application/epub+zip",
  ".eri": "image/x-eri",
  ".es": "audio/echospeech",
  ".esl": "audio/echospeech",
  ".etc": "application/x-earthtime",
  ".etx": "text/x-setext",
  ".evm": "x-lml/x-evm",
  ".evy": "application/envoy",
  ".exe": "application/octet-stream",
  ".fh4": "image/x-freehand",
  ".fh5": "image/x-freehand",
  ".fhc": "image/x-freehand",
  ".fif": "application/fractals",
  ".flr": "x-world/x-vrml",
  ".flv": "flv-application/octet-stream",
  ".fm": "application/x-maker",
  ".fpx": "image/x-fpx",
  ".fvi": "video/isivideo",
  ".gau": "chemical/x-gaussian-input",
  ".gca": "application/x-gca-compressed",
  ".gdb": "x-lml/x-gdb",
  ".gif": "image/gif",
  ".gps": "application/x-gps",
  ".gtar": "application/x-gtar",
  ".gz": "application/x-gzip",
  ".h": "text/plain",
  ".hdf": "application/x-hdf",
  ".hdm": "text/x-hdml",
  ".hdml": "text/x-hdml",
  ".hlp": "application/winhlp",
  ".hqx": "application/mac-binhex40",
  ".hta": "application/hta",
  ".htc": "text/x-component",
  ".htm": "text/html",
  ".html": "text/html",
  ".hts": "text/html",
  ".htt": "text/webviewhtml",
  ".ice": "x-conference/x-cooltalk",
  ".ico": "image/x-icon",
  ".ief": "image/ief",
  ".ifm": "image/gif",
  ".ifs": "image/ifs",
  ".iii": "application/x-iphone",
  ".imy": "audio/melody",
  ".ins": "application/x-internet-signup",
  ".ips": "application/x-ipscript",
  ".ipx": "application/x-ipix",
  ".isp": "application/x-internet-signup",
  ".it": "audio/x-mod",
  ".itz": "audio/x-mod",
  ".ivr": "i-world/i-vrml",
  ".j2k": "image/j2k",
  ".jad": "text/vnd.sun.j2me.app-descriptor",
  ".jam": "application/x-jam",
  ".jar": "application/java-archive",
  ".java": "text/plain",
  ".jfif": "image/pipeg",
  ".jnlp": "application/x-java-jnlp-file",
  ".jpe": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".jpz": "image/jpeg",
  ".js": "application/x-javascript",
  ".jwc": "application/jwc",
  ".kjx": "application/x-kjx",
  ".lak": "x-lml/x-lak",
  ".latex": "application/x-latex",
  ".lcc": "application/fastman",
  ".lcl": "application/x-digitalloca",
  ".lcr": "application/x-digitalloca",
  ".lgh": "application/lgh",
  ".lha": "application/octet-stream",
  ".lml": "x-lml/x-lml",
  ".lmlpack": "x-lml/x-lmlpack",
  ".log": "text/plain",
  ".lsf": "video/x-la-asf",
  ".lsx": "video/x-la-asf",
  ".lzh": "application/octet-stream",
  ".m13": "application/x-msmediaview",
  ".m14": "application/x-msmediaview",
  ".m15": "audio/x-mod",
  ".m3u": "audio/x-mpegurl",
  ".m3url": "audio/x-mpegurl",
  ".m4a": "audio/mp4a-latm",
  ".m4b": "audio/mp4a-latm",
  ".m4p": "audio/mp4a-latm",
  ".m4u": "video/vnd.mpegurl",
  ".m4v": "video/x-m4v",
  ".ma1": "audio/ma1",
  ".ma2": "audio/ma2",
  ".ma3": "audio/ma3",
  ".ma5": "audio/ma5",
  ".man": "application/x-troff-man",
  ".map": "magnus-internal/imagemap",
  ".mbd": "application/mbedlet",
  ".mct": "application/x-mascot",
  ".mdb": "application/x-msaccess",
  ".mdz": "audio/x-mod",
  ".me": "application/x-troff-me",
  ".mel": "text/x-vmel",
  ".mht": "message/rfc822",
  ".mhtml": "message/rfc822",
  ".mi": "application/x-mif",
  ".mid": "audio/mid",
  ".midi": "audio/midi",
  ".mif": "application/x-mif",
  ".mil": "image/x-cals",
  ".mio": "audio/x-mio",
  ".mmf": "application/x-skt-lbs",
  ".mng": "video/x-mng",
  ".mny": "application/x-msmoney",
  ".moc": "application/x-mocha",
  ".mocha": "application/x-mocha",
  ".mod": "audio/x-mod",
  ".mof": "application/x-yumekara",
  ".mol": "chemical/x-mdl-molfile",
  ".mop": "chemical/x-mopac-input",
  ".mov": "video/quicktime",
  ".movie": "video/x-sgi-movie",
  ".mp2": "video/mpeg",
  ".mp3": "audio/mpeg",
  ".mp4": "video/mp4",
  ".mpa": "video/mpeg",
  ".mpc": "application/vnd.mpohun.certificate",
  ".mpe": "video/mpeg",
  ".mpeg": "video/mpeg",
  ".mpg": "video/mpeg",
  ".mpg4": "video/mp4",
  ".mpga": "audio/mpeg",
  ".mpn": "application/vnd.mophun.application",
  ".mpp": "application/vnd.ms-project",
  ".mps": "application/x-mapserver",
  ".mpv2": "video/mpeg",
  ".mrl": "text/x-mrml",
  ".mrm": "application/x-mrm",
  ".ms": "application/x-troff-ms",
  ".msg": "application/vnd.ms-outlook",
  ".mts": "application/metastream",
  ".mtx": "application/metastream",
  ".mtz": "application/metastream",
  ".mvb": "application/x-msmediaview",
  ".mzv": "application/metastream",
  ".nar": "application/zip",
  ".nbmp": "image/nbmp",
  ".nc": "application/x-netcdf",
  ".ndb": "x-lml/x-ndb",
  ".ndwn": "application/ndwn",
  ".nif": "application/x-nif",
  ".nmz": "application/x-scream",
  ".nokia-op-logo": "image/vnd.nok-oplogo-color",
  ".npx": "application/x-netfpx",
  ".nsnd": "audio/nsnd",
  ".nva": "application/x-neva1",
  ".nws": "message/rfc822",
  ".oda": "application/oda",
  ".ogg": "audio/ogg",
  ".oom": "application/x-AtlasMate-Plugin",
  ".p10": "application/pkcs10",
  ".p12": "application/x-pkcs12",
  ".p7b": "application/x-pkcs7-certificates",
  ".p7c": "application/x-pkcs7-mime",
  ".p7m": "application/x-pkcs7-mime",
  ".p7r": "application/x-pkcs7-certreqresp",
  ".p7s": "application/x-pkcs7-signature",
  ".pac": "audio/x-pac",
  ".pae": "audio/x-epac",
  ".pan": "application/x-pan",
  ".pbm": "image/x-portable-bitmap",
  ".pcx": "image/x-pcx",
  ".pda": "image/x-pda",
  ".pdb": "chemical/x-pdb",
  ".pdf": "application/pdf",
  ".pfr": "application/font-tdpfr",
  ".pfx": "application/x-pkcs12",
  ".pgm": "image/x-portable-graymap",
  ".pict": "image/x-pict",
  ".pko": "application/ynd.ms-pkipko",
  ".pm": "application/x-perl",
  ".pma": "application/x-perfmon",
  ".pmc": "application/x-perfmon",
  ".pmd": "application/x-pmd",
  ".pml": "application/x-perfmon",
  ".pmr": "application/x-perfmon",
  ".pmw": "application/x-perfmon",
  ".png": "image/png",
  ".pnm": "image/x-portable-anymap",
  ".pnz": "image/png",
  ".pot,": "application/vnd.ms-powerpoint",
  ".ppm": "image/x-portable-pixmap",
  ".pps": "application/vnd.ms-powerpoint",
  ".ppt": "application/vnd.ms-powerpoint",
  ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".pqf": "application/x-cprplayer",
  ".pqi": "application/cprplayer",
  ".prc": "application/x-prc",
  ".prf": "application/pics-rules",
  ".prop": "text/plain",
  ".proxy": "application/x-ns-proxy-autoconfig",
  ".ps": "application/postscript",
  ".ptlk": "application/listenup",
  ".pub": "application/x-mspublisher",
  ".pvx": "video/x-pv-pvx",
  ".qcp": "audio/vnd.qcelp",
  ".qt": "video/quicktime",
  ".qti": "image/x-quicktime",
  ".qtif": "image/x-quicktime",
  ".r3t": "text/vnd.rn-realtext3d",
  ".ra": "audio/x-pn-realaudio",
  ".ram": "audio/x-pn-realaudio",
  ".rar": "application/octet-stream",
  ".ras": "image/x-cmu-raster",
  ".rc": "text/plain",
  ".rdf": "application/rdf+xml",
  ".rf": "image/vnd.rn-realflash",
  ".rgb": "image/x-rgb",
  ".rlf": "application/x-richlink",
  ".rm": "audio/x-pn-realaudio",
  ".rmf": "audio/x-rmf",
  ".rmi": "audio/mid",
  ".rmm": "audio/x-pn-realaudio",
  ".rmvb": "audio/x-pn-realaudio",
  ".rnx": "application/vnd.rn-realplayer",
  ".roff": "application/x-troff",
  ".rp": "image/vnd.rn-realpix",
  ".rpm": "audio/x-pn-realaudio-plugin",
  ".rt": "text/vnd.rn-realtext",
  ".rte": "x-lml/x-gps",
  ".rtf": "application/rtf",
  ".rtg": "application/metastream",
  ".rtx": "text/richtext",
  ".rv": "video/vnd.rn-realvideo",
  ".rwc": "application/x-rogerwilco",
  ".s3m": "audio/x-mod",
  ".s3z": "audio/x-mod",
  ".sca": "application/x-supercard",
  ".scd": "application/x-msschedule",
  ".sct": "text/scriptlet",
  ".sdf": "application/e-score",
  ".sea": "application/x-stuffit",
  ".setpay": "application/set-payment-initiation",
  ".setreg": "application/set-registration-initiation",
  ".sgm": "text/x-sgml",
  ".sgml": "text/x-sgml",
  ".sh": "application/x-sh",
  ".shar": "application/x-shar",
  ".shtml": "magnus-internal/parsed-html",
  ".shw": "application/presentations",
  ".si6": "image/si6",
  ".si7": "image/vnd.stiwap.sis",
  ".si9": "image/vnd.lgtwap.sis",
  ".sis": "application/vnd.symbian.install",
  ".sit": "application/x-stuffit",
  ".skd": "application/x-Koan",
  ".skm": "application/x-Koan",
  ".skp": "application/x-Koan",
  ".skt": "application/x-Koan",
  ".slc": "application/x-salsa",
  ".smd": "audio/x-smd",
  ".smi": "application/smil",
  ".smil": "application/smil",
  ".smp": "application/studiom",
  ".smz": "audio/x-smd",
  ".snd": "audio/basic",
  ".spc": "application/x-pkcs7-certificates",
  ".spl": "application/futuresplash",
  ".spr": "application/x-sprite",
  ".sprite": "application/x-sprite",
  ".sdp": "application/sdp",
  ".spt": "application/x-spt",
  ".src": "application/x-wais-source",
  ".sst": "application/vnd.ms-pkicertstore",
  ".stk": "application/hyperstudio",
  ".stl": "application/vnd.ms-pkistl",
  ".stm": "text/html",
  ".svg": "image/svg+xml",
  ".sv4cpio": "application/x-sv4cpio",
  ".sv4crc": "application/x-sv4crc",
  ".svf": "image/vnd",
  ".svh": "image/svh",
  ".svr": "x-world/x-svr",
  ".swf": "application/x-shockwave-flash",
  ".swfl": "application/x-shockwave-flash",
  ".t": "application/x-troff",
  ".tad": "application/octet-stream",
  ".talk": "text/x-speech",
  ".tar": "application/x-tar",
  ".taz": "application/x-tar",
  ".tbp": "application/x-timbuktu",
  ".tbt": "application/x-timbuktu",
  ".tcl": "application/x-tcl",
  ".tex": "application/x-tex",
  ".texi": "application/x-texinfo",
  ".texinfo": "application/x-texinfo",
  ".tgz": "application/x-compressed",
  ".thm": "application/vnd.eri.thm",
  ".tif": "image/tiff",
  ".tiff": "image/tiff",
  ".tki": "application/x-tkined",
  ".tkined": "application/x-tkined",
  ".toc": "application/toc",
  ".toy": "image/toy",
  ".tr": "application/x-troff",
  ".trk": "x-lml/x-gps",
  ".trm": "application/x-msterminal",
  ".tsi": "audio/tsplayer",
  ".tsp": "application/dsptype",
  ".tsv": "text/tab-separated-values",
  ".ttf": "application/octet-stream",
  ".ttz": "application/t-time",
  ".txt": "text/plain",
  ".uls": "text/iuls",
  ".ult": "audio/x-mod",
  ".ustar": "application/x-ustar",
  ".uu": "application/x-uuencode",
  ".uue": "application/x-uuencode",
  ".vcd": "application/x-cdlink",
  ".vcf": "text/x-vcard",
  ".vdo": "video/vdo",
  ".vib": "audio/vib",
  ".viv": "video/vivo",
  ".vivo": "video/vivo",
  ".vmd": "application/vocaltec-media-desc",
  ".vmf": "application/vocaltec-media-file",
  ".vmi": "application/x-dreamcast-vms-info",
  ".vms": "application/x-dreamcast-vms",
  ".vox": "audio/voxware",
  ".vqe": "audio/x-twinvq-plugin",
  ".vqf": "audio/x-twinvq",
  ".vql": "audio/x-twinvq",
  ".vre": "x-world/x-vream",
  ".vrml": "x-world/x-vrml",
  ".vrt": "x-world/x-vrt",
  ".vrw": "x-world/x-vream",
  ".vts": "workbook/formulaone",
  ".wav": "audio/x-wav",
  ".wax": "audio/x-ms-wax",
  ".wbmp": "image/vnd.wap.wbmp",
  ".wcm": "application/vnd.ms-works",
  ".wdb": "application/vnd.ms-works",
  ".web": "application/vnd.xara",
  ".wi": "image/wavelet",
  ".wis": "application/x-InstallShield",
  ".wks": "application/vnd.ms-works",
  ".wm": "video/x-ms-wm",
  ".wma": "audio/x-ms-wma",
  ".wmd": "application/x-ms-wmd",
  ".wmf": "application/x-msmetafile",
  ".wml": "text/vnd.wap.wml",
  ".wmlc": "application/vnd.wap.wmlc",
  ".wmls": "text/vnd.wap.wmlscript",
  ".wmlsc": "application/vnd.wap.wmlscriptc",
  ".wmlscript": "text/vnd.wap.wmlscript",
  ".wmv": "audio/x-ms-wmv",
  ".wmx": "video/x-ms-wmx",
  ".wmz": "application/x-ms-wmz",
  ".wpng": "image/x-up-wpng",
  ".wps": "application/vnd.ms-works",
  ".wpt": "x-lml/x-gps",
  ".wri": "application/x-mswrite",
  ".wrl": "x-world/x-vrml",
  ".wrz": "x-world/x-vrml",
  ".ws": "text/vnd.wap.wmlscript",
  ".wsc": "application/vnd.wap.wmlscriptc",
  ".wv": "video/wavelet",
  ".wvx": "video/x-ms-wvx",
  ".wxl": "application/x-wxl",
  ".x-gzip": "application/x-gzip",
  ".xaf": "x-world/x-vrml",
  ".xar": "application/vnd.xara",
  ".xbm": "image/x-xbitmap",
  ".xdm": "application/x-xdma",
  ".xdma": "application/x-xdma",
  ".xdw": "application/vnd.fujixerox.docuworks",
  ".xht": "application/xhtml+xml",
  ".xhtm": "application/xhtml+xml",
  ".xhtml": "application/xhtml+xml",
  ".xla": "application/vnd.ms-excel",
  ".xlc": "application/vnd.ms-excel",
  ".xll": "application/x-excel",
  ".xlm": "application/vnd.ms-excel",
  ".xls": "application/vnd.ms-excel",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".xlt": "application/vnd.ms-excel",
  ".xlw": "application/vnd.ms-excel",
  ".xm": "audio/x-mod",
  ".xml": "application/xml",
  ".xmz": "audio/x-mod",
  ".xof": "x-world/x-vrml",
  ".xpi": "application/x-xpinstall",
  ".xpm": "image/x-xpixmap",
  ".xsit": "text/xml",
  ".xsl": "text/xml",
  ".xul": "text/xul",
  ".xwd": "image/x-xwindowdump",
  ".xyz": "chemical/x-pdb",
  ".yz1": "application/x-yz1",
  ".z": "application/x-compress",
  ".zac": "application/x-zaurus-zac",
  ".zip": "application/zip",
  ".json": "application/json"
}
~~~

### 处理动态资源

~~~js
// 加载node.js内置模块 http 使用它进行基于http的网络编程
const http = require("http")
const fs = require("fs");
const mime = require("./mime.json");

const server = http.createServer();
// 后期使用数据库存储，数据会交互
const users = [
  {id : 1, username: "qing-chen", gender: "男"},
  {id : 2, username: "chen-qing", gender: "男"}
]

server.on("connection", (socket)=> {
  console.log("有人发生请求了");
})

server.on("request", (req,res)=>{


  const url = req.url;
  let resContnet = "";



  if (url.startsWith("/public")) {
    // url ==> /public/1.html ==> ./public/1.html
    // 截取最后一个. 获取文件类型
    const lastIndex = url.lastIndexOf(".")
    const suff = url.substring(lastIndex);

    res.setHeader("Content-Type", mime[suff] + ";charset=utf-8");

    resContnet = fs.readFileSync("." + url);
  } else {
    if (url == "/now") {
      resContnet = (new Date).toString();
    } else if (url == '/users') {
      res.setHeader("Content-Type", "text/html;charset=utf-8");
      // resContnet = JSON.stringify(users);
      let str = users.map(user => {
        return `<li>${user.username}</li>`;
      }).join('')

      resContnet = `<ul>${str}</ul>`;
    } 
    else {
      resContnet = "啥也没有～";
    }
  }

  res.end(resContnet);
})

// 监听网卡和端口
server.listen(8888, ()=>{
  console.log("服务启动成功");
});
~~~

### 自定义模版

~~~ html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
  </head>
  <body>
    <ul>${str}</ul>
  </body>
</html>
~~~

~~~ js
// 加载node.js内置模块 http 使用它进行基于http的网络编程
const http = require("http")
const fs = require("fs");
const mime = require("./mime.json");

const server = http.createServer();
// 后期使用数据库存储，数据会交互
const users = [
  {id : 1, username: "qing-chen", gender: "男"},
  {id : 2, username: "chen-qing", gender: "男"}
]

server.on("connection", (socket)=> {
  console.log("有人发生请求了");
  // console.log("socket", socket);
})

server.on("request", (req,res)=>{

  const url = req.url;
  let resContnet = "";

  if (url.startsWith("/public")) {
    // url ==> /public/1.html ==> ./public/1.html
    // 截取最后一个. 获取文件类型
    const lastIndex = url.lastIndexOf(".")
    const suff = url.substring(lastIndex);

    res.setHeader("Content-Type", mime[suff] + ";charset=utf-8");

    resContnet = fs.readFileSync("." + url);
  } else {
    if (url == "/now") {
      resContnet = (new Date).toString();
    } else if (url == '/users') {
      res.setHeader("Content-Type", "text/html;charset=utf-8");
      // resContnet = JSON.stringify(users);

      let data = {
        title: 'qqc'
      };

      data.str =  users.map(user => {
        return `<li>${user.username}</li>`;
      }).join('')

      let tplConent = fs.readFileSync("./template/user.html").toString();
      tplConent = tplConent.replace(/\$\{(\w+)\}/gi, function($0, $1) {
        return data[$1];
      });

      resContnet = tplConent;
    } 
    else {
      resContnet = "啥也没有～";
    }
  }

  res.end(resContnet);
})

// 监听网卡和端口
server.listen(8888, ()=>{
  console.log("服务启动成功");
});
~~~

## 模板引擎

### Pug

- 需要导入依赖 koa koa-views koa-router pug

~~~ js
const Koa = require("koa");
const Router = require("koa-router");
const views = require("koa-views");

let app = new Koa();
let router = new Router();
app.use(views(__dirname+"/views", {
    map: {
        html: "pug"
    }
}));
router.get("/", async ctx=>{
    // ctx.body = "hello, pug!";
    await ctx.render("index.pug")
})
app.use(router.routes());
app.listen(3000);
~~~

~~~ html
//- index.pug
doctype html
html(lang="en")
    head
        meta(charset="UTF-8")
        meta(http-equiv="X-UA-Compatible", content="IE=edge")
        meta(name="viewport", content="width=device-width, initial-scale=1.0")
        title Document
        style.
            .mydiv {
                height: 200px;
                width: 200px;
                background: red;
            }
    body
        h1 我是一级标题
        div 这是第一个div
        div(class="mydiv") 这是class为mydiv的div
        .mydiv1(style={"background":"red","font-size":"22px"}) DIV111 
        #id idDIV--1
~~~

- 定义变量 使用 - let str = "test"
- 通过异步方法传值 

~~~ js
router.get("/", async ctx=>{
    // ctx.body = "hello, pug!";
    await ctx.render("index.pug", {
        data: "this is a test data"
    })
})

// index.pug 文件引用
- let str = "你好";
p #{str}
p #{data}
~~~

#### 注释

~~~ js
//- 这是PUG注释内容
//- 
    多行注释
    多行注释
// 这是html注释
//
    多行注释
    多行注释
div
    | 我是divvvv 
~~~

#### 循环遍历

~~~ js
//js 
const Koa = require("koa");
const Router = require("koa-router");
const views = require("koa-views");

let app = new Koa();
let router = new Router();
app.use(views(__dirname + "/views", {
    map: {
        html: "pug"
    }
}));
router.get("/", async ctx => {
    let users = [
        {
            name: "zhangsan",
            age: 20,
            height: "178cm"
        },
        {
            name: "lisi",
            age: 18,
            height: "176cm"
        },
        {
            name: "wuwang",
            age: 22,
            height: "168cm"
        },

    ]
    // ctx.body = "hello, pug!";
    await ctx.render("index.pug", {
        data: "this is a test data",
        users
    })
})
app.use(router.routes());
app.listen(3000);


// pug 
        //- 循环
        ul 
            each item, index in users
                li #{index} - 姓名是：#{item.name}, 年龄是: #{item.age}, 身高是：#{item.height}
        - for(let i = 0; i<users.length; i++)
            span 我是循环呈现出来的数据 #{users[i].name} - #{users[i].age} - #{users[i].height}
~~~

#### Case 语句

~~~ js
 //- case
 - let num  = 2
     case num 
         when 1
             p num is one 
         when 2
             p num is two 
         default
             p num is otherss
~~~

#### 定义宏、函数

- 定义 mixin 名称
- 调用 +名称

~~~ js
mixin myDiv 
	div 我是常用的div 
+myDiv
+myDiv
+myDiv
+myDiv

mixin pet(name, sex)
	p 这是一只#{name}, 它的性别是#{sex}
+pet("兔子","母的")
+pet("cat","母的")
+pet("pig","母的")
+pet("dog","母的")
~~~

#### 写js

~~~js
include common.pug // 引用公共部分
script(type="text/javascript"). // 注意一定要有这个.
	console.log(123)
~~~



