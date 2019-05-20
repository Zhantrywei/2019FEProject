function Accommodation() {
    this.isAlarmed = false;
}

var AlarmSystem = {
    arm: function(message) {
        this.isAlarmed = true;
        console.log("TCL: arm -> ", message);
    },
    disarm: function(message) {
        this.isAlarmed = false;
        console.log("TCL: disarm -> ", message);
    }
};

var myHouse = new Accommodation();
AlarmSystem.arm.call(myHouse, "Alarm activated");
console.log("TCL: myHouse.isAlarmed", myHouse.isAlarmed);
AlarmSystem.arm.apply(myHouse, ["Alarm deactivated"]);
console.log("TCL: myHouse.isAlarmed", myHouse.isAlarmed);
