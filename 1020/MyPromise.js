export default class MyPromise {
    constructor(handle) {
        this.status = "pending";
        this.value = undefined;
        handle(this._resolve.bind(this), this._reject.bind(this));
        // this.fulfilledFn = undefined;
        // this.rejectedFn = undefined;
        // 修改为队列
        this.fulfilledFnQueue = [];
        this.rejectedFnQueue = [];
    }
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

        // setTimeout(run, 0);

        // 使用MutationObserve
        let ob = new MutationObserver(run)
        ob.observe(document.body, {
            attributes: true
        })
        document.body.setAttribute("qc", Math.random());

    };
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

        // setTimeout(run, 0); 

        // 使用MutationObserve
        let ob = new MutationObserver(run)
        ob.observe(document.body, {
            attributes: true
        })
        document.body.setAttribute("qc", Math.random());
    }

    then(onResolved, onRejected) {
        return new MyPromise((resolve, reject) => {
            if (this.status === "fulfilled") {
                onResolved && onResolved(this.value);
            } else if (this.status === "rejected") {
                onRejected && onRejected(this.value);
            } else if (this.status === "pending") {// 不执行，但是保存onResolved 或者 onRejected
                // this.fulfilledFn = onResolved;
                // this.rejectedFn = onRejected;
                // 修改为队列
                // 保存
                // 需要onResovled onRejected 执行结果
                // 没有执行，通过一个函数，把逻辑放在的队列（fulfilledFnQueue、rejectedFnQueue）中
                let resolveFn = (val) => {
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

                let rejectFn = (val) => {
                    let res = onRejected && onRejected(val);
                    reject(res);
                }

                this.fulfilledFnQueue.push(resolveFn);
                this.rejectedFnQueue.push(rejectFn);
            }
        })
    }
    static resolve(val) {
        return new MyPromise(resolve => {
            resolve(val);
        })
    }

    static reject(val) {
        return new MyPromise((resolve, reject) => {
            reject(val);
        })
    }

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
    finally(cb) {
        // return this.then((value)=>this._resolve(cb()).then(()=>value),
        // (reason)=>this._resolve(cb()).then(()=>{
        //     console.log(reason);
        // }))
        return this.then(resolve=>{
            this._resolve(cb())
        }, rejecet=>{
            this._reject(cb())
        })
    }
}