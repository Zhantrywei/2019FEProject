// # JavaScript 常见错误Top10
// 1. Uncaught TypeError: Cannot read property - 一般没有初始化或者定义该属性,或者后台返回的格式和你预期的存在出入
// 2. TypeError: 'undefined' is not an Object - Safari读取属性或调用未定义对象上的方法时发生的错误
// 3. TypeError: null is not an object - 读取属性或调用空对象上的方法时发生的错误
//      1. 如果在加载元素之前尝试在 JavaScript 中使用元素。 因为 DOM API 对于空白的对象引用返回值为 null。任何执行和处理 DOM 元素的 JS 代码都应该在创建 DOM 元素之后执行。
// 4. (unknown): Script error - 当未捕获的 JavaScript 错误（通过 window.onerror 处理程序引发的错误，而不是捕获在 try-catch 中）被浏览器的跨域策略限制时，会产生这类的脚本错误
//      1. 后台服务器设置'Access-Control-Allow-Origin'头部
//      2. script中设置crossorigin = "anonymous"
// 5. TypeError: Object doesn't support property - 这是您在调用未定义的方法时发生在 IE 中的错误,IE 无法将当前名称空间内的方法绑定到 this 关键字,相当于 Chrome 中的 “TypeError：”undefined“isnotafunction” 错误。
// 6. TypeError: 'undefined' is not a function
// 7. Uncaught RangeError - 值传递给超出范围的函数
//      1. toExponential(digits) & toFixed(digits): 接受0-100
//      2. toPrecision(digits): 接受1-100
// 8. TypeError: Cannot read property 'length' - 这是因为读取未定义变量的长度属性而发生的错误。
// 9. Uncaught TypeError: Cannot set property - 当我们尝试访问一个未定义的变量时，它总是返回 undefined，我们不能获取或设置任何未定义的属性。 
// 10. ReferenceError: event is not defined - 当您尝试访问未定义的变量或超出当前作用域的变量时，会引发此错误。

function demoTypeError() {
    // var testArray = undefined;   // nodejs Error提示: TypeError: Cannot read property 'length' of undefined
    var testArray = null; // nodejs Error提示: TypeError: Cannot read property 'length' of null
    try {
        if (testArray.length === 0) {
            console.log("Array is empty");
        }
    } catch (error) {
        console.error(error);
    }
}
// demoTypeError();

function demoDealNullError() {
    function init() {
        var myButton = document.getElementById("myBtn");
        var myTextfield = document.getElementById("myText");
        myButton.onclick = function() {
            var userName = myTextfield.nodeValue;
        };
        document.addEventListener("readystatechange", function() {
            if (document.readyState === "complete") {
                init();
            }
        });
    }

    // 如果在初始化DOM之前调用,会出现null Error
    // <form>
    //     <input type="text" id="myTextfield" placeholder="Type your name" />
    //     <input type="button" id="myButton" value="Go" />
    // </form>;
}

function demoFuncError() {
    function clearBoard() {
        alert("Cleared");
    }

    document.addEventListener("click", function() {
        this.clearBoard();
        // what is “this” ?
    });
}
