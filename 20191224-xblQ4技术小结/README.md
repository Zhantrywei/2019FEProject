# 20191224 - xblQ4 技术小结

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=3 orderedList=false} -->

<!-- code_chunk_output -->

-   [Vue 源码](#vue-源码)
-   [前端工程化](#前端工程化)

<!-- /code_chunk_output -->

## Vue 源码

1. 双向数据绑定原理：vue.js 是采用数据劫持结合发布者-订阅者模式的方式，通过 Object.defineProperty()来劫持各个属性的 setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。
    1. 需要 observe 的数据对象进行递归遍历，包括子属性对象的属性，都加上 setter 和 getter 这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化
    2. compile 解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图
    3. Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁，主要做的事情是：
        1. 在自身实例化时往属性订阅器(dep)里面添加自己
        2. 自身必须有一个 update()方法
        3. 待属性变动 dep.notice()通知时，能调用自身的 update()方法，并触发 Compile 中绑定的回调，则功成身退。
    4. MVVM 作为数据绑定的入口，整合 Observer、Compile 和 Watcher 三者，通过 Observer 来监听自己的 model 数据变化，通过 Compile 来解析编译模板指令，最终利用 Watcher 搭起 Observer 和 Compile 之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数据 model 变更的双向绑定效果。
2. vue 生命周期的理解：总共分为 8 个阶段创建前/后，载入前/后，更新前/后，销毁前/后
    1. 创建前/后： 在 beforeCreated 阶段，vue 实例的挂载元素$el和数据对象data都为undefined，还未初始化。在created阶段，vue实例的数据对象data有了，$el 还没有。
    2. 载入前/后：在 beforeMount 阶段，vue 实例的\$el 和 data 都初始化了，但还是挂载之前为虚拟的 dom 节点，data.message 还未替换。在 mounted 阶段，vue 实例挂载完成，data.message 成功渲染。
    3. 更新前/后：当 data 变化时，会触发 beforeUpdate 和 updated 方法。
    4. 销毁前/后：在执行 destroy 方法后，对 data 的改变不会再触发周期函数，说明此时 vue 实例已经解除了事件监听以及和 dom 的绑定，但是 dom 结构依然存在
    5. 应用场景：生命周期钩子的一些使用方法：
        1. beforecreate : 可以在这加个 loading 事件，在加载实例时触发
        2. created : 初始化完成时的事件写在这里，如在这结束 loading 事件，异步请求也适宜在这里调用
        3. mounted : 挂载元素，获取到 DOM 节点
        4. updated : 如果对数据统一处理，在这里写上相应函数
        5. beforeDestroy : 可以做一个确认停止事件的确认框
        6. nextTick : 更新数据后立即操作 dom

## 前端工程化

1. 前端工程化是使用软件工程的技术和方法来进行前端的开发流程、技术、工具、经验等规范化、标准化，其主要目的为了提高效率和降低成本，即提高开发过程中的开发效率，减少不必要的重复工作时间，而前端工程本质上是软件工程的一种，因此我们应该从软件工程的角度来研究前端工程。
2. 前端工程化就是为了让前端开发能够“自成体系”，个人认为主要应该从模块化、组件化、规范化、自动化四个方面思考。
    1. 模块化：简单来说，模块化就是将一个大文件拆分成相互依赖的小文件，再进行统一的拼装和加载。
        1. JS 的模块化
        2. CSS 的模块化
        3. 资源的模块化
    2. 组件化：模块化只是在文件层面上，对代码或资源的拆分；而组件化是在设计层面上，对 UI（用户界面）的拆分。重要思想为分治思想。组件化实际上是一种按照模板(HTML)+样式(CSS)+逻辑(JS)三位一体的形式对面向对象的进一步抽象。所以我们除了封装组件本身，还要合理处理组件之间的关系，比如 （逻辑）继承、（样式）扩展、（模板）嵌套和包含等，这些关系都可以归为依赖。
    3. 规范化：规范化其实是工程化中很重要的一个部分，项目初期规范制定的好坏会直接影响到后期的开发质量。
        1. 目录结构的制定
        2. 编码规范：[凹凸实验室打造的前端代码规范](https://guide.aotu.io/docs/index.html)
            1. HTML 规范
            2. CSS 规范
            3. JS 规范
            4. 图片规范
            5. 命名规范
        3. 前后端接口规范
            1. 职责分离
                1. 后端：提供数据，处理业务逻辑
                2. 前端：接收数据，返回数据，处理渲染逻辑
            2. 规范原则
                1. 接口返回数据即显示，前端仅做渲染逻辑处理；
                2. 渲染逻辑禁止跨多个接口调用；
                3. 前端关注交互、渲染逻辑，尽量避免业务逻辑处理的出现；
                4. 请求响应传输数据格式：JSON，JSON 数据尽量简单轻量，避免多级 JSON 的出现；
            3. 响应格式
                1. 基本响应格式/列表响应格式，状态值处理规范
                2. 特殊内容，如 json 数据中是否用 Boolean/Number 标识，日期类型统一为以秒为时间戳
        4. 文档规范
        5. 组件管理
        6. git 分支管理
        7. commit 描述规范
        8. 视觉图标规范
        9. 等等
    4. 自动化：任何简单机械的重复劳动都应该让机器去完成。
        1. 图标合并
        2. 持续继承
        3. 自动化构建
        4. 自动化部署
        5. 自动化测试
