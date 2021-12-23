# Front-End Performance Checklists

## HTML
* 减少大小
* CSS在JS之前
* 尽量不要/少用iframe
* 预加载(prefetch,dns-prefetch,prerender)

## CSS
* 减少大小: postcss中的cssnano插件可以最小化文件，但涉及修改名称，可能存在意外。
* 合并请求: http1有效，http2未必
* 预加载:  ```<link rel="preload" href="style.css" as="style">```
* CSS Critical: 结合Non-Blocking,将重要CSS内联在HTML文件head内,实现内容优先渲染。
* Analyse stylesheets complexity: 从性能上考虑让浏览器更高效的解析 [css stats] 可使用工具如(https://cssstats.com/)

## Fonts
* 推荐使用WOFF2: W3C推广使用，可以使用woff兜底，本身经过压缩所以体积小
* 预加载: ```<link rel="preconnect" href="" crossorigin>```

## Images
* 使用CSS3 effects代替小图片
* 使用SVG
* 选择正确的图片格式
* 在知道图片大小的情况下设置好尺寸
* 懒加载: 可参考[vanilla-lazyload](https://github.com/verlok/vanilla-lazyload)
* Responsive images: srcset属性可以根据像素比设置不同尺寸图片,sizes属性设置自适应，picture标签能力,可参考[Responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)

## JavaScript
* 减少体积: 压缩(去除comment，修改变量，去除空格等)
* 非堵塞加载: async & defer
* 检查依赖包,可以选择更小的包: 例如使用[webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)打包分析工具
* JavaScript Profiling: 利用Chrome Developer Tool
* Service Workers

## Server
* 使用https: http2.0需要https支持
* Page weight < 1500 KB (ideally < 500 KB)
* Page load times < 3 seconds
* Time To First Byte < 1.3 seconds
* Cookie size: 大小低于4096 bytes， 同域名下数量低于20个
* 减少http请求数量
* CDN
* 资源请求保证同protocol
* 避免请求到不可访问的文件: 设置请求超时
* 使用cache-control来控制浏览器缓存
* 网络请求可以使用GZIP压缩

## React
* [Optimizing Performance](https://reactjs.org/docs/optimizing-performance.html)