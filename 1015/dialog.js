import GameEvent from "../1013/模拟游戏/js/gameEvent.js";

// 封装组件；
export default class Dialog extends EventTarget { // 系统提供的事件  //GameEvent {  // 自定义的事件
    constructor(opts) {
        super();
        // 合并配置参数
        this.opts = Object.assign({
            width: "30%",
            height: "250px",
            title: "测试标题",
            content: "测试内容",
            dragable: true, // 是否可拖拽
            maskable: true, // 是否有遮罩
            isCancel: false, // 是否可取消
            success(){},
            cancel(){}
        }, opts);
        console.log(this.opts);
        this.init()
    }

    open() {
        console.log("open....");
        this.dialogEle.style.display = "block";
    }
    init() {
        this.createHtml();
        if (!this.opts.maskable) {
            this.dialogEle.querySelector(".k-wrapper").style.display = "none";
        }

        // 绑定自定义事件
        // this.addEvent("success", this.opts.success);
        // 关联系统提供的事件
        this.addEventListener("success", this.opts.success);


        // 事件委托
        this.dialogEle.querySelector(".k-dialog").addEventListener('click', e => {
            switch (e.target.className) {
                case "k-cancel":
                    this.close();
                    break;
                case "k-primary":
                    this.close();
                    this.confirm();
                    break;
                case "k-close":
                    this.close();
                    break;
            }
        })

        if (this.opts.dragable) this.dragable();

    }
    createHtml() {
        let dialogEle = document.createElement("div");
        dialogEle.style.display = "none";
        dialogEle.innerHTML = `
        <div class="k-wrapper"></div>
        <div class="k-dialog" style="width:${this.opts.width};height:${this.opts.height}">
            <div class="k-header">
                <span class="k-title">${this.opts.title}</span>
                <span class="k-close">X</span>
            </div>
            <div class="k-body">
                <span>${this.opts.content}</span>
            </div>
            <div class="k-footer">
                ${this.opts.isCancel ? '<span class="k-cancel">取消</span>' : ''}
                <span class="k-primary">确定</span>
            </div>
        </div>
        `
        document.body.appendChild(dialogEle);
        this.dialogEle = dialogEle
    }

    close() {
        this.dialogEle.style.display = "none"; 
    }

    dragable() {
        let kDialog = this.dialogEle.querySelector(".k-dialog")
        kDialog.onmousedown = function(e) {
            let x = e.clientX - kDialog.offsetLeft;
            let y = e.clientY - kDialog.offsetTop;
            kDialog.onmousemove = function(e) {
                let xx = e.clientX;
                let yy = e.clientY;
                kDialog.style.left = xx - x + "px";
                kDialog.style.top = yy - y + "px";
            }
            kDialog.onmouseup = function() {
                kDialog.onmousemove = ""
            }
        }
    }
    // 点击确认 触发succe
    confirm(value) {
        // 触发自定义事件
        // this.trigger("success");
        // 使用系统提供的触发事件
        this.dispatchEvent(new CustomEvent("success", {
            detail: value
        }));
    }
}


export class InputDialog extends Dialog {
    constructor(opts) {
        super(opts);
        this.createInput();
    }
    createInput() {
        let myInput = document.createElement("input");
        myInput.type = "text";
        myInput.classList.add("input-inner");
        this.dialogEle.querySelector(".k-body").appendChild(myInput);
        this.myInput = myInput;
    }
    confirm() {
        // console.log("点了InputDialog的确定");
        console.log(this.myInput);
        let value = this.myInput.value; 
        // console.log(this.myInput);
        super.confirm(value);
    }
}

// 自定义组件
class MyDialog extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `<button>${this.innerText}</button>`;

        let dialog = new Dialog({
            // 进行配置
            title: this.title,
            content: this.content,
            success:(e)=>{
                this.dispatchEvent(new CustomEvent("success",{detail: e.detail}))
            }
        })

        this.onclick = function() {
            dialog.open()
        }
    }

    // 通过get处理默认参数
    get title() {
        return this.getAttribute("title") ?? "默认标题"; 
    }
    get content() {
        return this.getAttribute("content") ?? "默认内容";
    }
}

customElements.define("my-dialog", MyDialog);