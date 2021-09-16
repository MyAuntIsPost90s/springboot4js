const resource = require("../src/core/decorator/resource");
const controller = require("../src/web/decorator/controller");
const get = require("../src/web/decorator/get");

@controller("/test")
class TestController {

    @resource()
    testService

    @get("/login")
    login(req, resp) {
        let result = this.testService.add(10, 20)
        return resp.send({ code: 1, message: '成功', data: result });
    }
}