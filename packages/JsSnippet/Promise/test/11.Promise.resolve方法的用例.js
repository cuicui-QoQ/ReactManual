const Promise = require('../myPromise.js');

function test() {
    const p1 = function() {
        return new Promise((res, rej) => {
            res('hello')
        })
    }
    Promise.resolve(10).then(value => console.log(value))
    Promise.resolve(p1()).then(value => console.log(value))
}

test()
