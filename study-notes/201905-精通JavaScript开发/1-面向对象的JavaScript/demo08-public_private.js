var Accommodation = (function() {
    // 立即执行函数，创建一个闭包环境来返回一个类，让这个类的内部变量得到保护
    function Accommodation() {}

    // 私有变量，私有属性
    var _isLocked = false,
        _isAlarmed = false,
        _alarmMessage = "Alarm activated!";

    // 私有函数，私有方法
    function _alarm() {
        _isAlarmed = true;
        console.log(_alarmMessage);
    }
    function _disableAlarm() {
        _isAlarmed = false;
    }

    Accommodation.prototype.lock = function() {
        _isLocked = true;
        _alarm();
    };

    Accommodation.prototype.unlock = function() {
        _isLocked = false;
        _disableAlarm();
    };

    Accommodation.prototype.getIsLocked = function() {
        return _isLocked;
    };

    Accommodation.prototype.setAlarmMessage = function(message) {
        _alarmMessage = message;
    };

    return Accommodation;
})();

var house = new Accommodation();
house.lock();
// house._alarm();
console.log("TCL: house._isLocked", house._isLocked);
house.getIsLocked();
house.setAlarmMessage("The alarm is now activated!");
house.lock();
