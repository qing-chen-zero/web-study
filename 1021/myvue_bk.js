class Vue extends EventTarget {
    constructor(opts) {
        super();
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
                    // 通过事件名称关联 ket === $1
                    this.addEventListener($1, e=>{
                        console.log("触发了事件..", e);
                        let newVal = e.detail;
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
}

// 收集器
class Dep {
    constructor() {
        this.subs = []
    }
    addSub(sub) {
        this.subs.push(sub);
    }
    notify() {
        this.subs.forEach(sub=>{
            sub.update();
        })
    }
}

// 订阅者
class Watcher {
    constructor(cb) {
        this.cb = cb;
    }
    update() {
        this.cb();
    }
}