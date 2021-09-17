const beanPool = require("../pool/beanPool");
const beanProxy = require("../proxy/beanProxy");

const events = {};

const eventType = {
    CALL: 1,
    INJECTION: 2,
    DELAY_INJECTION: 3
}

const eventWorker = {}
eventWorker[eventType.CALL] = (target, bean, event) => {
    const result = beanProxy(event.data.injectionName, bean.payload[event.data.funName]());
    beanPool.put(event.data.injectionName, result);
    componentEvents.trigger(event.data.injectionName, result);
}
eventWorker[eventType.INJECTION] = (target, bean, event) => {
    bean.payload[event.data.fieldName] = beanPool.get(event.data.injectionName) ? beanPool.get(event.data.injectionName).payload : undefined;
    if (!bean.payload[event.data.fieldName]) {
        componentEvents.add(event.data.injectionName, eventType.DELAY_INJECTION, { ...event.data, bean });
    }
}
eventWorker[eventType.DELAY_INJECTION] = (target, bean, event) => {
    event.data.bean.payload[event.data.fieldName] = bean.payload;
}

/**
 * 组件事件
 * 
 * @author cch
 */
const componentEvents = {

    add: (target, type, data) => {
        if (!events[target]) {
            events[target] = [];
        }
        events[target].push({ data, type });
    },

    trigger: (target, bean) => {
        let list = events[target] || [];
        list = list.concat(events[bean.injectionName] || []);
        for (const event of list) {
            if (eventType.DELAY_INJECTION == event.type) {
                eventWorker[event.type](bean.injectionName, bean, event);
            } else {
                eventWorker[event.type](target, bean, event);
            }
        }
        delete events[target];
    }

}

module.exports = { eventType, componentEvents }