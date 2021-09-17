const applicationContext = require("../src/context/applicationContext");
const bean = require("../src/core/decorator/bean");
const component = require("../src/core/decorator/component");
const resource = require("../src/core/decorator/resource");

@component()
class Main {

    @bean("test")
    testFun() {
        return 2;
    }
}

@component()
class Main2 {

    @resource()
    test;

    @resource("Main2")
    test2;

    @resource("Main")
    test3;

    fun() {
        return 1;
    }
}

@component()
class Main3 extends Main2 {

}

console.log(applicationContext.getBean("Main3").test, applicationContext.getBean("Main3").test2, applicationContext.getBean("Main3").test3)