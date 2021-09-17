const { componentEvents } = require("../events/componentEvents");
const beanPool = require("../pool/beanPool");
const decoratorPool = require("../pool/decoratorPool");
const beanProxy = require("../proxy/beanProxy");

/**
 * bean 注解，用于 class，将返回结果注入到 bean 管理中
 * 
 * @param {*} key 注入名
 * @author cch
 */
const component = (key) => (target) => {
    const beanName = key || target.name;
    const bean = beanProxy(beanName, new target());
    beanPool.put(beanName, bean);
    // 将继承的 class 加入事件
    let parent = target.__proto__;
    while (parent.name) {
        const decorators = decoratorPool.get(parent)||[]; 
        for(const decorator of decorators) {
            componentEvents.add(target, decorator.event.eventType, decorator.event.data);
        }
        parent = parent.__proto__;
    }
    // 执行事件
    componentEvents.trigger(target, bean);
    return target;
}

module.exports = component;