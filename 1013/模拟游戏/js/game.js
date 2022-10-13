import Player from "./player.js"
import Hero from "./hero.js"
import Skil from "./skills.js"

// 处理游戏
export default class Game {
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
                ]
            ),
            new Hero("鲁班", "./sources/LubanIcon.jpg",
                "./sources/Luban.jpg",
                [new Skil("火力压制", "./sources/Luban1.png"),
                new Skil("河豚手雷", "./sources/Luban2.png"),
                new Skil("无敌鲨嘴炮", "./sources/Luban3.png"),
                new Skil("空中支援", "./sources/Luban4.png")
                ]
            )
        ]
        this.player = new Player(name, heroes)
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