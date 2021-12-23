# 图片AJAX方案

## CustomElementRegistry.define()
自定义内置元素
```
class AjaxImage extends HTMLImageElement {
    constructor(url) {
        super()
        
        setTimeout(() => {
            const abortController = new AbortController

            setTimeout(() => abortController.abort(), this.dataset.timeout)

            const res = await fetch(this.dataset.src, { signal: abortController.signal })

            const blob = await res.blob()

            this.src = URL.createObjectURL(blob)
        })
    }
}

customElements.define("ajax-img", AjaxImage, {extends: "img"})

<img is='ajax-img' data-timeout='1000' data-src=''>
```

## 跨域问题解决
