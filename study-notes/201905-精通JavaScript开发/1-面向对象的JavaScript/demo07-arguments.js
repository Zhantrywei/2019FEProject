var add = function() {
    var total = 0;
    // for (var i = 0; i < arguments.length; i++) {
    //     total += arguments[i];
    // }
    console.log("typeof arguments: ", typeof arguments);
    console.log("arguments: ", arguments);
    return total;
};
console.log(add(1, 1));
console.log(add(1, 2, 3));
console.log(add(1));
