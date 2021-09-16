const pool = {}

const decoratorPool = {
    add: (target, decorator) => {
        if (!pool[target]) {
            pool[target] = [];
        }
        pool[target].push(decorator);
    },
    get: (target) => {
        return pool[target] || [];
    }
}

module.exports = decoratorPool;