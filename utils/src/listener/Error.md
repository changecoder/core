# Error Exception Checklist
* JavaScript 语法错误: 解析失败
* JavaScript 代码逻辑错误: 内存溢出
* AJAX请求异常
* 静态资源加载异常
* Promise异常
* 跨域
* iframe
* 奔溃和卡顿

## 白屏

## 场景
* try catch: 只能捕获到同步的运行时错误，无法捕获语法错误，也无法捕获异步错误
* onerror: JS运行时错误发生时触发，所以同样无法捕获语法错误，也无法捕获异步错误，静态资源加载错误
* window.addEventListener: 资源(js, img)加载失败，能通过addEventListener对错误类型捕获，但无法判断状态码，需要结合服务端日志排查
* unhandledrejection: 全局监听Uncaught Promise Error
* ErrorBoundary: React中的错误边界概念, 但同样事件处理器, 异步代码,以及自身内部代码错误无法捕获
* Script Error: 跨域问题, 可能需要列出来单独说明

## 奔溃处理

### 利用window对象的load和beforeunload事件实现了网页崩溃的监控
1. 其思路利用了页面崩溃无法触发beforeunload事件来实现
2. load写入状态和读取状态，对状态进行判断，确认是否是奔溃
方案存在缺陷
1. 由于页面奔溃随之而来的是浏览器tab关闭甚至浏览器关闭，若是采取会话级存储状态，则会丢失
2. 同样未做唯一判断，在打开多个tab进入相同页面时，存在错误判断问题

### Service Worker
主要是基于Service Worker的独立线程实现一个类似于心跳检测功能
1. 网页加载后，通过postMessage API每5s给sw发送一个心跳，表示自己的在线，sw将在线的网页登记下来，更新登记时间
2. 网页在beforeunload时，通过postMessage API告知自己已经正常关闭，sw将登记的网页清除
3. 如果网页在运行的过程中crash了，sw中的running状态将不会被清除，更新时间停留在奔溃前的最后一次心跳
4. Service Worker每10s查看一遍登记中的网页，发现登记时间已经超出了一定时间（比如 15s）即可判定该网页crash了。
方案存在缺陷
1. 若是浏览器奔溃，service worker也会跟着关闭

### socket

## 卡顿
卡顿问题，属于渲染阻塞问题，首先是获取FPS值，而后是获取内存，线程任务执行状况