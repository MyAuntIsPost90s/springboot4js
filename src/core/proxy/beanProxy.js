const funProxy = require("./funProxy");

const beanProxy = (injectionName, bean) => {
    if (bean instanceof Object) {
        let parent = bean;
        while (parent) {
            for (const key of Reflect.ownKeys(parent)) {
                if (typeof bean[key] == 'function' && key !== 'constructor') {
                    funProxy(bean, key);
                }
            }
            parent = parent.__proto__;
        }
    }
    return { payload: bean, injectionName }
}

module.exports = beanProxy;