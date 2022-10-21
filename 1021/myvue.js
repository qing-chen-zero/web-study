class Vue {
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