function demoMap() {
    var kvArray = [["key1", "value1"], ["key2", "value2"]];
    var myMap = new Map(kvArray);
    console.log("TCL: demoMap -> myMap", myMap);
    var outArray = Array.from(myMap); //  Array.from 将一个Map->Array
    console.log("TCL: demoMap -> outArray", outArray);

    var myMap1 = new Map(kvArray);
    console.log("TCL: demoMap -> myMap1", myMap1);
    var myMap2 = new Map(myMap1); //  clone myMap1 to myMap2
    console.log("TCL: demoMap -> myMap2", myMap2);
    console.log("TCL: demoMap -> myMap1 == myMap2", myMap1 == myMap2);
    console.log("TCL: demoMap -> myMap1 === myMap2", myMap1 === myMap2);

    var first = new Map([[1, "one"], [2, "two"], [3, "three"]]);
    var second = new Map([[1, "uno"], [2, "dos"]]);
    var merged = new Map([...first, ...second]);
    console.log("TCL: demoMap -> merged", merged);
}
// demoMap();

function demoSet() {
    let mySet = new Set();
    mySet.add(+0);
    mySet.add(null);
    mySet.add(undefined);
    mySet.add(1);
    mySet.add(NaN);
    mySet.add(null);
    mySet.add(5);
    mySet.add(undefined);
    mySet.add(5);
    mySet.add(-0);
    mySet.add(NaN);
    mySet.add("some text");
    console.log("TCL: demoSet -> mySet", mySet);
    var o = { a: 1, b: 2 };
    mySet.add(o);
    mySet.add({ a: 1, b: 2 });
    mySet.add({ a: 1, b: 2 });
    console.log("TCL: demoSet -> mySet", mySet);

    let mySet1 = new Set(["value1", "value2", "value3"]);
    var myArray = [...mySet1];
    console.log("TCL: demoSet -> myArray", myArray);
    var mySet2 = new Set("hello");
    console.log("TCL: demoSet -> mySet2", mySet2);

    // 数组去重
    var mySetArr = new Set([1, 2, 3, 4, 5, 2, 3, 4]);
    console.log("TCL: demoSet -> [...mySetArr]", [...mySetArr]);
    // 并集
    var a = new Set([1, 2, 3, 4, 5]);
    var b = new Set([4, 5, 7, 3, 9]);
    var union = new Set([...a, ...b]);
    console.log("TCL: demoSet -> union", union);
    // 交集
    var intersect = new Set([...a].filter(x => b.has(x)));
    console.log("TCL: demoSet -> intersect", intersect);
    // 差集
    var differenceAB  = new Set([...a].filter(x => !b.has(x)));
    console.log("TCL: demoSet -> differenceAB", differenceAB);
    var differenceBA  = new Set([...b].filter(x => !a.has(x)));
    console.log("TCL: demoSet -> differenceBA", differenceBA);
}
demoSet();
