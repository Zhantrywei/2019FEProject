// Class 返回一个对象,这个对象有一个create的方法
var Class = (function () {
    // create有两个参数,一个是定义的子类(新类),一个是需要继承的父类(可选)
    function create(classDefinition, parentPrototype) {
        // 定义新类的构造函数
        var _NewClass = function() {
                console.log("this: ", this);
                if (this.initialize && typeof this.initialize === "function") {
                    this.initialize.apply(this, arguments);
                }
            },
            _name;
        if (parentPrototype) {
            // 如果存在父类,则这个新类继承传入的父类,同时把父类自身的属性方法初始化到子类的prototype
            _NewClass.prototype = new parentPrototype.constructor();
            for (_name in parentPrototype) {
                if (parentPrototype.hasOwnProperty(_name)) {
                    _NewClass.prototype[_name] = parentPrototype[_name];
                }
            }
        }

        // 定义一个闭包函数,来返回另一个函数代替传入的函数,主要是处理多态时的情况
        function polymorph(thisFunction, parentFunction) {
            return function() {
                var output;
                this.__parent = parentFunction;
                output = thisFunction.apply(this, arguments);
                delete this.__parent;
                return output;
            };
        }
        for (_name in classDefinition) {
            if (classDefinition.hasOwnProperty(_name)) {
                if (
                    parentPrototype &&
                    parentPrototype[_name] &&
                    typeof classDefinition[_name] === "function"
                ) {
                    _NewClass.prototype[_name] = polymorph(
                        classDefinition[_name],
                        parentPrototype[_name]
                    );
                } else {
                    _NewClass.prototype[_name] = classDefinition[_name];
                }
            }
        }

        _NewClass.prototype.constructor = _NewClass;
        _NewClass.extend = extend;
        return _NewClass;
    }

    function extend(classDefinition) {
        return create(classDefinition, this.prototype);
    }

    return {
        create: create
    };
})();
var Accommodation = Class.create(
    (function() {
        "use strict";
        var _isLocked = true,
            publicPropertiesAndMethods = {
                lock: function() {
                    _isLocked = ture;
                },
                unlock: function() {
                    _isLocked = false;
                },
                getIsLocked: function() {
                    return _isLocked;
                },
                initialize: function() {
                    this.unlock();
                }
            };

        return publicPropertiesAndMethods;
    })()
);

var House = Accommodation.extend({
    isAlarmed: false,
    alarm: function() {
        this.isAlarmed = true;
        console.log("Alarm activated!");
    },
    lock: function() {
        Accommodation.prototype.lock.call(this);
        this.alarm();
    }
});
