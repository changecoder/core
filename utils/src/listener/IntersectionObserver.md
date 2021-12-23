# IntersectionObserver API

## Usage
```
// 创建对象实例
const io = new IntersectionObserver(callback, option)
// 启动观察
io.observe(domElement)
//停止观察
io.unobserve(domElement)
```

### Callback
首先是callback的触发是在domElement进入视口和离开视口,然后就是callback的参数

第一个是IntersectionObserverEntry数组

* time
* target
* rootBounds: 根元素的矩形区域的信息
* boundingClientRect: 目标元素的矩形区域的信息
* intersectionRect: 目标元素与根元素的交叉区域的信息
* intersectionRatio: 目标元素的可见比例

第二个是Option对象
* threshold:设置触发机制，为数组，值为0 - 1，表示ratio的值
* root: 根元素

## IntersectionObserver API 是异步的，并且底部实现采用requestIdleCallback