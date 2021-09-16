const webContext = require("../context/webContext");
const express = require('express');
const post = require("./post");
const componet = require("../../core/decorator/componet");
const applicationContext = require("../../context/applicationContext");

const controller = (path) => (target) => {

    componet(target.name)(target);
    const bean = applicationContext.getBean(target.name);

    // 执行函数签名中的 get,post 进行初始化
    const app = webContext.getApplication().expressApp;
    const router = express.Router();
    const routers = webContext.getRouters(target);
    for (let item of routers) {
        let routerFun = 'get';
        if (item.method == post.name) {
            routerFun = 'post'
        }
        if (item.option) {
            router[routerFun](item.path, item.option, (req, resp) => bean[item.fun.name](req, resp));
        } else {
            router[routerFun](item.path, (req, resp) => bean[item.fun.name](req, resp));
        }
    }
    app.use(path, router);
    return target;
}

module.exports = controller;