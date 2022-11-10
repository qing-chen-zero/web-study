let uploadElem = document.querySelector("#uploadBtn");
let attachmentsElem = document.querySelector("#attachment");
let taskPanelElem = document.querySelector("#task_panel");
let taskBodyElem = document.querySelector("#task_body");
let imgList = document.querySelector(".content-list");
let nameElem = document.querySelector("#name");
let pwdElem = document.querySelector("#pwd");
let loginBtnELem = document.querySelector("#loginBtn");
const baseURL = axios.defaults.baseURL = "/api";
axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");

loadImg()

uploadElem.onclick = function () {
    attachmentsElem.click();
}
attachmentsElem.onchange = async function () {
   
    let li = document.createElement("li");
    let span = document.createElement("span");
    span.innerHTML = attachmentsElem.files[0].name;
    let div1 = document.createElement("div");
    div1.classList.add("task-progress-status");
    let div2 = document.createElement("div");
    div2.classList.add("progress");
    li.appendChild(span);
    li.appendChild(div1);
    li.appendChild(div2);
    let fd = new FormData();
    fd.append("file", attachmentsElem.files[0]);
    let {data} = await axios({
        method: 'post',
        url : '/upload',
        data: fd
    })
    loadImg();


    // let xhr = new XMLHttpRequest()
    // xhr.open('post', '/api/upload', true)
    // xhr.upload.onloadstart = function () {
    //     taskPanelElem.style.display = "block";
    //     div1.innerHTML = "准备上传中..."
    //     taskBodyElem.appendChild(li);

    // }
    // // 与上传下载有关的数据（上传总大小、已经上传的大小）
    // xhr.upload.onprogress = function (evt) {
    //     div1.innerHTML = "上传中...";
    //     div2.style.width = ((evt.loaded / evt.total) * 100).toFixed(2) + '%';
    // }
    // // 后端响应完成之后的
    // xhr.onload = function () {
    //     div1.innerHTML = "上传完成";
    //     taskPanelElem.style.display = "none";
    //     loadImg()
    // }
    // let fd = new FormData()
    // fd.append("file", attachmentsElem.files[0]);
    // xhr.send(fd);
}

async function loadImg() {
    // imgList.innerHTML = ""
    // let xhr = new XMLHttpRequest();
    // xhr.open('get', '/api/getPhotos', true);
    // xhr.onload = function () {
    //     let res = JSON.parse(xhr.responseText);
        // if (!res.code) {
        //     res.data.res.forEach(item => {
        //         let div = document.createElement("div");
        //         div.classList.add("img-div")
        //         let img = document.createElement("img");
        //         img.src = "/api/static/upload/" + item.filename
        //         let span = document.createElement("span");
        //         span.innerHTML = item.filename
        //         div.appendChild(img);
        //         div.appendChild(span)
        //         imgList.appendChild(div);
        //     })
        // }
    // }
    // xhr.send();
    let {data} = await axios.get('/getPhotos');
    console.log(data);
    if (!data.code) {
        imgList.innerHTML = ""
        data.data.forEach(item => {
            let div = document.createElement("div");
            div.classList.add("img-div")
            let img = document.createElement("img");
            img.src = baseURL +"/static/upload/" + item.filename
            let span = document.createElement("span");
            span.innerHTML = item.filename
            div.appendChild(img);
            div.appendChild(span)
            imgList.appendChild(div);
        })
    }
}

// login

loginBtnELem.onclick = async function () {
    let {data, headers: {authorization}} = await axios.post('/login', {
        name: nameElem.value,
        password: pwdElem.value
    })

    if(data.code) {
        alert(data.message);
    } else {
        alert("success");
        localStorage.setItem('token', authorization);
        loadImg();
    }
}