/**
 *  ## This is the __module__ description for the `YUIDoc` module.
 *  
 *  > [YUIDoc](http://yui.github.io/yuidoc/)
 *  >
 *  > [YUIDoc - github](https://github.com/yui/yuidoc)
 *  >
 * 
 *     ```js
 *          var options = {
 *              paths: [ './lib' ],
 *              outdir: './out'
 *          };
 *
 *          var Y = require('yuidoc');
 *          var json = (new Y.YUIDoc(options)).run();
 *     ```
 * 
 * @class YUIDoc
 * @main yuidoc
 */

/**
 * 与住宅相关的各种“类”
 *
 * @module Accommodation-related
 * @submodule Accommodation-foo
 * @main Accommodation
 * @element x-foo
 */

/**
 * 定义各种类型住宅的“类”
 *
 * @class Accommodation
 * @constructor
 * @example
 *     var myAccommodation = new Accommodation();
 */

var Accommodation = Class.create(
    (function() {
        /**
         * 标明住宅当前是否上锁
         *
         * @property {Boolean} _isLocked
         * @protected
         */
        var _isLocked = true,
            publicPropertiesAndMethods = {
                /**
                 * 给住宅上锁
                 *
                 * @method lock
                 * @example
                 *      var myAccommodation = new Accommodation();
                 *      myAccommodation.lock();
                 */
                lock: function() {
                    _isLocked = ture;
                },

                /**
                 * 给住宅解锁
                 *
                 * @method unlock
                 * @example
                 *      var myAccommodation = new Accommodation();
                 *      myAccommodation.unlock();
                 */
                unlock: function() {
                    _isLocked = false;
                },

                /**
                 * 确定住宅当前是否上锁
                 *
                 * @method getIsLocked
                 * @return {Boolean} 该值表示锁的状态——true表示已上锁
                 * @example
                 *      var myAccommodation = new Accommodation();
                 *      myAccommodation.getIsLocked();  // false
                 *
                 * @example
                 *      var myAccommodation = new Accommodation();
                 *      myAccommodation.lock();
                 *      myAccommodation.getIsLocked(); // true
                 */
                getIsLocked: function() {
                    return _isLocked;
                },

                /**
                 * 创建该“类”的对象实例时会自动执行本方法对住宅进行解锁
                 *
                 * @method initialize
                 *
                 */
                initialize: function() {
                    this.unlock();
                }
            };

        return publicPropertiesAndMethods;
    })()
);

/**
 * 表示房子的“类”，这是一种特色类型的住宅
 *
 * @class House
 * @constructor
 * @extends Accommodation
 * @example
 *      var myHouse = new House();
 */
var House = Accommodation.extend({
    /**
     * 表示房子警报是否开启——true表示已开启
     *
     * @property {Boolean} isAlarmed
     */
    isAlarmed: false,

    /**
     * 启动房子的警报
     *
     * @method alarm
     */
    alarm: function() {
        this.isAlarmed = true;
        console.log("Alarm activated!");
    },

    /**
     * 给房子上锁并启动警报
     *
     * @method lock
     */
    lock: function() {
        Accommodation.prototype.lock.call(this);
        this.alarm();
    }
});
