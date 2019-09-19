// 1. 全局this
function demo1() {
    function f1() {
        console.log(this);
    }
    function f2() {
        "use strict";
        console.log(this);
    }
    f1(); // window
    f2(); // undefined

    var foo = {
        bar: 10,
        fn: function() {
            console.log(this);
            console.log(this.bar);
        }
    };
    var fn1 = foo.fn;
    fn1(); // window.fn1() => window undefined
    foo.fn(); // foo 10
}
demo1();

/* 
    在执行函数时，如果函数中的 this 是被上一级的对象所调用，那么 this 指向的就是上一级的对象；否则指向全局环境。
*/

// 2. 上下文对象调用中的this
const student = {
    name: "Try",
    fn: function() {
        return this;
    }
};
console.log(student.fn() === student); // true

const person = {
    name: "Try",
    brother: {
        name: "Mike",
        fn: function() {
            return this.name;
        }
    }
};
console.log(persion.brother.fn()); // Mike

var o1 = {
    text: "o1",
    fn: function() {
        console.log(this);
        return this.text;
    }
};
var o2 = {
    text: "o2",
    fn: function() {
        return o1.fn();
    }
};
var o3 = {
    text: "o3",
    fn: function() {
        var fn = o1.fn;
        return fn(); // 裸奔调用
    }
};
console.log(o1.fn()); // o1
console.log(o2.fn()); // o1
console.log(o3.fn()); // undefined  这时this指向window

/* 
    this指向最后调用它的对象
*/

// 3. bind/call/apply 改变 this 指向
var foo = {
    name: "Try",
    logName: function() {
        // console.log(this.name);
        return this.name;
    }
};
var bar = {
    name: "Mike"
};
console.log(foo.logName.call(bar)); // Mike

/* 
    bind/call/apply 根据传入的对象改变this
    call/apply: apply参数是一个数组，立即调用
    bind: 绑定但不调用
 */

// 4. 构造函数和this
function Foo() {
    this.bar = "Try";
}
const instance = new Foo();
console.log(instance.bar);

/* 
    new 操作符调用构造函数，具体做法：
    1. 创建一个新的实例对象；
    2. 将构造函数的this指向这个新实例对象；
    3. 为这个实例对象添加属性、方法等；
    4. 最终返回新实例对象
    var obj = {};
    obj.__proto__ = Foo.prototype;
    Foo.call(obj);
 */

// 4.1. 构造函数中显式return
function Foo() {
    this.user = "Lucas";
    const o = {};
    return o;
}
const instance = new Foo();
console.log(instance.user);

function Foo1() {
    this.user = "Lucas";
    return 1;
}
const instance1 = new Foo1();
console.log(instance1.user);

/* 
    如果构造函数中显式返回一个值，且返回的是一个对象，那么 this 就指向这个返回的对象；如果返回的不是一个对象，那么 this 仍然指向实例。
 */

// 5. 箭头函数中的this指向

/* 
    箭头函数使用 this 不适用以上标准规则，而是根据外层（函数或者全局）上下文来决定。
 */

const foo = {
    fn: function() {
        setTimeout(function() {
            console.log(this); // this指向window
        });
    }
};
console.log(foo.fn());

const foo = {
    fn: function() {
        setTimeout(() => {
            console.log(this); // this指向foo
        });
    }
};
console.log(foo.fn());

// this优先级：
// 1. 显式绑定：call、apply、bind、new
// 2. 隐式绑定；根据调用关系确定的this

/* 
    new 绑定修改了 bind 绑定中的 this，因此 new 绑定的优先级比显式 bind 绑定更高
 */

function foo(a) {
    this.a = a;
}

const obj1 = {};

var bar = foo.bind(obj1);
bar(2);
console.log(obj1.a);
var baz = new bar(3);
console.log(baz.a);


const a = 123
const foo = () => a => {
    console.log(this.a)
}

const obj1 = {
    a: 2
}

const obj2 = {
    a: 3
}

var bar = foo.call(obj1)
console.log(bar.call(obj2)) // undefined
// const 声明的变量不会挂载到 window 全局对象当中