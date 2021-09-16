const pool = {};

const put = (key, val) => {
    pool[key] = val;
}

const get = (key) => {
    return pool[key];
}

const beanPool = {
    put, get
}

module.exports = beanPool;