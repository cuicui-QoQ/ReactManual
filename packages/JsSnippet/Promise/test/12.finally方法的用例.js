const MyPromise = require('../myPromise.js');

function test() {
    new MyPromise((res) => {
        res('p1 resolve')
    }).finally(() => {
        console.log('finally')
        return new MyPromise((res) => {
            setTimeout(() => {
                res('p2 resolve')
            }, 2000)
        })
    }).then(val => {
        console.log(val)
    }, reason => {
        console.log(reason)
    })
}

function promiseTest () {
    new Promise((res) => {
        res('p1 resolve')
    }).finally(() => {
        console.log('finally')
        return new Promise((res) => {
            setTimeout(() => {
                res('p2 resolve')
            }, 2000)
        })
    }).then(val => {
        console.log(val)
    }, reason => {
        console.log(reason)
    })
}
promiseTest()
// test()
