export default class GameEvent {
    constructor() {
        this.handles = []
    }
    // 注册事件
    addEvent(eventName, fn) {
        if (typeof this.handles[eventName] === "undefined") {
            this.handles[eventName] = []
        }
        this.handles[eventName].push(fn)
    }
    // 触发事件
    trigger(eventName) {
        if (typeof this.handles[eventName] === "undefined") {
            return;
        }
        this.handles[eventName].forEach(fn => {
            fn()
        })
    }
    // 删除指定的自定义事件
    removeEvent(eventName, fn) {
        
    }
}