# [菜鸟教程 - ES6](https://www.runoob.com/w3cnote/es6-tutorial.html)

1. ES6概述
    1. ES6，ECMAScript6.0，201506发版
    2. 简明教程：
       1. let、const和block作用域
          1. let声明的变量不具备变量提升（hoisting）特性
          2. let和const声明只在最靠近的一个块中有效
          3. 使用const声明最好用全大写+_风格
          4. const声明即赋值
       2. 箭头函数（Arrow Functions）
          1. 函数中this总是绑定指向对象本身
       3. 函数参数默认值
       4. Spread / Rest 操作符 ...
       5. 对象词法拓展
       6. 二进制和八进制字面量：数字前加 0o | 0O | 0b | 0B
       7. 对象和数组解构：解构可以避免在对象赋值时产生中间变量
       8. 对象超类：super
       9. 模板语法和分隔符：${val}、`
       10. for...of VS for...in：
           1.  for...of用于遍历一个迭代器，如数组
           2.  for...in用来遍历对象中的属性
       11. Map和WeakMap
           1.  每个对象都可以看作是一个Map，在Map中，任何类型都可以作为对象的key
           2.  WeakMap是Map的子集，所有key都是弱引用，使用WeakMap不用考虑垃圾回收问题，不用担心内存泄漏问题，所有key必须是对象
               1.  delete(key)
               2.  has(key)
               3.  get(key)
               4.  set(key,val)
       12. Set和WeakSet
           1.  Set对象是一组不重复的值，重复的值将会被忽略，值类型可以是原始类型和引用类型
           2.  WeakSet对象可以让你在一个集合中保存对象的弱引用，key值为对象，且只能出现一次
       13. 类class：不是新的对象继承模式，只是原型链语法糖表现形式
           1.  static：修饰的只有Class能调用，实例时不能调用的
           2.  extends：子类继承父类，子类的constructor中需要调用super()，子类方法调用父类方法，如super.parentMethodName()
           3.  类的声明不会提升，如果要使用某个Class，必须使用之前定义它，否则会抛出ReferenceError
           4.  类中定义函数不需要使用function
       14. Symbol：新数据类型，值时唯一的不变的。目的时生成一个唯一的标识符
           1.  创建不能用new：直接用 var sym = Symbol("some optional description");
           2.  typeof sym === "symbol"
           3.  被用作一个对象的属性时，这个属性是不可枚举的
           4.  获取对象symbol属性：Object.getOwnPropertySymbols(o)
       15. 迭代器（Iterators）：
           1.  迭代器允许每次访问数据集合的一个元素，当指针指向数据集合最后一个元素是，迭代器便会退出。它提供了 next() 函数来遍历一个序列，这个方法返回一个包含 done 和 value 属性的对象
           2.  ES6 中可以通过 Symbol.iterator 给对象设置默认的遍历器，无论什么时候对象需要被遍历，执行它的 @@iterator 方法便可以返回一个用于获取值的迭代器。
       16. Generators：允许一个函数返回的可遍历对象生成多个值。*语法和yield
       17. Promises：原生支持
           1.  一个Promise是一个等待被异步执行的对象，当它执行完成时，其状态会变成resolved或者rejected。
           2.  每一个Promise都有一个.then方法，接受两个参数，第一个是处理resolved状态的回调，第二个是处理rejected状态的对调