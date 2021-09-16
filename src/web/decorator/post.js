const webContext = require("../context/webContext");

const post = (path, option) => (target, prototypeKey, descriptor) => {
    webContext.addRouter(target.constructor, { path, fun: descriptor.value, method: post.name, option })
    return descriptor;
}

module.exports = post;