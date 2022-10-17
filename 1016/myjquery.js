
class Jq {
    constructor(args, root) {
        // this.args = args;
        // root  上次操作的节点
        // 保存之前选择的节点
        if (typeof root === "undefined") {
            this.preventObj = [document];
        } else {
            this.preventObj = root;
        }



        // 通过传入参数 拿到 选择的节点
        // 仅能获取一个节点
        // this.ele = document.querySelector(args);

        // 目前还未区分传入过来的参数类型，如果不是个类选择器之类的字符串就会报错
        // 使用typeof来解决此方法
        if (typeof args === "string") {
            // 情况一， 处理字符串 解析多个节点
            // 获取多个节点
            let eles = document.querySelectorAll(args)
            // this -> 就是一个对象 可通过不同的赋值 this[0] = eles[0] ... this[n] = eles[n]
            // 使用循环的方式进行渲染
            // for (let i = 0; i < eles.length; i++) {
            //     this[i] = eles[i];
            // }
            // this.length = eles.length;
            // 抽离函数
            this.addELes(eles);
        } else if (typeof args === "function") {
            // 情况二， 处理函数
            window.addEventListener("DOMContentLoaded", args);
        } else {
            // 情况三，处理其他参数 对象
            if (typeof args.length === "undefined") {
                // 对象
                // 一个节点
                this[0] = args;
                this.length = 1;
            } else {
                // 多个节点
                // 数组
                this.addELes(args);
            }
        }


    };

    // 把函数当成参数传入另一个函数，或者函数把函数当成返回参数， 高阶函数
    click(fn) {
        // console.log("clicking me",this.args);
        // fn();

        // 容错
        // fn && fn();

        // 通过原生方法执行
        // 仅绑定了一个
        // this.ele.addEventListener("click", fn);
        // 需要绑定多个
        for (let i = 0; i < this.length; i++) {
            this.addEvent(this[i], "click", fn);
        }
        // 链式操作；
        return this;
    }
    addEvent(ele, eventName, fn) {
        ele.addEventListener(eventName, fn);
    }
    addELes(eles) {
        for (let i = 0; i < eles.length; i++) {
            this[i] = eles[i];
        }
        this.length = eles.length;
    }

    // test() {
    //     return function() {
    //         console.log("返回的函数");
    //     }
    // }
    on(eventName, fn) {
        // 多个事件
        let eventArr = eventName.split(" ");

        // 多个节点绑定多个事件
        for (let i = 0; i < this.length; i++) {
            for (let j = 0; j < eventArr.length; j++) {
                this.addEvent(this[i], eventArr[j], fn);
            }
        }
    }
    eq(index) {
        // return this[index];
        return new Jq(this[index], this)
    }

    get(index) {
        return this[index];
    }
    end() {
        return new Jq(this["preventObj"]);
    }


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

    // 设置animate函数
    animate(properties, duration) {
        for (let index = 0; index < this.length; index++) {
            let ele = this[index];
            ele.animate(properties,{duration: duration});
        }
        setTimeout(()=>{
            for (let index = 0; index < this.length; index++) {
                let ele = this[index];
                for (const key in properties) {
                    this.setStyle(ele,key, properties[key]);
                }
            }
        }, duration)
        
    }
}


function $(args) {
    // return {
    //     click() {
    //         console.log("clicking me", args);
    //     }
    // }

    // 初始化、 默认document
    return new Jq(args);
}


$.cssNumber = {
    animationIterationCount: true,
    columnCount: true,
    fill0pacity: true,
    flexGrow: true,
    flexShrink: true,
    fontWeight: true,
    gridArea: true,
    gridColumn: true, 
    gridColumnEnd: true, 
    gridColumnStart: true, 
    gridRow: true,
    gridRowEnd: true, 
    gridRowStart: true, 
    lineHeight: true, 
    opacity: true, 
    order: true, 
    orphans: true,
    widows: true,
    zIndex: true,
    zoom: true
}

$.cssHooks = {}