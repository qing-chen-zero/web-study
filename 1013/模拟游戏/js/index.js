// 处理视图
import Game from "./game.js";
let game = new Game();

document.querySelector(".login_btn").onclick = function (){
    let username = document.querySelector("#username").value;
    if (username != "") {
        game.login(username)
        console.log(game);
        document.querySelector(".login").style.display = "none";
        document.querySelector(".game").style.display = "flex";
        document.querySelector(".user").innerHTML = username
        renderHero(game.player.heroes);
    } else {
        alert("请输入用户名");
    }
}

// 渲染英雄
function renderHero(heroes) {
    document.querySelector(".select_hero").innerHTML = "";
    heroes.forEach(item => {
        let hero = document.createElement("div");
        hero.classList.add("hero")
        hero.innerHTML = `<img src="${item.icon}" alt="" class="hero_icon"><span>${item.name}</span>`
        document.querySelector(".select_hero").appendChild(hero);
        //点击英雄，渲染数据
        hero.onclick = function(e) {
            // 倒计时30秒  TODO: 
            // let time = 30;
            // let timer = document.querySelector(".time");
            // setInterval(()=>{
            //     if (time > 0) {
            //         timer.innerHTML = "00:" + time;
            //         time--;
            //     }
            // }, 1000)

            // 获取当前所选英雄主体
            let select_hero_main = document.querySelector(".hero_main")
            if (select_hero_main != undefined) document.querySelector("#mid").removeChild(select_hero_main);
            let hero_main = document.createElement("img") // 创建英雄主体图片
            hero_main.classList.add("hero_main");
            hero_main.src = item.mainImg
            document.querySelector("#mid").appendChild(hero_main)
            renderSkills(item.skills)
            // 获取默认选择英雄图标
            let select_hero_icon = document.querySelector(".select_hero_icon");
            select_hero_icon.src = item.icon

            
        }
    });
}

//渲染技能
function renderSkills(skills) {

    document.querySelector("#hero_skills").innerHTML = ""
    skills.forEach(item => {
        let skill = document.createElement("img")
        skill.src = item.icon
        document.querySelector("#hero_skills").appendChild(skill);
    })
}

// let hero_list = document.querySelectorAll(".hero");
// console.log(hero_list);

// [...hero_list].forEach(item => {
//     item.onclick = function (e) {
//         console.log(e);
//     }
// })