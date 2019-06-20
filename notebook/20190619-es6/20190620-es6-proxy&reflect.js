function demoProxy() {
    let target = {
        name: "Tom",
        age: 24
    };
    let handler = {
        get: function(target, key) {
            console.log("getting", key);
            return target[key];
        },
        set: function(target, key, value) {
            console.log("setting", key);
            target[key] = value;
        }
    };
    let proxy = new Proxy(target, handler);
    // console.log("TCL: demoProxy -> proxy", proxy);
    // console.log("TCL: demoProxy -> proxy.name", proxy.name);
    // console.log("TCL: demoProxy -> proxy.age = 25", (proxy.age = 25));

    let targetEpt = {};
    let proxyEpt = new Proxy(targetEpt, handler);
    // console.log("TCL: demoProxy -> proxyEpt.name", proxyEpt.name);
    // console.log(
    // "TCL: demoProxy -> proxyEpt.name = 'Tom'",
    // (proxyEpt.name = "Tom")
    // );
    // console.log("TCL: demoProxy -> proxyEpt.name", proxyEpt.name);
    // console.log("TCL: demoProxy -> targetEpt", targetEpt);

    let targetEmpty = {};
    let proxyEmpty = new Proxy(targetEmpty, {});
    // console.log("TCL: demoProxy -> targetEmpty", targetEmpty);
    proxyEmpty.name = "Tom";
    // console.log("TCL: demoProxy -> targetEmpty", targetEmpty);

    let exam = {
        name: "Tom",
        age: 24
    };
    let proxyExam = new Proxy(exam, {
        get(target, propKey, receiver) {
            // console.log("TCL: get -> receiver", receiver);
            console.log("Getting", propKey);
            return target[propKey];
        }
    });
    // console.log("TCL: demoProxy -> proxyExam.name", proxyExam.name);

    // get()方法可以继承
    let proxyDemoGet = new Proxy(
        {},
        {
            get(target, propKey, receiver) {
                // receiver:表示原始操作行为所在对象,一般指Proxy实例本身
                console.log("TCL: get -> propKey", propKey);
                // 实现私有属性读取保护
                if (propKey[0] === "_") {
                    throw new Error(
                        `Invalid attempt to get private "${propKey}"`
                    );
                }
                console.log("Getting", propKey);
                return target[propKey];
            }
        }
    );
    let obj = Object.create(proxyDemoGet);
    // console.log("TCL: demoProxy -> obj.name", obj.name);
    obj.name = "try";
    // console.log("TCL: demoProxy -> obj.name", obj.name);

    // 目标对象自身某个属性不可写且不可配置,set方法失效
    let validator = {
        set(obj, prop, value, receiver) {
            // receiver:表示原始操作行为所在对象,一般指Proxy实例本身
            if (prop === "age") {
                if (!Number.isInteger(value)) {
                    throw new TypeError("The age is not an integer");
                }
                if (value > 200) {
                    throw new RangeError("The age seems invalid");
                }
            }
            obj[prop] = value;
        }
    };
    let proxyDemoSet = new Proxy({}, validator);
    try {
        console.log(
            "TCL: demoProxy -> proxy.age = 300",
            (proxyDemoSet.age = 300)
        );
    } catch (error) {
        console.error(error);
    }
    try {
        console.log(
            "TCL: demoproxyDemoSet -> proxyDemoSet.age = 'oppps'",
            (proxyDemoSet.age = "oppps")
        );
    } catch (error) {
        console.error(error);
    }
    console.log("TCL: demoproxyDemoSet -> proxyDemoSet.age", proxyDemoSet.age);
    console.log(
        "TCL: demoproxyDemoSet -> proxyDemoSet.age  = 100",
        (proxyDemoSet.age = 100)
    );
    // 严格模式下,set代理没有返回true会报错
}
// demoProxy();

// apply(target, ctx, args)
// 用于拦截函数的调用、call 和 reply 操作。target 表示目标对象，ctx 表示目标对象上下文，args 表示目标对象的参数数组。
function demoProxyApply() {
    function sub(a, b) {
        return a - b;
    }
    let handler = {
        apply: function(target, ctx, args) {
            console.log("handle apply");
            return Reflect.apply(...arguments);
        }
    };
    let proxy = new Proxy(sub, handler);
    console.log("TCL: demoProxyApply -> proxy(2, 1)", proxy(2, 1));
}
// demoProxyApply();

// has(target, propKey)
// 用于拦截 HasProperty 操作，即在判断 target 对象是否存在 propKey 属性时，会被这个方法拦截。此方法不判断一个属性是对象自身的属性，还是继承的属性。
// 此方法不拦截for...in循环
function demoProxyHas() {
    let handler = {
        has: function(target, propKey) {
            console.log("handler has");
            return propKey in target;
        }
    };
    let exam = { name: "Tom" };
    let proxy = new Proxy(exam, handler);
    console.log("TCL: demoProxyHas -> 'name' in proxy", "name" in proxy);
    console.log("TCL: demoProxyHas -> 'test' in proxy", "test" in proxy);
}
// demoProxyHas();

// construct(target, args)
// 用于拦截 new 命令。返回值必须为对象。
function demoProxyConstruct(){
    let handler = {
        construct: function(target,args,newTarget)
    }
}