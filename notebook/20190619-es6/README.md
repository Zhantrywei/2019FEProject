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
   1. Map
      1. Maps & Objects 区别
         1. Object的key为字符串或者Symbol，但Map可以是任意值
         2. Object的键值是无序的，Map是有序的（FIFO：先进先出原则，队列）
         3. Map能从size知道个数，Object不行，只能手算
         4. Object 都有自己的原型，原型链上的键名有可能和你自己在对象上的设置的键名产生冲突
      2. Map.prototype.[func] -> get、set、forEach
   2. Set
      1. Set 对象允许你存储任何类型的唯一值，无论是原始值或者是对象引用。
      2. +0 和 -0、undefined、NaN
      3. 数组去重、交集并集差集
7. ES6 - Reflect & Proxy
   1. Reflect
      1. 
   2. Proxy
8. ES6 - 字符串
   1. 子串的识别: includes(),startsWidth(),endsWith(),都是返回布尔值
   2. 字符串重复: repeat(),如果是负数和Infinity会报错
   3. 字符串补全: padStart(int[,str]),padEnd(int[,str]),常用于补全位数
   4. 模板字符串: \`${变量名}\`
9. ES6 - 数值
   1. 二进制: 0b | 0B
   2. 八进制: 0o | 0O
   3. 常量: 
      1. Number.EPSILON表示1与大于1的最小浮点数之间的差
           ```js
               // 测试数值是否在误差范围内
               console.log("0.1 + 0.2 === 0.3:", 0.1 + 0.2 === 0.3);  // false
               console.log("Number.EPSILON: 0.1 + 0.2 === 0.3:", (Math.abs(0.1 - 0.3 + 0.2) < Number.EPSILON));  // true
               // Number.EPSILON属性特性
               // writable: false
               // enumerable: false
               // configurable: false
           ```
      2. 最大/最小安全数
         1. 安全整数范围的上限,2的53次方-1: Number.MAX_SAFE_INTEGER
         2. 安全整数范围的下限,2的53次方-1的负数: Number.MIN_SAFE_INTEGER
         3. 属性特性:
            1. writable: false
            2. enumerable: false
            3. configurable: false
   4. Number.isFinite(): 检查一个数值是否为有限的(finite),即不是Infinity,非数值都返回false,还有NaN,Infinity,-Infinity
   5. Number.isNaN(): 检查一个值是否为NaN,全局isNaN会进行非数值向数值转换,而Number.isNaN()不会,非NaN都会返回false
   6. 全局移植到Number对象的方法
      1. parseInt => Number.parseInt
      2. parseFloat => Number.parseFloat
   7. Number对象新方法
      1. Number.isInteger: 1.0结果和1一样为true
         1. 精度超过53个二进制位时,由于第54位及后面的位被丢弃,会产生误判
            ```js
               Number.isInteger(1.0000000000000001) // true
            ```
         2. 一个数值的绝对值小于 Number.MIN_VALUE（5E-324），即小于 JavaScript 能够分辨的最小值，会被自动转为 0，也会产生误判
            ```js
               Number.isInteger(5E-324); // false
               Number.isInteger(5E-325); // true
            ```
      2. Number.isSafeInteger(): 用于判断数值是否在安全范围内
            ```js
               Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1); // false
               Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1); // false
            ```
   8. Math对象的扩展
      1. Math.cbrt(): 立方根
      2. Math.imul(): 两个数以 32 位带符号整数形式相乘的结果，返回的也是一个 32 位的带符号整数。
         ```js
            // 大多数情况下，结果与 a * b 相同 
            Math.imul(1, 2);   // 2
             
            // 用于正确返回大数乘法结果中的低位数值
            Math.imul(0x7fffffff, 0x7fffffff); // 1
         ```
      3. Math.hypot(): 用于计算所有参数的平方和的平方根
      4. Math.clz32(): 用于返回数字的32位无符号整数形式的前导0的个数,参数为小数只考虑整数部分,空值或非数值,转化为数值再进行计算
      5. Math.trunc(): 用于返回数字的整数部分,能判断符号,转换为数值在处理,空值和其他为NaN
      6. Math.fround(): 用于获取数字的32位单精度浮点数形式。
      7. Math.sign(): 判断数字的符号,1正,-1负,0|-0
      8. Math.expm1(): 用于计算 e 的 x 次方减 1 的结果，即 Math.exp(x) - 1
      9. Math.log1p(x): 用于计算1 + x 的自然对数，即 Math.log(1 + x) 
      10. Math.log10(x): 用于计算以 10 为底的 x 的对数
      11. Math.log2(x): 用于计算 2 为底的 x 的对数
      12. 双曲函数
          1. Math.sinh(x): 用于计算双曲正弦
          2. Math.cosh(x): 用于计算双曲余弦
          3. Math.tanh(x): 用于计算双曲正切
          4. Math.asinh(x): 用于计算反双曲正弦
          5. Math.acosh(x): 用于计算反双曲余弦
          6. Math.atanh(x): 用于计算反双曲正切
      13. 指数运算符
          ```js
              1 ** 2; // 1
              // 右结合，从右至左计算
              2 ** 2 ** 3; // 256
              // **=
              let exam = 2;
              exam ** = 2; // 4
          ```
10. ES6 - 对象
    1. 简写
    2. Generator函数前面加*
    3. 属性名表达式[]
    4. 对象拓展运算符
    5. 新方法:
        1. Object.assign(target,source_1,...): 用于将源对象的所有可枚举属性复制到目标对象中 - 浅拷贝
        2. Object.is(value1,value2): 用于比较两个值是否严格相等, 与===基本类似
11. ES6 - 数组
    1. 创建: 
       1. Array.of()
       2. Array.from(arrayLike[, mapFn[, thisArg]])将类数组对象或可迭代对象转化为数组
          1. arrayLike: 想要转换的类数组对象或可迭代对象
          2. mapFn: 可选，map 函数，用于对每个元素进行处理，放入数组的是处理后的元素
          3. thisArg: 可选，用于指定 map 函数执行时的 this 对象
          4. 类数组对象: 一个类数组对象必须含有 length 属性，且元素属性名必须是数值或者可转换为数值的字符
          5. 转换可迭代对象
             1. 转换map
             2. 转换set
             3. 转换字符串
    2. 查找
       1. find(): 查找数组中符合条件的元素,若有多个符合条件的元素，则返回第一个元素,可以传回调函数
       2. findIndex(): 查找数组中符合条件的元素索引，若有多个符合条件的元素，则返回第一个元素索引,可以传回调函数
    3. 填充
       1. fill(填充值, 起始索引, 结束索引): 将一定范围索引的数组元素内容填充为单个指定的值
       2. copyWithin(修改起始索引, 用来覆盖数据的起始索引, 被用来覆盖的数据的结束索引): 将一定范围索引的数组元素修改为此数组另一指定范围索引的元素
    4. 遍历
       1. entries(): 遍历键值对
       2. keys(): 遍历键名
       3. values(): 遍历键值
    5. 包含
       1. includes(包含的指定值, 可选搜索的起始索引): 数组是否包含指定值
    6. 嵌套数组转一维数组
       1. flat()
       2. flatmap(遍历函数(当前元素,当前索引,原数组), 指定遍历函数中的this指向): 先对数组中每个元素进行了的处理，再对数组执行 flat() 方法
    7. 数组缓冲区,内存中的一段地址,定型数组的基础, 只可修改其中的数据, 不可修改大小
       1. 创建数组缓冲区
          ```js
						 let buffer = new ArrayBuffer(10);
						 buffer.byteLength // 10
						 let buffer1 = buffer.slice(1,3);
						 console.log(buffer1.byteLength);	// 2
          ```
       2. 视图: 用来操作内存的接口,可以操作数组缓冲区或缓冲区字节的子集,并按照其中一种数值数据类型来读取和写入数据
          1. DataView 类型是一种通用的数组缓冲区视图,其支持所有8种数值型数据类型
             ```js
                // 默认 DataView 可操作数组缓冲区全部内容
                let buffer = new ArrayBuffer(10);
                    dataView = new DataView(buffer); 
                dataView.setInt8(0,1);
                console.log(dataView.getInt8(0)); // 1
                 
                // 通过设定偏移量(参数2)与长度(参数3)指定 DataView 可操作的字节范围
                let buffer1 = new ArrayBuffer(10);
                    dataView1 = new DataView(buffer1, 0, 3);
                dataView1.setInt8(5,1); // RangeError
             ```
    8. 定型数组: 数组缓冲区的特定类型的视图,可以强制使用特定的数据类型，而不是使用通用的 DataView 对象来操作数组缓冲区。
       1. 创建
          ```js
             let buffer = new ArrayBuffer(10),
                 view = new Int8Array(buffer);
             console.log(view.byteLength); // 10

             let view32 = new Int32Array(10);
             console.log(view32.byteLength); // 40
             console.log(view32.length);     // 10
              
             // 不传参则默认长度为0
             // 在这种情况下数组缓冲区分配不到空间，创建的定型数组不能用来保存数据
             let view1 = new Int32Array();
             console.log(view1.byteLength); // 0
             console.log(view1.length);     // 0
              
             // 可接受参数包括定型数组、可迭代对象、数组、类数组对象
             let arr = Array.from({
               0: '1',
               1: '2',
               2: 3,
               length: 3
             });
             let view2 = new Int16Array([1, 2]),
                 view3 = new Int32Array(view2),
                 view4 = new Int16Array(new Set([1, 2, 3])),
                 view5 = new Int16Array([1, 2, 3]),
                 view6 = new Int16Array(arr);
             console.log(view2 .buffer === view3.buffer); // false
             console.log(view4.byteLength); // 6
             console.log(view5.byteLength); // 6
             console.log(view6.byteLength); // 6
          ```
       2. 注意: length不可写, 开始用entries(),keys(),values()进行迭代
		9. 扩展运算符...