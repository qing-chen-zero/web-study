/*
    1. 通过浏览器请求一个基础的html页面，浏览器解析该页面的过程中，执行页面中包含的js
    通过js中的ajax请求必要的数据。渲染数据
*/

const defaultOptions = {
    method: 'get',
    url: ''
}

// 执行
getTypes();
getItems(1,1);


let navElement = document.querySelector("#nav");

// 获取商品类型
async function getTypes() {
    const options = {
        method : 'get',
        url : '/getTypes'
    }
    let rs = await ajax(options);
    
    if(!rs.code) {
        let data = rs.data;
        data.forEach(item => {
            let aElem = document.createElement('a');
            aElem.href = "/" + item.id
            aElem.innerHTML = item.name;
            navElement.appendChild(aElem);
        });

    }

}

// 获取商品
async function getItems(categoryId = '', page = 1) {
    const options = {
        method : "get",
        url : `/${categoryId}?page=${page}`
    }
    let rs = await ajax(options);
    console.log(rs);
}


function ajax(options) {
    options = {
        ...defaultOptions,
        ...options
    }
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(options.method, options.url, true);
        xhr.onload = function () {

            // 判断返回数据类型
            if (xhr.getResponseHeader('content-type').includes('json')) {
                resolve(JSON.parse(xhr.responseText));
            }else {
                resolve(xhr.responseText);
            }            
        }
        xhr.onerror = function() {
            reject("error")
        }
        xhr.send();
    })
}