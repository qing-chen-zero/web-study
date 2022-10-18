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

