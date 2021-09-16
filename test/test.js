const applicationContext = require("../src/context/applicationContext");
const bean = require("../src/core/decorator/bean");
const componet = require("../src/core/decorator/componet");
const resource = require("../src/core/decorator/resource");

@componet()
class Main {

    @bean("test")
    testFun() {
        return 2;
    }
}

@componet()
class Main2 {

    @resource()
    test;

    @resource("Main2")
    test2;

    @resource("Main")
    test3;
}

@componet()
class Main3 extends Main2 {

}

console.log(applicationContext.getBean("Main3").test, applicationContext.getBean("Main3").test2, applicationContext.getBean("Main3").test3)