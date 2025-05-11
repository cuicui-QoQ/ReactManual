

class MyPromise {

}

let promise = new MyPromise((res, rej) => {
    console.log('myPromise Res的测试样例 立即执行')
    res('res str')
})

let promise2 = new MyPromise((res, rej) => {
    console.log('myPromise Rej的测试样例 立即执行')
    rej('rej str')
})


promise.then(res => {
    console.log('res: ', res);
}, rej => {
    console.log('rej: ', rej);
})


promise2.then(res => {
    console.log('res: ', res);
}, rej => {
    console.log('rej: ', rej);
})

