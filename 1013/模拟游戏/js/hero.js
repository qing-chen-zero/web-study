export default class Hero {
    //          名称、图标地址、技能、皮肤    
    constructor(name, icon, mainImg, skills, skins) {
        this.name = name,
        this.icon = icon,
        this.mainImg = mainImg,
        this.skills = skills ?? [],
        this.skins = skins ?? []
    }
}