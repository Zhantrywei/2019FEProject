// demo1
const foo = (function() {
    var v = 0;
    return () => {
        return v++;
    };
})();

for (let i = 0; i < 10; i++) {
    foo();
}
console.log(foo()); // 10

// demo2
const foo2 = () => {
    var arr = [];
    var i;
    for (i = 0; i < 10; i++) {
        arr[i] = function() {
            console.log(i);
        };
    }
    return arr[0];
};
foo2()(); // 10

// demo3
var fn = null;
const foo3 = () => {
    var a = 2;
    function innerFoo() {
        console.log(a);
    }
    fn = innerFoo; // innerFoo 赋值给 fn导致变量对象a被保留下来
};
const bar = () => {
    fn();
};
foo3();
bar(); // 2

// demo4
var fn1 = null;
const foo4 = () => {
    var a = 2;
    function innerFoo() {
        console.log(c); // 这里报c没有定义
        console.log(a);
    }
    fn = innerFoo;
};

const bar1 = () => {
    var c = 100;
    fn();
};

foo4();
bar1();

// demo5: 利用闭包实现单例模式
function Person() {
    this.name = "lucas";
}

const getSingleInstance = (function() {
    var singleInstance;
    return function() {
        if (singleInstance) {
            return singleInstance;
        }
        return (singleInstance = new Person());
    };
})();

const instance1 = new getSingleInstance();
const instance2 = new getSingleInstance();
console.log(instance1 === instance2);   //true
