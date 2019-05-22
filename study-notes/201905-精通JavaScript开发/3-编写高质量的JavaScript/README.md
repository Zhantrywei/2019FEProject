# 2019-05-21 编写高质量的JavaScript

## 静态代码分析工具

### 1. JSLint
1. 安装与运行
    ```bash
        npm install jslint -g
        # or 
        yarn global add jslint
        jslint *.js
    ```
2. Yahoo的Douglas Crockford开发，个人的代码风格格式限制
3. [官网](http://www.jslint.com/)
4. [官方文档](http://www.jslint.com/help.html)

### 2. JSHint
1. 安装与运行
    ```bash
        npm install jshint -g
        # or
        yarn global add jshint
        jshint *.js
    ```
2. [官网](https://jshint.com/)
3. [官方文档](https://jshint.com/docs/)

### 3. ESLint
1. 安装与运行
    ```bash
        # 安装
        npm install -g eslint
        # or
        yarn global add eslint
        # 配置
        eslint --init
        # 运行
        eslint *.js
    ```
2. 配置文件Configuration
3. [官网](https://eslint.org/)
4. [配置](https://eslint.org/docs/user-guide/configuring)

### JSLint,JSHint,ESLint的区别
> [JSLint,JSHint,ESLint的区别](https://blog.csdn.net/gramdog/article/details/85214008)

## 单元测试工具

### 1. Jasmine
1. 安装运行
    ```bash
        # 安装
        npm install -g jasmine
        # or
        yarn global add jasmine

        # 实例
        jasmine init    # 生成spec/support/jasmine.json 配置文件
        jasmine examples # 生成lib/jasmine_examples/demo源文件和spec/helpers帮助文档以及对应的spec/jasmine_examples/demo-spec测试文件

        jasmine *.js
    ```
2. [官网](https://jasmine.github.io/index.html)
3. [官方文档](https://jasmine.github.io/setup/nodejs.html)

### 2. Mocha


### JavaScript 单元测试框架：Jasmine, Mocha, AVA, Tape 和 Jest 的比较
> [\[译\] JavaScript 单元测试框架：Jasmine, Mocha, AVA, Tape 和 Jest 的比较
](https://juejin.im/post/5acc721a6fb9a028b77b23c9)

## 处理运行时错误

### 1. JS原生错误
1. SyntaxError: 语法醋味
2. TypeError: 类型错误
3. RangeError: 范围错误
4. EvalError: eval错误
5. ReferenceError: 引用错误
6. URIError: URI错误

### 2. 善用try-catch、try-catch-finally
1.  使用try时可以不包括catch，如果没有catch必须有finally，会先finally再报error
2.  检测错误类型：SyntaxError、TypeError、RangeError、EvalError、ReferenceError、URIError
    ```js
        try{

        }catch(error){
            // error对象包含一个message属性
            if(error instanceof SyntaxError){

            }else if(error instanceof TypeError){
                
            }else if(error instanceof RangeError){
                
            }else if(error instanceof EvalError){
                
            }else if(error instanceof ReferenceError){
                
            }else if(error instanceof URIError){
                
            }
        }
    ```

## 打包工具
### 1. Grunt
### 2. Glup
### 3. Webpack