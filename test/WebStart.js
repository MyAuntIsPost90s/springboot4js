const application = require("../src/web/decorator/application");

@application()
class WebStart {

    started() {
        console.log('web is started')
    }
}