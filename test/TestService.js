const service = require("../src/core/decorator/service");

@service("testService")
class TestService {

  add(a, b) {
    return a + b;
  }
}