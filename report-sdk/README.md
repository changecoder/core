# 数据上报

## 数据存储
* 初期直接使用MySQL作为存储
* 而后在并发压力测试时，使用Redis作为中间存储
* 最终方案使用Kafka + Redis实现一套分布式存储消费方案

### 数据格式
* uuid: 唯一标识符
* time: 时间
* event_type: 上报类型，如点击，曝光
* type: 上报类型，如错误监听上报，自定义异常上报, AJAX请求监听上报, 静态资源加载上报，页面关键指标上报
* page: 所在页面
* element_type: 客户端类型, Browser,Android,IOS
* user_agent: 客户端(浏览器)数据
* system: 所属系统及其版本
* network: 客户端网络状态
* version: 客户端(浏览器)版本
* ip: IP地址
* event_id: 整理相关数据后，将此条数据归为某一种行为, 此归类可动态设置，也可预存，由服务端处理。
* data: 前端自定义数据，用于后期跟踪处理