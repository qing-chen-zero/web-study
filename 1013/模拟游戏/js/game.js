import Player from "./player.js"
import Hero from "./hero.js"
import Skil from "./skills.js"
import Skin from "./skin.js"


// 处理游戏
class Game {
    constructor() {
        this.player = null
    }
    // 游戏登陆方法
    login(name) {
        let heroes = [
            new Hero("狄仁杰", "./sources/RenjieIcon.jpg",
                "./sources/Renjie.jpg",
                [new Skil("迅捷", "./sources/Renjie1.png"),
                new Skil("六令追凶", "./sources/Renjie2.png"),
                new Skil("逃脱", "./sources/Renjie3.png"),
                new Skil("王朝密令", "./sources/Renjie4.png")
                ],
                [
                    new Skin("断案大师", "./sources/Renjieskin1.jpg", "./sources/Renjie.jpg"),
                    new Skin("锦衣卫", "./sources/Renjieskin2.jpg", "./sources/Renjieskinmain2.jpg"),
                    new Skin("魔术师", "./sources/Renjieskin3.jpg", "./sources/Renjieskinmain3.jpg"),
                    new Skin("超时空战士", "./sources/Renjieskin4.jpg", "./sources/Renjieskinmain4.jpg"),
                ]
            ),
            new Hero("鲁班", "./sources/LubanIcon.jpg",
                "./sources/Luban.jpg",
                [new Skil("火力压制", "./sources/Luban1.png"),
                new Skil("河豚手雷", "./sources/Luban2.png"),
                new Skil("无敌鲨嘴炮", "./sources/Luban3.png"),
                new Skil("空中支援", "./sources/Luban4.png")
                ],
                [
                    new Skin("机关造物", "./sources/Lubanskin1.jpg", "./sources/Luban.jpg"),
                    new Skin("电玩小子", "./sources/Lubanskin2.jpg", "./sources/Lubanskinmain2.png"),
                    new Skin("狮舞东方", "./sources/Lubanskin3.jpg", "./sources/Lubanskinmain3.png"),
                    new Skin("寅虎·瑞焰", "./sources/Lubanskin4.jpg", "./sources/Lubanskinmain4.png"),
                ]
            )
        ]
        this.player = new Player(name, heroes)
        // 调取初始化方法
        console.log(this.player);
        this.player.heroes.forEach(hero => {
            hero.trigger("initFn")
        });
        // this.player = {
        //     name: name,
        //     heroes: [
        //         {
        //             name:"狄仁杰",
        //             icon:"./sources/RenjieIcon.jpg",
        //             skills:[], // 技能
        //             skins:[]   // 皮肤
        //         },
        //         {
        //             name:"鲁班",
        //             icon:"./sources/LubanIcon.jpg",
        //             skills:[], // 技能
        //             skins:[]   // 皮肤
        //         }
        //     ]
        // }
    }
}

// 2022-10-14 改写单例模式
let instance;
// 多个参数设计传参
export default function createInstance(...arg){
    if (!instance) {
        instance = new Game(...arg);
    }
    return instance;
}