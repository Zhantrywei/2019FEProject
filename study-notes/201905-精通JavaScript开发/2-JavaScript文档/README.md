# 2019-05-21 JavaScript文档

## 1. YUIDoc文档格式
> [YUIDoc](http://yui.github.io/yuidoc/)
> [YUIDoc - github](https://github.com/yui/yuidoc)
1. 初始化
    ```bash
        npm -g install yuidocjs
    ```
2. 标签与语法
   1. module: 模块
        ```js
            /**
             * Provides the base Widget class...
             *
             * @module widget
             */
        ```
   2. main: 说明主要模块
        ```js	
            /**
             * Provides more features for the widget module...
             *
             * @module widget
             * @submodule widget-foo
             * @main widget
             */
        ```
    3. class: 类
        ```js	
            /**
             * A utility that brokers HTTP requests...
             *
             * @class IO
             * @constructor
             */
            function IO (config) {}
        ```
    4. element
        ```js	
            /**
             * This is the foo element description...
             *
             * @element x-foo
             */
            function IO (config) {}
        ```
    5. method
        ```js	
            /**
             * Returns this model's attributes as...
             *
             * @method toJSON
             * @return {Object} Copy of ...
             */
            toJSON: function () {}
        ```
    6. event
        ```js	
            /**
             * Fired when an error occurs...
             *
             * @event error
             * @param {String} msg A description of...
             */
            var EVT_ERROR = 'error',
        ```
    7. property
        ```js	
            /**
             * Template for this view's container...
             *
             * @property containerTemplate
             * @type String
             * @default "<div/>"
             */
            containerTemplate: '<div/>',
        ```
    8. attribute
        ```js	
            /**
             * Indicates whether this Widget
             * has been rendered...
             *
             * @attribute rendered
             * @readOnly
             * @default false
             * @type boolean
             */
            ATTRS[RENDERED] = {
        ```
    9. [更多API](http://yui.github.io/yuidoc/syntax/index.html)
3. 生成
    ```bash
        yuidoc -n . # 当前目录下js进行生成API文档
    ```
## 2. Markdown文档
1. 标题用#(h1)、##(h2)以此类推到h6
2. 换行就是生成p标签
3. 无序列表用*
4. 有序列表用数字
5. 强调文本
   ```md
        *em*
        **strong**
        ***strong+em***
   ``` 
6. 删除线：
   ```md
        ~~各用两个~包围文字~~
   ```  
7. 显示代码用```
8. 引用用\>
9.  链接：\[标题\]\(url\)
10. 图片：\![图片名](url\)
11. 分割线：用三个***
12. 表格
    | column0 |   1   | column2 |
    | :------ | :---: | ------: |
    | aaa     |  bbb  |     ccc |
    | ddd     |  eee  |     fff |
    ```md
        | column0 |   1   | column2 |
        | :------ | :---: | ------: |
        | aaa     |  bbb  |     ccc |
        | ddd     |  eee  |     fff |
    ```