const funProxy = (bean, funName) => {
    const oriFun = bean[funName];
    bean[funName] = (...args) => {
        return oriFun.apply(bean, args);
    }
}

module.exports = funProxy;