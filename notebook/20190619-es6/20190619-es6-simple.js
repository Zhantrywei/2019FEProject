function demoLet() {
    // 1. let、const和block作用域
    var a = 2;
    {
        let a = 3;
        console.log("TCL: a", a);
    }
    console.log("TCL: a", a);

    {
        const ARR = [5, 6];
        ARR.push(7);
        console.log("TCL: ARR", ARR);
        try {
            ARR = 10;
        } catch (error) {
            console.error(error);
            // TypeError: Assignment to constant variable. 类型错误：常量变量赋值
        }
    }
}

function demoArrow() {
    // 2. 箭头函数
    var getPrice = function() {
        return 4.55;
    };
    var getPrice = () => 4.55;

    let arr = ["apple", "banana", "orange"];
    let breakfast = arr.map(fruit => fruit + "s");
    console.log("TCL: breakfast", breakfast);

    function Person() {
        var _this = this;
        this.age = 0;
        // setTimeout(function growUp() {
        //     _this.age++;
        //     // this.age++;
        //     console.log("TCL: growUp -> this", this)
        //     console.log("TCL: growUp -> global", global)
        // }, 1000);
        setTimeout(() => {
            this.age++;
        }, 1000);
    }

    var person = new Person();
}

function demoFuncArgs() {
    // 3. 函数参数默认值
    let getFinalPrice = (price, tax = 0.7) => price + price * tax;
    getFinalPrice(500);
}

function demoSpreadRest() {
    // 4. Spread / Rest 操作符 ...
    // 4.1 迭代器中是Spread操作符 - 1变多就是把数组解开
    function foo(x, y, z) {
        console.log("TCL: foo -> x,y,z", x, y, z);
    }

    let arr2 = [1, 2, 3];
    foo(...arr2);

    // 4.2 函数传参时是一个Rest操作符 - 多变1就是组合成一个数组
    function foo1(...args) {
        console.log("TCL: args", args);
    }
    foo1(1, 2, 3, 4, 5);
}

function demoNewObjKey() {
    // 5. 对象词法拓展
    function getCar(make, model, value) {
        return {
            // 简写变量
            make, // 等同于 make: make
            model, // 等同于 model: model
            value, // 等同于 value: value

            // 属性可以使用表达式计算值
            ["make" + make]: true,

            // 忽略‘function’关键字简写对象函数
            depreciate() {
                this.value -= 2500;
            }
        };
    }

    let car = getCar("Barret", "Lee", 40000);
    console.log("TCL: car", car);
}

function demoInt28() {
    // 6. 二进制和八进制字面量：数字前加 0o | 0O | 0b | 0B
    let oValue = 0o10;
    console.log("TCL: oValue", oValue);

    let bValue = 0b10;
    console.log("TCL: bValue", bValue);
}

function demoDeconstruction() {
    // 7. 对象和数组解构：解构可以避免在对象赋值时产生中间变量
    function foo2() {
        return [1, 2, 3];
    }
    let arr3 = foo2();
    console.log("TCL: arr3", arr3);
    let [a1, b1, c1] = foo2();
    console.log("TCL: a,b,c", a1, b1, c1);

    function bar() {
        return {
            x: 4,
            y: 5,
            z: 6
        };
    }
    let { x: x, y: y, z: z } = bar();
    console.log("TCL: x, y, z", x, y, z);
}

function demoSuper() {
    // 8. 对象超类：super
    var parent = {
        foo() {
            console.log("Hello from the Parent");
        }
    };

    var child = {
        foo() {
            super.foo();
            console.log("Hello from the Child");
        }
    };

    Object.setPrototypeOf(child, parent);
    child.foo();
}

function demoTemplate() {
    // 9. 模板语法和分隔符：${val}、`
    let user = "Barret";
    console.log(`Hi ${user}!`);
}

function demoForOfAndIn() {
    // 10. for...of VS for...in：
    // 1.  for...of用于遍历一个迭代器，如数组
    let nicknames = ["di", "boo", "punkeye"];
    nicknames.size = 3;
    for (let nickname of nicknames) {
        console.log(nickname);
    }
    // 2.  for...in用来遍历对象中的属性
    for (let nickname in nicknames) {
        console.log(nickname);
    }
}

function demoMap() {
    // 11. Map和WeakMap：每个对象都可以看作是一个Map，在Map中，任何类型都可以作为对象的key
    var myMap = new Map();
    var keyString = "a string",
        keyObj = {},
        keyFunc = function() {};
    myMap.set(keyString, "value 与 'a string' 关联");
    myMap.set(keyObj, "value 与 keyObj 关联");
    myMap.set(keyFunc, "value 与 keyFunc 关联");
    console.log("TCL: myMap", myMap);
    console.log("TCL: myMap.size", myMap.size);
    console.log("TCL: myMap[keyString]", myMap[keyString]); // undefined
    console.log("TCL: myMap[keyObj]", myMap[keyObj]); // undefined
    console.log("TCL: myMap[keyFunc]", myMap[keyFunc]); // undefined
    console.log("TCL: myMap.get(keyString)", myMap.get(keyString));
    console.log("TCL: myMap.get(keyObj)", myMap.get(keyObj));
    console.log("TCL: myMap.get(keyFunc)", myMap.get(keyFunc));

    // WeakMap: 所有key必须是对象
    let w = new WeakMap();
    try {
        w.set("a", "b");
    } catch (error) {
        console.error(error); //  TypeError: Invalid value used as weak map key 类型错误：无效类型被用于weakmap的key值
    }

    var o1 = {},
        o2 = function() {},
        o3 = global;
    w.set(o1, 37);
    w.set(o2, "azerty");
    w.set(o3, undefined);

    console.log(w.get(o3));
    console.log(w.delete(o1));
    console.log(w.has(o1));
}

function demoSet() {
    /* 12. Set和WeakSet
    1.  Set对象是一组不重复的值，重复的值将会被忽略，值类型可以是原始类型和引用类型 */
    let mySet = new Set([1, 1, 2, 2, 3, 3]);
    console.log("TCL: mySet", mySet);
    console.log("TCL: mySet.size", mySet.size);
    console.log("TCL: mySet.has(1)", mySet.has(1));
    console.log("TCL: mySet.add('strings')", mySet.add("strings"));
    console.log("TCL: mySet.add({ a: 1, b: 2 })", mySet.add({ a: 1, b: 2 }));
    // forEach和for...of遍历Set对象
    mySet.forEach(item => {
        console.log("TCL: item", item);
    });
    for (let value of mySet) {
        console.log("TCL: value", value);
    }
    // Set delete() & clear()
    // WeakSet key必须为对象,只允许出现一次
    var ws = new WeakSet();
    var wsObj = {};
    var wsFoo = {};
    ws.add(global);
    ws.add(wsObj);
    console.log("TCL: ws.has(global)", ws.has(global));
    console.log("TCL: ws.has(wsFoo)", ws.has(wsFoo));
    ws.delete(global);
    console.log("TCL: ws.has(global)", ws.has(global));
}

function demoClass() {
    class Task {
        constructor() {
            console.log("task instantiated!");
        }
        showId() {
            console.log(23);
        }
        static loadAll() {
            console.log("Loading all tasks..");
        }
    }
    console.log("TCL: demoClass -> typeof Task", typeof Task);
    let task = new Task();
    task.showId();
    Task.loadAll();
    try {
        task.loadAll();
    } catch (error) {
        console.error("task.loadAll(): ", error);
    }

    class Car {
        constructor() {
            console.log("Creating a new car");
        }
    }

    class Porsche extends Car {
        constructor() {
            super();
            console.log("Creating Porsche");
        }
    }

    let c = new Porsche();
}
// demoClass();

function demoSymbol() {
    var sym = Symbol("some optional description"); //  这里的Symbol前面不能用new操作符
    console.log("TCL: demoSymbol -> typeof sym", typeof sym);

    // sym当作对象属性时是不可枚举的
    var o = {
        val: 10,
        [Symbol("random")]: "I'm a symbol"
    };
    console.log(
        "TCL: demoSymbol -> Object.getOwnPropertyNames(o)",
        Object.getOwnPropertyNames(o)
    );
    console.log(
        "TCL: demoSymbol -> Object.getOwnPropertySymbols(o)",
        Object.getOwnPropertySymbols(o)
    );
}
// demoSymbol();

function demoIterators() {
    var arr = [11, 12, 13];
    var itr = arr[Symbol.iterator]();
    console.log("TCL: demoIterators -> itr.next()", itr.next());
    console.log("TCL: demoIterators -> itr.next()", itr.next());
    console.log("TCL: demoIterators -> itr.next()", itr.next());
    console.log("TCL: demoIterators -> itr.next()", itr.next());
    // 通过[Symbol.iterator]()自定义一个对象的迭代器
}
// demoIterators();

function demoGenerators() {
    function* infiniteNumbers() {
        var n = 1;
        while (true) {
            yield n++;
        }
    }
    var numbers = infiniteNumbers(); // return an iterable obj
    console.log("TCL: demoGenerators -> numbers.next();", numbers.next());
    console.log("TCL: demoGenerators -> numbers.next();", numbers.next());
    console.log("TCL: demoGenerators -> numbers.next();", numbers.next());
    console.log("TCL: demoGenerators -> numbers.next();", numbers.next());
}
// demoGenerators();

function demoPromises() {
    var a = Math.random();
    var p = new Promise(function(resolve, reject) {
        if (a > 0.5) {
            resolve(a);
        } else {
            reject(a);
        }
    });
    p.then(
        val => console.log("TCL: demoPromises Resolved -> val", val),
        err => console.log("TCL: demoPromises Rejected -> err", err)
    );
}
demoPromises();
