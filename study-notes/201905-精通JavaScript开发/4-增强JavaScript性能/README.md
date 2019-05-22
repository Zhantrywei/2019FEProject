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
4. 附加: 滚动问题
   1. overflow为可滚动时,如果高度/宽度超过容器,则会出现滚动条
   2. scroll相关的
      1. window
         1. window.pageXOffset|pageYOffset
         2. window.scroll(x,y): 废弃,改为scrollTo(x,y)
         3. window.scrollBy(x,y)
         4. window.scrollX|scrollY
      2. document
         1. document.scrollingElement
         2. document.documentElement.scroll()