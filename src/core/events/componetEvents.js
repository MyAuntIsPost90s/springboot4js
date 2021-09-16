const beanPool = require("../pool/beanPool");

const events = {};

const eventType = {
    CALL: 1,
    INJECTION: 2,
    DELAY_INJECTION: 3
}

const eventWorker = {}
eventWorker[eventType.CALL] = (target, bean, event) => {
    const result = { payload: bean.payload[event.data.funName](), injectionName: event.data.injectionName };
    beanPool.put(event.data.injectionName, result);
    componetEvents.trigger(event.data.injectionName, result);
}
eventWorker[eventType.INJECTION] = (target, bean, event) => {
    bean.payload[event.data.fieldName] = beanPool.get(event.data.injectionName) ? beanPool.get(event.data.injectionName).payload : undefined;
    if (!bean.payload[event.data.fieldName]) {
        componetEvents.add(event.data.injectionName, eventType.DELAY_INJECTION, { ...event.data, bean });
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
const componetEvents = {

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
            if (eventType.DELAY_INJECTION == event.tyep) {
                eventWorker[event.type](bean.injectionName, bean, event);
            } else {
                eventWorker[event.type](target, bean, event);
            }
        }
        delete events[target];
    }

}

module.exports = { eventType, componetEvents }