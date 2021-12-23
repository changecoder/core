# Performance

## Navigation Timing Level 2 
[文档地址](https://www.w3.org/TR/navigation-timing-2/) 新的时间线
![alt Navigation Timing Level 2时间线](https://www.w3.org/TR/navigation-timing-2/timestamp-diagram.svg)

## 对于获取到的性能上报数据，需要做进一步过滤
* 浏览器缓存命中的数据

## 内存泄露
内存不足会影响页面性能，因为内存不足会造成不断GC，而GC会阻塞主线程, 造成卡顿

## SPA - FMP
单页面应用，如React, 在对“首屏”时间的计算上，业内有不同的计算方式
1. 自定义打点
2. 利用performance
3. 通过区域内所有图片加载时间，然后取其最大值
4. 利用MutationObserver接口监听document对象的节点变化