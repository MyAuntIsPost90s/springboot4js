const { componentEvents, eventType } = require("../events/componentEvents");
const decoratorPool = require("../pool/decoratorPool");

/**
 * bean 注解，用于函数，将返回结果注入到 bean 管理中
 * 
 * @param {*} key 注入名
 * @author cch
 */
const bean = (key) => (target, prototypeKey, descriptor) => {
    // 加入调用事件
    const event = { eventType: eventType.CALL, data: { injectionName: key || prototypeKey, funName: prototypeKey } }
    componentEvents.add(target.constructor, event.eventType, event.data);
    decoratorPool.add(target.constructor, { type: bean.name, event });
    return descriptor;
}

module.exports = bean;