# 2019-05-16 面向对象的JavaScript

## JS对象一些基础知识
1. 对象有属性和方法，属性是基本类型，方法是函数
2. 用function创建类，然后用var 对象实例 = new 类()
3. 对象实例的constructor(对象的构造器)来判断是否是哪个类构造的
4. 对象实例 instanceof 类，如果该对象实例由类创建则为true，否则为false
5. 通过类的原型添加属性和方法，这种是公用属性和方法
6. 变量作用域：全局都可用，函数内访外，外不能访内
7. 上下文和this关键字：全局上下文和函数上下文，对于对象的调用函数，this指向这个对象，如果是在全局调用，this指向window；注意函数的多层嵌套会导致this的变更，可以用一个变量保存需要用到的this
8. 调用函数：如果用对象调用函数，函数的this指向该对象；如果直接调用函数，函数中的this指向全局对象，浏览器为window，nodejs环境为global
9. 在类中Accommodation里面this创建的对象和方法会赋值到对应创建的对象实例中，这种主要用于创建每个类的固有属性，同时又是每个对象实例的私有属性和方法
10. 如果要在类中公用，则使用prototype
11. 构造函数：通过定义function 类(参数1,参数2){this.参数1 = 参数1 || 默认值}；但是当需要初始化的属性太多时，应该用一个对象来初始化
    ```js
        function Accommodation(defaults){
            defaults = defaults || {};
            this.floors = defaults.floors || 0;
            this.rooms = defaults.rooms || 0;
            this.sharedEntrance = defaults.sharedEntrance || false;
        }

        var house = new Accommodation({
            floors: 2,
            rooms: 7
        })
    ```
12. 链式调用，在方法里面返回this，一般在类的prototype.方法里面return this;
13. 继承
    1.  定义父类，初始化父类的构造属性和方法以及原型属性和方法
    2.  定义子类，初始化子类的构造属性和方法以及原型属性和方法
    3.  让子类的原型指向为父类的一个对象实例
    4.  同时把子类的原型的构造指向子类（因为3中会把子类的prototype.constructor指向父类）
    5.  instanceof 判断是否继承关系
    6.  封装：在子类中添加额外的属性和方法
    7.  多态：子类重写父类的方法，相同命名即可
    8.  继承这里涉及原型链的知识，建议阅读本目录下的《深入理解原型》的md笔记
    9.  在类里面通过this定义的属性，将在实例化的时候被实例化对象所获取
        ```js
            function Accommodation(){
                this.isAlarmed = false;
            }
            var myHouse = new Accommodation();
            console.log(myHouse.isAlarmed); //false;
            console.log(Accommodation.isAlarmed); //undefined;
        ```
    10. apply和call: 一般是一个函数.apply(对象,参数数组)或者一个函数.call(对象,参数1,参数2...)
        ```js
            function Accommodation() {
                this.isAlarmed = false;
            }

            var AlarmSystem = {
                arm: function(message) {
                    this.isAlarmed = true;
                    console.log("TCL: arm -> ", message);
                },
                disarm: function(message) {
                    this.isAlarmed = false;
                    console.log("TCL: disarm -> ", message);
                }
            };

            var myHouse = new Accommodation();
            AlarmSystem.arm.call(myHouse, "Alarm activated");
            console.log("TCL: myHouse.isAlarmed", myHouse.isAlarmed);
            AlarmSystem.arm.apply(myHouse, ["Alarm deactivated"]);
            console.log("TCL: myHouse.isAlarmed", myHouse.isAlarmed);
            
            // 一般apply和call可以用来继承父类的方法
        ```
    11. arguments伪数组，没有数组方法，需要使用数组方法，可以通过循环把它转换成一个数组
    12. 发现一个有趣的问题，关于函数和对象的相互初始化问题，直接贴代码
        ```js
            var a = {c: 1};
            a = function(){console.log(a.c)}
            var b = function(){console.log(b.c)}
            b.c = 1;
            console.log("a: ",a);    // a:  ƒ (){console.log(a.c)}
            console.log("a.c: ",a.c);    // a.c:  undefined
            console.log("b: ",b);    // b:  ƒ (){console.log(b.c)}
            console.log("b.c: ",b.c);   //   b.c:  1
        ```
    13. 封装一个Class用于创建类、继承和多态等，详见demo09-Class.js

## ES5的一些用法
1. JSON: JSON.parse(jsonString) & JSON.stringify(jsonObj)
2. "use strict": 函数第一行或者js文件第一行 - 不能用eval、with，同一作用域下同名变量，delete非对象的方法和属性等
3. 函数绑定: this的变化
    ```js
        var header = document.createElement("header"),
            mouseState = "up",
            eventHandlers = {
              onClick: function() {
                  console.log("this -> ",this);
                  this.onMouseDown();
                  this.onMouseUp();
              },
              onMouseDown: function() {
                  mouseState = "down";
              },
              onMouseUp: function() {
                  mouseState = "up";
              }
            };
      header.style =
          "position:fixed;width:100%;height: 200px;z-index:1000;background:lightblue;top:0;left:0";
      <!-- header.addEventListener("click", eventHandlers.onClick, false);   //这里的this指向这个DOM元素 -->
      header.addEventListener("click", eventHandlers.onClick.bind(eventHandlers), false);   //这里把eventHandlers 传入为this

      document.body.appendChild(header);
    ```
4. 数组方法
   1. Array.isArray(arr);
   2. Array.prototype.forEach((item, index, fullArr)=>{})
   3. Array.prototype.every((item, index, fullArr)=>{}): 如果每个都return true则这个函数结果返回true；如果一个return false，则停止，返回false
   4. Array.prototype.some((item, index, fullArr)=>{}): 如果有个return true则停止，这个函数结果返回true；否则都是return false，返回false
   5. Array.prototype.filter((item, index, fullArr)=>{}): 返回一个满足条件过滤的数组
5. 对象方法
   1. Object.isExtensible(obj): 对象是否可拓展，已有属性可以修改
   2. Object.preventExtensible(obj): 阻止对象可拓展，已有属性可以修改
   3. Object.freeze(obj): 已有属性冻结，同时对象不能扩展
   4. Object.isFrozen(obj): 对象是否已冻结，同时对象不能扩展
   5. Object.getOwnPropertyDescriptor(obj, attr): 返回一个包含configurable,enumerable,value,writable的对象，其中除了value其他默认为true
   6. Object.defineProperty(obj, attr, {value: value,writable: boolean,enumerable: boolean, configurable: boolean}): 定义属性
   7. Object.defineProperty(obj, {attr1: {value: value,writable: boolean,enumerable: boolean, configurable: boolean},attr2: {value: value,writable: boolean,enumerable: boolean, configurable: boolean}})
   8. Object.keys(obj): 得到keys数组
   9. Object.create(obj): 以obj为模型创建对象，这个其实是把新建的newObj的__proto__指向obj