# 2019-05-22 增强JavaScript性能

## 优化页面加载时间
1. script 标签放在\</body>前边
2. js文件开启GZip编码传输
3. 对js文件进行压缩，混淆，编译
4. 避免全局变量的使用(通过使用匿名执行函数)
5. 请求时延迟加载js（防止竞态条件的出现）
    ```js
        function loadScript (src, onLoad){
            var scriptTag = document.createElement("script");

            scriptTag.src = src;

            if(typeof onLoad === "function"){
                scriptTag.onload = onLoad;
                scriptTag.onreadystatechange = function(){
                    if(scriptTag.readyState === 4){
                        onLoad();
                    }
                }
            }

            document.body.appendChild(scirptTag);
        }
    ```

## 优化文档对象的操作
1. 对页面元素最小化访问
   1. 变量保存DOM元素引用
   2. 对父元素引用访问子元素
   3. 新建元素先实施DOM操作再添加进实体页面
2. 尽量利用已有元素(cloneNode复制已有元素)
    ```js
        var list1 = document.createElement("ul"),
            list2,
            listItem1 = document.createElement("li"),
            listItem2,
            listItem3;
        listItem1.className = "list-item";
        listItem1.innerHTML = "I am a list item";

        // cloneNode(true): 连同子元素一起复制,否则只复制元素本身
        listItem2 = listItem1.cloneNode(true);
        listItem3 = listItem1.cloneNode(true);

        list1.appendChild(listItem1);
        list1.appendChild(listItem2);
        list1.appendChild(listItem3);

        list2 = list1.cloneNode(true);

        document.body.appendChild(list1);
        document.body.appendChild(list2);
    ```
3. 离线DOM的利用
   1. 文档片段(document fragment),或称离线DOM(offline DOM),是一个轻量级的DOM,用于创建和操控小型的元素树结构以在稍后将其添加至当前实时页面
   ```js
        var offlineDOM = document.createDocumentFragment(),
            header = document.createElement("header"),
            nav=document.createElement("nav");
        offlineDOM.appendChild(header);
        offlineDOM.appendChild(nav);
        document.body.appendChild(offlineDOM);
   ```
4. 使用CSS而不是JavaScript操控页面样式
   1. 修改元素的style会影响布局导致重排(reflow)
        ```js
            var nav = document.getElementsByTagName("nav");
            nav[0].style.backgroundColor = "#fff";      //引发一次重排
            nav[0].style.color = "#fff";                //引发一次重排
            nav[0].style.opacity = 0.5;                 //引发一次重排
        ```
   2. 通过添加css类只进行一次重排
        ```css
            .selected {
                background-color: #fff;
                color: #fff;
                opacity: .5;
            }
        ```
        ```js
            var nav = document.getElementsByTagName("nav");
            nav[0].classList.add("selected");
        ```
   3. 如果添加css类无法满足需求,可以先进行一次display为none,然后设置style样式后才重新把display设置为block;因为display为none的页面流移除该元素的可视显示,引发一次重排,这是设置其他属性并不会引发页面的重排,只有重新设置display为非none,才会重新把元素返回页面中,进行又一次重排,所以这种方法是进行了两次重排
        ```js
            var nav = document.getElementsByTagName("nav");
            nav[0].style.display = 'none';              //引发一次重排
            nav[0].style.backgroundColor = "#fff";      //不会引发重排
            nav[0].style.color = "#fff";                //不会引发重排
            nav[0].style.opacity = 0.5;                 //不会引发重排
            nav[0].style.display = 'block';             //引发一次重排
        ```

## 提升DOM事件性能
1. 事件委托: 利用冒泡在多子元素的父元素上绑定对应事件处理函数,处理多个子元素的事件响应,有利于添加少量事件至页面元素,减少DOM元素的访问
2. 先捕获后冒泡,有监听则出现
3. 框架化处理频发事件: 例如mousemove,touchmove,scroll,resize等频发事件,需要把事件处理函数赋值给变量,然后设置定时器取这个变量进行事件处理
   ```js
        var scrollTopPosition = 0,
            scrollLeftPosition = 0,
            docElem = document.documentElement,
            body = document.body,
            header = document.getElementById("header");

        function onScroll() {
            console.log("TCL: onScroll -> docElem.scrollTop", docElem.scrollTop)
            console.log("TCL: onScroll -> window.pageYOffset", window.pageYOffset)
            console.log("TCL: onScroll -> body.scrollTop", body.scrollTop)
            scrollTopPosition = docElem.scrollTop || window.pageYOffset ||body.scrollTop;
            scrollLeftPosition = docElem.scrollLeft || window.pageXOffset ||body.scrollLeft;
        }

        function writeScrollPostion() {
            header.innerHTML =
                scrollTopPosition + "px, " + scrollLeftPosition + "px";
        }

        document.addEventListener("scroll", onScroll, false);

        window.setInterval(writeScrollPostion, 500);
   ```
4. 附加: 滚动问题
   1. overflow为可滚动时,如果高度/宽度超过容器,则会出现滚动条
   2. scroll相关的
      1. window
         1. window.pageXOffset|pageYOffset
         2. window.scroll(x,y): 废弃,改为scrollTo(x,y)
         3. window.scrollBy(x,y)
         4. window.scrollX|scrollY
      2. document
         1. document.doctype: <!docutype html> 都是小写
         2. document.documentElement: \<html>\</html> 
         3. document.title: \<title>\</title>
         4. document.head: \<head>\</head>
         5. document.body: \<body>\</body>
         6. document.scrollingElement: 标准模式返回根元素(document.documentElement); 怪异模式下返回body或者null
            > [浏览器的标准模式与怪异模式的设置与区分方法](https://www.cnblogs.com/front-end-develop/p/5850230.html)
         7. element.scroll(x,y): 废弃; 用scrollTo(x,y) 滚动到;
         8. element.scrollBy(x,y): 一次滚动多少;
         9. element.scroll

## 提升函数性能（减少所执行都代码行数，用对象保存运行过的函数返回值）
1. 同一函数相同参数执行多次优化为执行一次，使用对象直接量进行属性值存取，使函数有记忆功能
    ```js
        // 无记忆功能的
        function getFactorial(num){
            var result = 1,
                index = 1;
            for(;index <= num;index ++){
                result *= index;
            }
            return result;
        }
        getFactorial(3);
        getFactorial(3);
        getFactorial(3);
        // 这个行数执行3次

        // 有记忆功能的函数
        function getFactorial(num){
            var result = 1,
                index = 1;
            if(!getFactorial.storage){
                getFactorial.storage = {};
            }else if(getFactorial.storage[num]){
                return getFactorial.storage[num];
            }
            for(; index <= num; index++){
                result *= index;
            }

            getFactorial.storage[num] = result;
            return result;
        }
        getFactorial(3);
        getFactorial(3);
        getFactorial(3);
        // 执行一次，后边两次都是值直接返回
    ```
2. 建立一个功能函数来为任一函数添加保存处理结果值的功能，尽量从函数内部用作存储功能的属性中自动返回函数的结果以增强性能
    ```js
        function memoize(fn){
            return function(){
                var propertyName;
                fn.storage = fn.storage || {};

                propertyName = Array.prototype.join.call(arguments, "|");
                if(propertyName in fn.storage){
                    return fn.storage[propertyName];
                }else{
                    console.log("this: ",this);
                    fn.storage[propertyName] = fn.apply(this, arguments);
                    return fn.storage[propertyName];
                }
            }
        }
    ```
3. 应用一般性记忆功能至函数
    ```js
        function getFactorial(num){
            var result = 1,
                index = 1;
            for(;index <= num; index++){
                result *= index;
            }
            return result;
        }
        var getFactorialMemoized = memoize(getFactorial);
        console.log(getFactorialMemoized(50));
        console.log(getFactorialMemoized(50));
    ```
4. 对计算密集型函数非常有效，能显著提升性能

## 使用正则表达式实现更快速的字符串操作
1. 定义正则：建议使用直接量表达式，动态生成才需要用构造函数
    ```js
        var caps1 = new RegExp("[A-Z]","g");
        var caps2 = /[A-Z]/g;
    ```
2. 正则常用特殊字符
    1. \[exp]: 任一字符
    2. \[^exp]: 排除这一字符
    3. \[exp1-exp2]: 匹配至
    4. \(exp): 分组匹配，指定次序确切匹配
    5. \(exp1|exp2): 或者
    6. exp+: 1+
    7. exp*: 0+
    8. exp?: 0|1
    9. \s: 匹配空白字符（空格、回车、换行、换页）
    10. \S: 匹配除空白字符以为任一字符
    11. \d: 匹配0~9
    12. \D: 匹配除了数字以外
    13. \w: 匹配一个文字字符（汉字、数字、字母）
    14. \W: 匹配文字字符以外
3. 修饰符
    1. g: 全局匹配，不只返回第一个匹配项
    2. i: 忽略大小写
    3. m: 多行匹配
4. 字符串方法关于正则
    ```js
        var regEx = /[A-M]/g,
            string = "The Great Escape",
            match,
            search,
            replace;
        match = string.match(regEx); // 返回一个数组 ["G","E"]
        search = string.search(regEx);  // 返回第一个匹配的索引值 4
        replace = string.replace(regEx,"_");    // "The _reat _scape"
    ```
    1. replace方法详解
        1. $$: "Hello World".replace(/o/g,"$$"); // "Hell$ W$rld"
        2. $&: "Hello World".replace(/o/g, "v$&a");  // "Hellvoa Wvoarld" 主要用于在找到的字符串前后添加
        3. $\`: "Hello World".replace(/o/g,"$\`");  // "HellHell WHello Wrld" 用匹配到的前边部分代替匹配到的值
        4. $\': "Hello World".replace(/o/g,"$\'");  // "Hell World Wrldrld
        5. $1,$2,...: "Hello World".replace(/(o)(\s)/g,"$1$1$2")    // "Helloo World" 小括号分组时，实现提取出特定表达式所匹配的子字符串,先把匹配的拿出来，然后把对应的分组放进去
        6. replace(正则，函数): 每匹配一个就会执行一次函数，并传入所匹配的子字符串，会使用函数的返回值替换原子字符串
            ```js
                var count = 0;
                function replaceWithCount(value){
                    count++;
                    return value + count;
                }
                console.log("Hello World".replace(/o/g,replaceWithCount));  //Hello1 Wo2rld
                console.log("Hello World".replace(/o/g,replaceWithCount));  //Hello3 Wo4rld
            ```

## 更快速地使用数组
1. 用变量存储length,避免总是从数组中拿取
2. 对大量数据最快速的迭代方式是反向while循环(reserve-while)
   ```js
        //  反向循环比for快速的原因:
   ```