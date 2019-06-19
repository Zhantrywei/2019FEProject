// let sy = Symbol("KK");
// console.log("TCL: sy", sy);
// console.log("TCL: typeof sy", typeof sy);

// let sy2 = Symbol("KK");
// console.log("TCL: sy == sy2", sy == sy2);

// 使用场景
// 1. 作为属性名:由于每一个 Symbol 的值都是不相等的，所以 Symbol 作为对象的属性名，可以保证属性不重名
function demoSymbol1() {
    let sy = Symbol("key1");

    let syObj = {};
    syObj[sy] = "KK";
    // or
    // let syObj = {
    //     [sy]: "KK"
    // }
    //
    // or
    // let syObj = {};
    // Object.defineProperty(syObj,sy,{value: "kk"});
    //
    console.log("TCL: syObj", syObj);
    console.log("TCL: syObj[sy]", syObj[sy]);
    console.log("TCL: syObj.sy", syObj.sy);
    // for...in、for...of、Object.keys()、Object.getOwnPropertyNames()不能读取
    // Object.getOwnPropertySymbols()、Reflect.ownKeys()
    console.log(
        "TCL: Object.getOwnPropertySymbols(syObj)",
        Object.getOwnPropertySymbols(syObj)
    );
    console.log("TCL: Reflect.ownKeys(syObj)", Reflect.ownKeys(syObj));
}
// demoSymbol1();

function demoSymbol2() {
    let yellow = Symbol("Yellow");
    console.log("TCL: yellow", yellow);
    let yellow1 = Symbol.for("Yellow");
    console.log("TCL: yellow1", yellow1);
    console.log("TCL: yellow === yellow1", yellow === yellow1);
    let yellow2 = Symbol.for("Yellow");
    console.log("TCL: yellow2", yellow2);
    console.log("TCL: yellow1 === yellow2", yellow1 === yellow2);
    let yellow3 = Symbol("Yellow");
    console.log("TCL: yellow3", yellow3);
    console.log("TCL: yellow3 === yellow", yellow3 === yellow);
    console.log("TCL: yellow3 === yellow1", yellow3 === yellow1);
    console.log("TCL: Symbol.keyFor(yellow)", Symbol.keyFor(yellow));
    console.log("TCL: Symbol.keyFor(yellow1)", Symbol.keyFor(yellow1));
    console.log("TCL: Symbol.keyFor(yellow2)", Symbol.keyFor(yellow2));
    console.log("TCL: Symbol.keyFor(yellow3)", Symbol.keyFor(yellow3));
}
// demoSymbol2();

function demoSymbol3() {
    const COLOR_RED = "red";
    const COLOR_YELLOW = "yellow";
    const COLOR_BLUE = "blue";
    const MY_BLUE = "blue";
    function getConstantName(color) {
        switch (color) {
            case COLOR_RED:
                return "COLOR_RED";
            case COLOR_YELLOW:
                return "COLOR_YELLOW";
            case COLOR_BLUE:
                return "COLOR_BLUE";
            case MY_BLUE:
                return "MY_BLUE";
            default:
                throw new Exception("Can't find this color");
        }
    }
    console.log("TCL: getConstantName(MY_BLUE);", getConstantName(MY_BLUE)); // COLOR_BLUE 这样无法保证唯一性，比如旧版本的开发人员封装了上边的那个类是函数，新版本另一位开发人员需要封装一个新的，这时如果像上边那个出现重复，可能就无法正确的返回，这时用Symbol是比较适合的
}
demoSymbol3();

function demoSymbol4() {
    const COLOR_RED = Symbol("red");
    const COLOR_YELLOW = Symbol("yellow");
    const COLOR_BLUE = Symbol("blue");
    const MY_BLUE = Symbol("blue");
    function getConstantName(color) {
        switch (color) {
            case COLOR_RED:
                return "COLOR_RED";
            case COLOR_YELLOW:
                return "COLOR_YELLOW";
            case COLOR_BLUE:
                return "COLOR_BLUE";
            case MY_BLUE:
                return "MY_BLUE";
            default:
                throw new Exception("Can't find this color");
        }
    }
    console.log("TCL: getConstantName(MY_BLUE)", getConstantName(MY_BLUE)); // MY_BLUE 这样无法保证唯一性，比如旧版本的开发人员封装了上边的那个类是函数，新版本另一位开发人员需要封装一个新的，这时如果像上边那个出现重复，可能就无法正确的返回，这时用Symbol是比较适合的
}
demoSymbol4();

function demoSymbol5() {
    // Symbol的目的就是作为对象属性的唯一标识符 https://www.zhangxinxu.com/wordpress/2018/04/known-es6-symbol-function/
    let info1 = {
        name: "婷婷",
        age: 24,
        job: "公司前台",
        descriiption: "平时喜欢做做瑜伽，人家有男朋友，你别指望了"
    };
    let info2 = {
        descriiption: "这小姑娘挺好的，挺热情的，嘿嘿嘿……"
    };
    let target = {};
    Object.assign(target, info1, info2);
    console.log("TCL: target", target);
}
demoSymbol5();

function demoSymbol6() {
    // Symbol的目的就是作为对象属性的唯一标识符 https://www.zhangxinxu.com/wordpress/2018/04/known-es6-symbol-function/
    let info1 = {
        name: "婷婷",
        age: 24,
        job: "公司前台",
        [Symbol("descriiption")]: "平时喜欢做做瑜伽，人家有男朋友，你别指望了"
    };
    let info2 = {
        [Symbol("descriiption")]: "这小姑娘挺好的，挺热情的，嘿嘿嘿……"
    };
    let target = {};
    Object.assign(target, info1, info2);
    console.log("TCL: target", target);
}
demoSymbol6();
