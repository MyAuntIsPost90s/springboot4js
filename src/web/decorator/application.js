const express = require('express');
const applicationContext = require('../../context/applicationContext');
const componet = require('../../core/decorator/componet');
const webContext = require('../context/webContext');

const application = (port) => (target) => {
    if (!port) {
        port = 8081;
    }
    componet("application")(target);
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