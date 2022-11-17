export default class Food {
    constructor(cells = 10, rows = 10, colors = ["red", "#fff", "yellow", "pink", "blue"]) {
        this.cells = cells;
        this.rows = rows;
        this.colors = colors;
        this.data = null;
        this.create();
    }
    create() {
        let x = Math.floor(Math.random() * this.cells);
        let y = Math.floor(Math.random() * this.rows);
        let color = this.colors[parseInt(Math.random() * this.colors.length)];
        this.data = {x, y, color};
    }
}