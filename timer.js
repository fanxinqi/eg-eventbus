var eventApiOn = function (event, callback, context, opt) {
    if (typeof event !== "string") throw "缺少订阅事件名";
    if (typeof callback !== "function") throw "缺少处理函数";
    var handle = callback.bind(context);
    if (!Array.isArray(this.events[event])) {
        this.events[event] = [];
    }
    this.events[event].push({
        opt: opt,
        handle: handle
    });
}

function EventBus() {
    this.events = {};
}
/*
 *  触发事件
 *  @param event {string} 事件名称
 *  @param args {string} 参数
 *  @param context {Object} 上下文对象
 */
EventBus.prototype.trigger = function (event, args) {
    var eventTarget = this.events[event];
    if (Array.isArray(eventTarget)) {
        for (var i = 0, len = eventTarget.length; i < len; i++) {
            eventTarget[i].handle.call(this, args)
            var opt = eventTarget[i].opt;
            if (opt && opt.once) {
                eventTarget.splice(i, 1);
            }
        }
    }
};
/*
 *  定阅事件
 *  @param event {string} 事件名称
 *  @param callback {string} 处理函数
 *  @param context {Object} 上下文对象
 */
EventBus.prototype.on = function (event, callback, context) {
    eventApiOn.apply(this, arguments)
};
/*
 *  注销订阅事件
 *  @param event {string} 事件名称
 */
EventBus.prototype.off = function (event, callback) {
    var eventTarget = this.events[event];
    if (!callback) {
        delete this.events[event];
    } else if (Array.isArray(eventTarget)) {
        for (var i = 0; i < eventTarget.length; i++) {
            if (eventTarget[i] && eventTarget[i].handle === callback) {
                eventTarget.splice(i, 1);
            }
        }
    }
};
/*
 * 订阅一次
 *  @param event {string} 事件名称
 */
EventBus.prototype.once = function (event, callback) {
    var arg = [].slice.apply(arguments);
    arg.push({
        once: true
    })
    eventApiOn.apply(this, arg)
};
/**定时器
 * @param  {Number}  n 毫秒数
 * @retrun  {Boolean}  
 */
const Timer = function (n) {
    EventBus.call(this);
    this.n = n;
}

Timer.prototype = new EventBus();
Timer.prototype.constructor = Timer;
var i = 0;
Timer.prototype.run = function () {
    let hz = 60 / 1000;
    me = this;
    if (i === 0) {
        i += hz;
        me.trigger("step", i / this.n);
        me.run()
    } else if (i <= this.n) {
        setTimeout(function () {
            i += hz;
            me.trigger("step", i / me.n);
            me.run()
        }, hz)
    }
}