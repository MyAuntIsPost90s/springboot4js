const component = require("./component");

/**
 * service 注解，用于类，将自动创建一个类的实例并加入管理
 * 
 * @param {*} key 注入名
 * @author cch
 */
const service = (key) => (target) => {
    return component(key)(target);
}

module.exports = service;