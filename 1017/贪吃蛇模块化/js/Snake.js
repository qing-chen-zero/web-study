// 蛇类
export default class Snake {
    // 仅处理数据
    constructor() {
        this.data = [
            { x: 6, y: 4, color: "green" },
            { x: 5, y: 4, color: "white" },
            { x: 4, y: 4, color: "white" },
            { x: 3, y: 4, color: "white" },
            { x: 2, y: 4, color: "white" },
        ]
        this.direction = "right";
    }
    // 移动方法
    move() {
        let i = this.data.length - 1;
        this.lastData = {
            x: this.data[i].x,
            y: this.data[i].y,
            color: this.data[i].color
        }
        for (i; i > 0; i--) {
            this.data[i].x = this.data[i - 1].x
            this.data[i].y = this.data[i - 1].y
        }

        /*
            让后面每一格都走到前一格的位置
        */
        // 根据方向移动
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

    // 改变方向 如果蛇正在左右移动，则不能改变左右、 正在上下移动，则不能改变上下方向
    changeDir(dir) {
        if (this.direction === "left" || this.direction === "right") {
            if (dir === "left" || dir === "right") return false; // 此时不能修改方向              
        } else {
            if (dir === "up" || dir === "dowm") return false;
        }
        this.direction = dir;
        return true;
    }
    // 蛇吃到食物，应该变大
    eatFood() {
        this.data.push(this.lastData);
    }
}