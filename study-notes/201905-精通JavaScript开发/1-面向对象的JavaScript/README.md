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