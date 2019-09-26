# this讲解

## this指向
> 谁调用它，this就指向谁。
> this的指向，是在调用函数时根据执行上下文所动态确定的。

## this规则
1. 在函数体中，简单调用该函数时（非显示/隐式绑定下），严格模式下this绑定到undefined，否则绑定到全局对象window/global；
2. 一般构造函数new调用，绑定到新创建的对象上；
3. 一般由call/apply/bind方法显式调用，绑定到指定参数的对象上；
4. 一般由上下文对象调用，绑定在该对象上；
5. 箭头函数中，根据外层上下文绑定的this决定this指向。

## this优先级
1. 箭头函数this绑定无法被修改，注意const/let定义变量和var定义的区别：只有var定义的会被绑定到window/global；
2. new 绑定修改了 bind 绑定中的 this，因此 new 绑定的优先级比显式 bind 绑定更高；
3. call、apply 的显式绑定一般来说优先级比隐式调用关系的this更高。

## 实现一个bind函数
1. bind 是ECMAScript 5.1 (ECMA-262)-2011定义的，在 JavaScript 1.8.5 中实现，ie9以上支持；apply 是ECMAScript 3rd Edition (ECMA-262)-1999定义的，在 JavaScript 1.3 中实现，ie5.5开始支持，ie9支持arguments数组参数；call 是ECMAScript 1st Edition (ECMA-262)定义，在 JavaScript 1.3 中实现，ie全线支持。
2. [MDN上的bind()的Polyfill](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
    ```js
         if (!Function.prototype.bind) {
           Function.prototype.bind = function(oThis) {
             if (typeof this !== 'function') {
               // closest thing possible to the ECMAScript 5
               // internal IsCallable function
               throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
             }

             var aArgs   = Array.prototype.slice.call(arguments, 1),
                 fToBind = this,
                 fNOP    = function() {},
                 fBound  = function() {
                   // this instanceof fBound === true时,说明返回的fBound被当做new的构造函数调用
                   return fToBind.apply(this instanceof fBound
                          ? this
                          : oThis,
                          // 获取调用时(fBound)的传参.bind 返回的函数入参往往是这么传递的
                          aArgs.concat(Array.prototype.slice.call(arguments)));
                 };

             // 维护原型关系
             if (this.prototype) {
               // 当执行Function.prototype.bind()时, this为Function.prototype 
               // this.prototype(即Function.prototype.prototype)为undefined
               fNOP.prototype = this.prototype; 
             }
             // 下行的代码使fBound.prototype是fNOP的实例,因此
             // 返回的fBound若作为new的构造函数,new生成的新对象作为this传入fBound,新对象的__proto__就是fNOP的实例
             fBound.prototype = new fNOP();

             return fBound;
           };
         }
    ```
3. gitchat学习demo
    ```js
        Function.prototype.bind = Function.prototype.bind || function(context){
            var me = this;
            // 绑定的时候又可能传参
            var args = Array.prototype.slice.call(arguments,1);
            return function bound(){
                // 调用时候也传参
                var innerArgs = Array.prototype.slice.call(arguments);
                var finalArgs = args.concat(innerArgs);
                return me.apply(context,finalArgs);
            }
        }
    ```