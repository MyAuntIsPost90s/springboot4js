const application = require("../src/web/decorator/application");

@application(8082)
class WebStart {

    started() {
        console.log('web is started')
    }
}