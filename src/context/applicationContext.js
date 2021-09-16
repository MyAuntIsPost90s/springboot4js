const beanPool = require("../core/pool/beanPool")

const applicationContext = {

  getBean: (key) => {
    return (beanPool.get(key) || {}).payload;
  }

}

module.exports = applicationContext;