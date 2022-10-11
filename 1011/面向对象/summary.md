### 面向对象编程思想

#### 一、面向过程：注重解决问题的步骤、分析问题需要的每一步，实现函数依次调用

#### 二、面向对象：是一种程序设计思想。讲数据和处理数据的程序封装到对象中

#### 三、面向对象特征：抽象、继承、封装、多态

### 优点：提高代码的复用性及可维护性

## new 运算法

### 简化工程模式

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

##### 类里的方法创建很浪费空间。使用原型解决问题

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

#### 每个实例化对象都有一个__"___proto_"与 函数的prototype 一致

####使用constructor判断类型

~~~javascript
//使用constructor判断类型
let type = new String("test");
let types = "test";
console.log(type.constructor === String);
console.log(types.constructor ===  String);
~~~

![image-20221011192410752](/Users/qingchen/Library/Application Support/typora-user-images/image-20221011192410752.png)

