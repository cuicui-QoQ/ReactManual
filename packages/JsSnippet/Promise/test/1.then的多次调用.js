const MyPromise = require('../myPromise.js');

let promise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        const time = new Date();
        resolve(200 + ' '+ time.toLocaleTimeString() + ' ' + time.toLocaleDateString());
    }, 1000);
})

let syncPromise = new MyPromise(resolve => {
    const time = new Date();
    resolve(200 + ' '+ time.toLocaleTimeString() + ' ' + time.toLocaleDateString());
})
/**********************
 *
 * 下面这里是then的多次调用
 *
 *********************/
promise.then(res => {
    console.log('inthen 1',res)
})

promise.then(res => {
    console.log('inthen 2',res)
})

promise.then(res => {
    console.log('inthen 3',res)
})
