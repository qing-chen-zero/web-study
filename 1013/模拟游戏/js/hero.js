import GameEvent from "./gameEvent.js"

export default class Hero extends GameEvent {
    //          名称、图标地址、技能、皮肤    
    constructor(name, icon, mainImg, skills, skins) {
        super(),
        this.name = name,
        this.icon = icon,
        this.mainImg = mainImg,
        this.skills = skills ?? [],
        this.skins = skins ?? []
        this.addEvent("initFn", this.init);
        this.addEvent("initFn", this.test);
        this.removeEvent("initFn",this.test); // 删除指定的事件
    }
    init() {
        console.log("正在初始化...");
    }
    test() {
        console.log("test remove...");
    }
}