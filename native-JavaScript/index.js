const container = document.getElementById('container');
var images = document.querySelectorAll(".photo");
window.onload = checkImgs;
// 当window加载时触发
container.onscroll = throttle(checkImgs);

function isInSight(el) {
    const itemTop = el.getBoundingClientRect().top;
    // 获取元素顶部
    const viewBottom = container.getBoundingClientRect().bottom;
    // 获取视窗底部位置
    return itemTop <= viewBottom + 100;
    // +100为了提前加载
}

function checkImgs() {
    const imgs = document.querySelectorAll('.photo');
    Array.from(imgs).forEach(el => {
        if (isInSight(el)) {
            loadImg(el);
        }
    })
}

function loadImg(el) {
    if (!el.src) {
        const sourse = el.dataset.src;
        // 读取自定义数据属性
        el.src = sourse;
    }
}

function throttle(fn, mustRun = 500) {
    let previous = null;
    return function() {
        console.log(previous)
        const now = new Date();
        const context = this; //container
        const args = arguments;
        if(!previous) {
            previous = now;
        }
        const remaining = now - previous;
        if (mustRun && remaining >= mustRun){
            fn.apply(context, args);
            previous = now;
        }
    }
}
