function query(selector) {
  return Array.from(document.querySelectorAll(selector));
}

// root属性指定目标元素所在的容器节点（即根元素）。注意，容器元素必须是目标元素的祖先节点。
var opts={
  root: document.querySelector('#container'),
}

// 目标元素的可见性变化时，就会调用观察器的回调函数callback。
const observerCallback = (changes) => {
  changes.forEach(function(change) {
    // console.log(change)
    var el = change.target; //被观察的目标元素，是一个 DOM 节点对象
    var intersectionRatio = change.intersectionRatio;
    console.log(change.intersectionRect)
    if(intersectionRatio > 0 && intersectionRatio <= 1){
      const source = el.dataset.src;
      el.src = source;
    }
    el.onload = el.onerror = () => observer.unobserve(el);
  })
}

var observer = new IntersectionObserver(observerCallback, opts)

query('.photo').forEach(function(item, index) {
    observer.observe(item);
})