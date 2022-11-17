export default class Snake {
    constructor() {
        this.data = [
            { x: 6, y: 4, color: "green" },
            { x: 5, y: 4, color: "white" },
            { x: 4, y: 4, color: "white" },
            { x: 3, y: 4, color: "white" },
            { x: 2, y: 4, color: "white" },
        ]
        this.direction = "right"
    }
    move() {
        let i = this.data.length - 1;
        this.lastData = {
            x: this.data[i].x,
            y: this.data[i].y,
            color: this.data[i].color
        }
        for (i; i > 0; i--) {
            this.data[i].x = this.data[i - 1].x;
            this.data[i].y = this.data[i - 1].y;
        }
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
    changeDir(dir) {
        if (this.direction == "right" || this.direction == "left") {
            if (dir === "right" || dir === "left") {
                return false;
            }
        } else {
            if (dir === "up" || dir === "down") {
                return false;
            }
        }
        this.direction = dir;
        return true;
    }
    eatFood() {
        this.data.push(this.lastData);
    }
}