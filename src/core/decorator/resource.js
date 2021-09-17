const { componentEvents, eventType } = require("../events/componentEvents");
const decoratorPool = require("../pool/decoratorPool");

const resource = (key) => (target, prototypeKey, descriptor) => {
    // 加入调用事件
    const event = { eventType: eventType.INJECTION, data: { injectionName: key || prototypeKey, fieldName: prototypeKey } };
    componentEvents.add(target.constructor, event.eventType, event.data);
    decoratorPool.add(target.constructor, { type: resource.name, event });
    return descriptor;
}

module.exports = resource;