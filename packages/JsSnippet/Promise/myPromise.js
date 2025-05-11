const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

/*
    1. Promise 创建的时候，需要传递执行器进入，执行器会立即执行
    2. Promise 三种状态， 成功，fulfilled，rejected，pending，只能从pending到另外两个状态，一旦确定之后，就不可更改
    3. resolve, reject 函数是用来更改状态的
    4. then 调用内部保存的成功值和失败值
*/
class MyPromise {

    status = PENDING
    // 成功之后的值
    value = undefined
    reason = undefined
    successCallbackList = []
    failCallbackList = []
    constructor(executor) {
        // executor 是一个函数，下面这里的代码，是把Promise内部的res和rej，在下面
        // exec = (res, rej) => { }
        // 这个函数上执行调用 exec(res, rej)
        /**
         *
        以这个为例
        new MyPromise((resolve, reject) => {
            setTimeout(() => {
                const time = new Date();
                resolve(200 + ' '+ time.toLocaleTimeString() + ' ' + time.toLocaleDateString());
            }, 1000);
        })

        脑洞编译之后如下：
        setTimeout(() => {
            const time = new Date();
            this.resolve(200 + ' '+ time.toLocaleTimeString() + ' ' + time.toLocaleDateString());
        }, 1000);
        */
       try {
            executor(this.resolve, this.reject)
       } catch(e) {
            // 增加错误处理
            this.reject(e);
       }
    }

    resolve = (value) => {
        if (this.status == PENDING) {
            // 将状态更改为成功
            this.status = FULFILLED
            this.value = value
            // 特别注意，这个cb是消耗品，执行一个销毁一个
            while(this.successCallbackList.length) {
                const cb = this.successCallbackList.shift()
                cb(value)
            }
        }
    }

    reject = (reason) => {
        if (this.status == PENDING) {
            this.status = REJECTED
            this.reason = reason
            // 特别注意，这个cb是消耗品，执行一个销毁一个
            while(this.failCallbackList.length) {
                const cb = this.failCallbackList.shift()
                cb(reason)
            }
        }
    }
    then(succCb, failCb) {
        let promise2 = new MyPromise((res, rej) => {
            if (this.status == FULFILLED) {
                // 这里写成异步代码，主要是为了防止 promise2 拿不到值，因为new是在执行器之后
                setTimeout(() => {
                    try {

                        let x = succCb(this.value)
                        // 判断x的值是普通值还是promise对象
                        // 如果是普通值，直接调用resolve
                        // 如果是 promise对象，则查看 promise对象的返回结果，根据结果决定调用resolve，还是reject。
                        resolvePromise(promise2, x, res, rej);
                    } catch (e) {
                        // 这里捕获当前的then中的错误，传递给下一个
                        rej(e)
                    }
                }, 0)
            } else if (this.status == REJECTED) {
                failCb(this.reason)
            } else {
                // 如果异步任务没结束就调用了then方法, 需要临时存储一下成功和失败的回掉函数
                this.failCallbackList.push(failCb);
                this.successCallbackList.push(succCb);
            }
        });
        return promise2;
    }
}

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError('不允许循环调用Promise'))
    }
    if(x instanceof MyPromise) {
        // x.then((val) => resolve(val), reason => reject(reason))
        // 两种写法一致
        x.then(resolve, reject)
    } else {
        resolve(x);
    }
}


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
// promise.then(res => {
//     console.log('inthen 1',res)
// })

// promise.then(res => {
//     console.log('inthen 2',res)
// })

// promise.then(res => {
//     console.log('inthen 3',res)
// })


/**********************
 *
 * 下面这里是then的链式调用
 *
 *********************/
// syncPromise.then(res=> {
//     console.log('inthen 1',res)
//     return 100
// }).then(res => {
//     console.log(res);
// })

/**********************
 *
 * 下面这里是then的链式调用 -- 返回Promise的情况
 *
 *********************/
// syncPromise.then(res => {
//     console.log('inthen 1: ',res)
//     return new MyPromise((res, rej) => {
//         res('other');
//     })
// }).then(res => {
//     console.log('link 1: ', res);
// })


/**********************
 *
 * 下面这里是处理promise中then的循环调用的问题
 *
 *********************/
// let p1 = syncPromise.then(val => {
//     return p1
// })

// p1.then(val => {}, reason => {
//     console.log('reason: ', reason);
// })


/**********************
 *
 * 下面这里是处理promise中在构造期间抛出error的问题
 *
 *********************/
// const errorPromise = new MyPromise((res, rej) => {
//     throw new Error('exec error')
// })
// errorPromise.then(value => {
//     console.log('value: ', value);
// }, reason => {
//     console.log('reason: ', reason);
// })


/**********************
 *
 * 下面这里是处理promise中在then期间抛出error的问题
 *
 *********************/
// new MyPromise((res) => {
//     res('成功')
// }).then(val => {
//     console.log('在Promise中resolve的值', val)
//     throw new Error('then error')
// }).then(val => {
//     console.log('then的回调函数中的then', val);
// }, reason => {
//     console.log('then的回调函数中的error', reason);
// })
