# 2019-前端开发学习记录

## 2019-01-02:script的属性async与defer

1. async&defer: 配合src时使用才有效,主要作用是不阻塞DOM的渲染
2. async: 是否异步渲染;哪个先加载完就执行哪个
3. defer: 用来通知浏览器该脚本将在文档完成解析后，触发 DOMContentLoaded 事件前执行;多个按照顺序执行,加载完一个执行一个

## 2019-05-17:git status出现中文乱码
   ```git
      git config --global core.quotepath false
   ```