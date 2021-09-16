const { componetEvents } = require("../events/componetEvents");
const beanPool = require("../pool/beanPool");
const decoratorPool = require("../pool/decoratorPool");

/**
 * bean 注解，用于 class，将返回结果注入到 bean 管理中
 * 
 * @param {*} key 注入名
 * @author cch
 */
const componet = (key) => (target) => {
    const bean = { payload: new target(), injectionName: key || target.name };
    beanPool.put(key || target.name, bean);
    // 将继承的 class 加入事件
    let parent = target.__proto__;
    while (parent.name) {
        const decorators = decoratorPool.get(parent)||[]; 
        for(const decorator of decorators) {
            componetEvents.add(target, decorator.event.eventType, decorator.event.data);
        }
        parent = parent.__proto__;
    }
    // 执行事件
    componetEvents.trigger(target, bean);
    return target;
}

module.exports = componet;