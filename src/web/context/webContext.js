let application = null;

const webContext = {
  setApplication: (bean) => {
    application = bean;
  },
  getApplication: () => {
    return application;
  },
  addRouter: (target, router) => {
    if (!application.routers[target]) {
      application.routers[target] = [];
    }
    application.routers[target].push(router);
  },
  getRouters: (target) => {
    return application.routers[target] || [];
  }
}

module.exports = webContext;