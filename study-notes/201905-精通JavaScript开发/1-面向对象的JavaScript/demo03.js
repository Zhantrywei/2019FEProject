function Accommodation() {
    this.floors = 0;
    this.rooms = 0;
    this.sharedEntrance = false;
    this.isLocked = false;
    this.lock = function() {
        this.isLocked = true;
    };
    this.unlock = function() {
        this.isLocked = false;
    };
}

var house = new Accommodation();
var apartment = new Accommodation();

console.log("TCL: house.floors", house.floors);
house.floors = 2;
apartment.lock();


// 在类中Accommodation里面this创建的对象和方法会赋值到对应创建的对象实例中，这种主要用于创建每个类的固有属性，同时又是每个对象实例的私有属性和方法；
// 如果要在类中公用，则使用prototype
