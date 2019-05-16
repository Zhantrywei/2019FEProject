function Accommodation() {}
Accommodation.prototype = {
    floors: 0,
    rooms: 0,
    sharedEntrance: false,
    lock: function() {},
    unlock: function() {}
};
// Accommodation.prototype.floors = 0;
// Accommodation.prototype.rooms = 0;
// Accommodation.prototype.sharedEntrance = false;
// Accommodation.prototype.lock = function() {};
// Accommodation.prototype.unlock = function() {};

var house = new Accommodation();
var apartment = new Accommodation();

console.log("TCL: house.constructor === Accommodation", house.constructor === Accommodation)
console.log("TCL: apartment.constructor === Accommodation", apartment.constructor === Accommodation)
console.log("TCL: house instanceof Accommodation", house instanceof Accommodation)
console.log("TCL: apartment instanceof Accommodation", apartment instanceof Accommodation)

// var apartmentTest = new house.constructor();
// apartmentTest instanceof Accommodation // true

console.log("TCL: house.floors", house.floors);
console.log("TCL: house.sharedEntrance", apartment.sharedEntrance);

house.floors = 2;
apartment.sharedEntrance = true;
house.unlock();
apartment.lock();

// 为已存在的对象实例动态添加属性和方法
Accommodation.prototype.alarm = function(){};
house.alarm();
