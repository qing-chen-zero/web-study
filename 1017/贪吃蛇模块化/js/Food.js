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