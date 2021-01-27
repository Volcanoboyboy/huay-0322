/**
 * 利用计时器循环生成碎片组,用背景对应位置填充每个碎片,然后利用C3随机翻转
 */

const imgarr = ["C7.jpg", "nier.jpg", "qinchun.jpg", "skl.jpg"];
let index = 0;
let z = 999999;
//  最外层父节点
var booimg = document.querySelector(".booimg");


boom(10, 10);
function boom(x, y) {
    //  要利用最外层节点清空内部元素,实现更新,所以这个容器要重复喧嚷
    let box = document.createElement("div");
    box.style.zIndex = z;
    //  这里是为了让下一张图片显示的时候不挡住正在过渡的当前图片
    z--;
    booimg.appendChild(box);
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            // 创建碎片
            let subdiv = document.createElement('div');
            //  设置碎片大小
            subdiv.style.width = box.offsetWidth / x + "px";
            subdiv.style.height = box.offsetHeight / y + "px";

            //  设置碎片位置
            subdiv.style.top = i * (box.offsetHeight / y) + "px";
            subdiv.style.left = j * (box.offsetWidth / x) + "px";

            //  设置背景位置
            subdiv.style.backgroundImage = `url(./images/${imgarr[index]})`;
            subdiv.style.backgroundPositionX = - j * (box.offsetWidth / x) + "px";
            subdiv.style.backgroundPositionY = - i * (box.offsetHeight / y) + "px";

            //  自身添加过渡效果 随机可以是每一个碎片随机消失
            subdiv.style.transition = Math.random() + 0.5 + "s";

            //  添加
            box.appendChild(subdiv);
        }
    }

    let allsubdiv = box.children;
    setTimeout(() => {
        index++;
        index == imgarr.length && (index = 0);
        z == 0 && (z = 999999);
        boom(10, 10);
        for (let i = 0; i < allsubdiv.length; i++) {
            allsubdiv[i].style.transform = `perspective(800px) rotateX(${(Math.random()*500-250)}deg) rotateY(${(Math.random()*500-250)}deg) translateX(${(Math.random()*500-250)}px) translateY(${(Math.random()*500-250)}px) translateZ(${(Math.random()*1000-500)}px)`;
            allsubdiv[i].style.opacity = 0;
        };
    }, 1500)

    setTimeout(() => {
        box.remove();
    }, 3000)

}