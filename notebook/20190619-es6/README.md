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
2. ES6环境搭建
   1. 浏览器端：Chrome58（2017.1）、Edge14（2016.8）、Firefox54（2017.3）、Safari10（2016.7）、Opera55（2018.8）、IE7~11基本不支持ES6
   2. Node.js环境对ES6支持度最高
   3. webpack：现代JS的静态模块打包器(module bundler)，构建一个依赖关系图(dependency graph)，将所有模块打包成一个或多个bundle
      1. 入口(entry)
      2. 输出(output)
      3. loader：webpack自身只能处理JS，loader能将所有类型的文件转换为webpack能够处理的模块
           ```js
               const config = {
                   entry: "./src/main.js",
                   output: {
                       filename: "bundle.js",
                       path: path.resolve(__dirname, 'dist')
                   },
                   module: {
                       rules: [
                           {
                               test: /\.js$/,
                               exclude: /node_modules/,
                               loader: "babel-loader",
                               options: [
                                   presets: ["env"]
                               ]
                           }
                       ]
                   }
               }
           ```
      4. 插件(plugins)：loader被用于转换某些类型的模块，而插件可以做更多，可以打包优化、压缩、定义环境变量等等
           ```js
                const HtmlWebpackPlugin = require('html-webpack-plugin');
                const webpack = require('webpack');
                const config = {
                    module: {
                        rules: [
                            {
                                test: /\.js$/,
                                exclude: /node_modules/,
                                loader: "babel-loader"
                            }
                        ]
                    },
                    plugins: [
                        new HtmlWebpackPlugin({templatae: "./src/index.html"})
                    ]
                }
           ```
   4. gulp：基于流的自动化构建工具，具有易于使用、构建快速、插件高质和易于学习的特点，常用于轻量级的工程中
      1. 安装
            ```bash
                npm install --global gulp
                npm install --save-dev gulp
            ```
      2. config
            ```js
                // gulpconfig.js
                const gulp = require('gulp');
                const uglify = require("gulp-uglify");
                gulp.task('default', function() {
                    gulp.src('./src/main.js')
                        .pipe(uglify())
                        .pipe(gulp.dest('./dist'));
                })
            ```
      3. 运行
            ```bash
                gulp
            ```
3. ES6 - let & const
   1. let：块级作用域定义、不能重复声明、for循环都能保留住变量、不存在变量提升
   2. const：声明只读变量，全大写，声明后不能改变，声明必须初始化、暂时性死区   
        ```js
            var PI = "a";
            if(true){
                console.log(PI);  // ReferenceError: PI is not defined
                const PI = "3.1415926";
            }
        ```
   3. const保证的不是变量的值不变，是保证变量指向内存地址所保存的数据不允许改动，所以使用 const 声明复杂类型对象时要慎重。
4. ES6 - 解构赋值：针对数组或者对象进行模式匹配，然后对其中的变量进行赋值
5. ES6 - Symbol：独一无二的值，最大的用法用来定义对象的唯一属性名
   1. Symbol 作为对象属性名时不能用.运算符，要用方括号。
   2. Symbol 值作为属性名时，该属性是公有属性不是私有属性，可以在类的外部访问。但是不会出现在 for...in 、 for...of 的循环中，也不会被 Object.keys() 、 Object.getOwnPropertyNames() 返回。如果要读取到一个对象的 Symbol 属性，可以通过 Object.getOwnPropertySymbols() 和 Reflect.ownKeys() 取到。
   3. Symbol.for()类似单例模式，避免创建冲突，会登记在全局环境
   4. Symbol.keyFor()返回一个已登记Symbol类型的key，用于检测该字段是否已用
   5. Symbol可以显式转为字符串，可以被强制转换为bool类型，没有包装类，JSON.stringify()不会转出，Object强转还是本身                 
        ```js
            var smy = Symbol();
            smy.description = "描述";
            console.log(smy.description);   // undefined
            console.log(String(smy));       // "Symbol()"
            console.log(smy.toString());       // "Symbol()"
            console.log(Boolean(smy));       // true
            console.log(!smy);       // false
            console.log(JSON.stringify({[Symbol("foo")]: "foo"}));  // "{}"
            console.log(Boolean(smy));       // true
            console.log(!smy);       // false
            console.log(Object(sym));   // 是一个Symbol类型的对象，有个description为Symbol(这里传入的值)
            console.log(Object(sym).description);   // 是一个Symbol类型的对象，有个description为Symbol(这里传入的值),undefined
            var smy1 = Symbol("smy1");
            console.log(Object(sym).description);   // "smy1"            
        ```
6. ES6 - Map & Set
   1. Maps & Objects 区别
      1. Object的key为字符串或者Symbol，但Map可以是任意值
      2. Object的键值是无序的，Map是有序的（FIFO：先进先出原则，队列）
      3. Map能从size知道个数，Object不行，只能手算
      4. Object 都有自己的原型，原型链上的键名有可能和你自己在对象上的设置的键名产生冲突

