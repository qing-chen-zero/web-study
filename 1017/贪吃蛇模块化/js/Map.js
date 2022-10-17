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