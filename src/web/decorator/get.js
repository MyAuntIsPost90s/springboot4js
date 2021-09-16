const webContext = require("../context/webContext");

const get = (path, option) => (target, prototypeKey, descriptor) => {
    webContext.addRouter(target.constructor, { path, fun: descriptor.value, method: get.name, option })
    return descriptor;
}

module.exports = get;