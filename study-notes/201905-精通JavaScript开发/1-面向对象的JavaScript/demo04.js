// JavaScript中用原型继承，通过js对象的原型链实现的
// 通过原型继承创建一个子类

function Accommodation() {}

Accommodation.prototype.lock = function() {};
Accommodation.prototype.unlock = function() {};

// 创建子类
function House(defaults) {
    defaults = defaults || {};
    this.floors = 2;
    this.rooms = defaults.rooms || 7;
}

// 通过子类的prototype属性为Accommodation的对象实例完成继承
House.prototype = new Accommodation();
House.prototype.constructor = House; //如果没有值回来House.prototype.constructor => Accommodation

var myHouse = new House();

var myNeighborsHouse = new House({
    rooms: 8
});

// myHouse.rooms
console.log("TCL: myHouse.rooms", myHouse.rooms)
// myNeighborsHouse.rooms
console.log("TCL: myNeighborsHouse.rooms", myNeighborsHouse.rooms)

myHouse.lock();
myNeighborsHouse.unlock();

// myHouse.constructor === House
console.log("TCL: myHouse.constructor === House", myHouse.constructor === House)
// myHouse.constructor === Accommodation
console.log("TCL: myHouse.constructor === Accommodation", myHouse.constructor === Accommodation)

// myNeighborsHouse instanceof House
console.log("TCL: myNeighborsHouse instanceof House", myNeighborsHouse instanceof House)
// myNeighborsHouse instanceof Accommodation
console.log("TCL: myNeighborsHouse instanceof Accommodation", myNeighborsHouse instanceof Accommodation)
