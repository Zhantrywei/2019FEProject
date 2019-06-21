function demoTemplateStr() {
    let string = `Hello \n world`;
    console.log("TCL: demoTemplateStr -> string", string);
    let string1 = `Hey,
    can you stop angry now?`;
    console.log("TCL: demoTemplateStr -> string1", string1);

    let name = "Mike";
    let age = 27;
    let info = `My Name is ${name},I am ${age + 1} years old next year.`;
    console.log("TCL: demoTemplateStr -> info", info);

    function f() {
        return "have fun!";
    }
    let string2 = `Game start,${f()}`;
    console.log("TCL: demoTemplateStr -> string2", string2);

    // 标签模板，是一个函数的调用，其中调用的参数是模板字符串
    console.log`Hello world!${name},aaa`;

    function test(stringArr, ...values) {
        let result = "";
        stringArr.forEach((stringItem, stringIndex) => {
            result += stringItem;
            if (values[stringIndex]) {
                result += values[stringIndex];
            }
        });
        return result;
    }
    // test`My Name is ${name},I am ${age+1} years old next year.`
    console.log(
        "TCL: demoTemplateStr -> test: ",
        test`My Name is ${name},I am ${age + 1} years old next year.`
    );
}
// demoTemplateStr();

function demoFilterHTML(stringArr, ...values) {
    let result = "";
    stringArr.forEach((stringItem, stringIndex) => {
        result += stringItem;
        if (values[stringIndex]) {
            result += String(values[stringIndex])
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;");
        }
    });
    return result;
}

function demoTestHTML() {
    let name = "<Amy&MIke>";
    console.log(
        "TCL: demoTestHTML -> demoFilterHTML",
        demoFilterHTML`<p>Hi,${name}.I would like send you some message.</p>`
    );
}
// demoTestHTML();

// 测试数值是否在误差范围内
console.log("0.1 + 0.2 === 0.3:", 0.1 + 0.2 === 0.3); // false
console.log(
    "Number.EPSILON: 0.1 + 0.2 === 0.3:",
    Math.abs(0.1 - 0.3 + 0.2) < Number.EPSILON
); // true
