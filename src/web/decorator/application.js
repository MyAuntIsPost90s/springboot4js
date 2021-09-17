const express = require('express');
const applicationContext = require('../../context/applicationContext');
const component = require('../../core/decorator/component');
const webContext = require('../context/webContext');

const application = (port) => (target) => {
    if (!port) {
        port = 8081;
    }
    component("application")(target);
    const application = applicationContext.getBean("application");
    application.routers = {};
    webContext.setApplication(application);
    application.expressApp = express();
    application.expressApp.use(express.json());
    application.expressApp.use(express.urlencoded());
    application.expressApp.listen(port, application.started && application.started());
    return target;
}

module.exports = application;