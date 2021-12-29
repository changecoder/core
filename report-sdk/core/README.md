# navigator.sendBeacon
用于通过HTTP将少量数据异步传输到Web服务器, 主要用于满足统计和诊断代码的需要。

## Details
* 请求Method: POST
* 传输数据大小: Windows Chrome为65536字符
* 支持的数据格式: ArrayBufferView, Blob, DOMString, FormData
* 响应结果: 数据加入传输队列的结果
* 不受跨域影响
* IE的支持不算友好
* 
## 底层实现
基于Fetch keepalive属性，当设置为true时，保证不管发送请求的页面关闭与否，请求都会持续到结束。

## Polyfill
```
function sendBeacon(url, data) {
  var event = this.event && this.event.type;
  var sync = event === 'unload' || event === 'beforeunload';
  var xhr = 'XMLHttpRequest' in this ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
  xhr.open('POST', url, !sync);
  xhr.withCredentials = true;
  xhr.setRequestHeader('Accept', '*/*');

  if (isString(data)) {
    xhr.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
    xhr.responseType = 'text';
  } else if (isBlob(data) && data.type) {
    xhr.setRequestHeader('Content-Type', data.type);
  }

  try {
    xhr.send(data);
  } catch (error) {
    return false;
  }

  return true;
}
```

## 性能消耗低，不阻塞业务
