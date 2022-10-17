// Game 类 -- 游戏控制类

import Event from "./Event.js";
import Snake from "./Snake.js";
import Food from "./Food.js";
import Map from "./Map.js";

export default class Game extends Event {
    constructor(el, rect) {
        super();
        this.map = new Map(el, rect);
        this.food = new Food(this.map.cells, this.map.rows);
        this.snake = new Snake();
        this.map.setData(this.snake.data);
        this.createFood();
        this.render()
        this.timer = 0;
        this.interval = 200;
        this.keyDown = this.keyDown.bind(this); // 绑定this
        this.grade = 0;
        this.control();
    }
    // 开始游戏
    start() {
        this.move();
    }
    // 暂停游戏
    stop() {
        clearInterval(this.timer);
    }
    // 控制移动
    move() {
        this.stop();
        this.timer = setInterval(() => {
            this.snake.move();
            if (this.isEat()) {
                this.grade++;
                this.snake.eatFood();
                this.createFood();
                this.changeGrade(this.grade);
                this.interval *= 0.95; // 加速
                this.stop();
                this.start();
                if (this.grade >= 50) {
                    this.over(1);
                }
            }
            if (this.isOver()) {
                this.over(0);
                return;
            }
            this.render();
        }, this.interval);
    }
    // 判断是否吃到食物
    isEat() {
        return this.snake.data[0].x === this.food.data.x && this.snake.data[0].y === this.food.data.y;
    }

    // 判断是否结束
    isOver() {
        // 判断蛇出了地图
        if (this.snake.data[0].x < 0
            || this.snake.data[0].x >= this.map.cells
            || this.snake.data[0].y < 0
            || this.snake.data[0].y >= this.map.rows) {
            return true;
        }
        // 判断蛇装到了自己
        for (let i = 1; i < this.snake.data.length; i++) {
            if (this.snake.data[0].x === this.snake.data[i].x
                && this.snake.data[0].y === this.snake.data[i].y) {
                return true;
            }
        }
        return false; // 没装
    }
    // 游戏结束
    // overStatus = 0 中间停止，完死了  1 游戏胜利
    over(overStatus = 1) {
        if (overStatus) {
            // this.toWin && this.toWin();
            this.dispatch("win");
        } else {
            // this.toOver && this.toOver();
            this.dispatch("over");
        }
        this.stop();
    }
    keyDown({ keyCode }) {
        // console.log(keyCode);
        let isDir;
        switch (keyCode) {
            // left
            case 37:
                isDir = this.snake.changeDir("left");
                break;
            // up
            case 38:
                isDir = this.snake.changeDir("up");
                break;
            // right
            case 39:
                isDir = this.snake.changeDir("right");
                break;
            // down
            case 40:
                isDir = this.snake.changeDir("down");
                break;
        }
    }
    // 游戏控制器
    control() {
        // 判断用户是否又自己的控制器
        if (this.toControl) {
            this.toControl();
            return;
        }
        window.addEventListener("keydown", this.keyDown);
    }
    // 添加控制
    addControl(fn) {
        fn.call(this);
        // 移除已有的控制器
        window.removeEventListener("keydown", this.keyDown);
    }
    // 分数改变
    changeGrade(grade) {
        this.dispatch("changeGrade", grade);
    }
    createFood() {
        this.food.create();
        if (this.map.include(this.food.data)) {
            this.createFood();
        }
    }
    // 向地图渲染数据
    render() {
        this.map.clearData();
        this.map.setData(this.snake.data);
        this.map.setData(this.food.data);
        this.map.render();
    }
}