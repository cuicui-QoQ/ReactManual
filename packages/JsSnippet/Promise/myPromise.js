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
        executor(this.resolve, this.reject)
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
                cb(value)
            }
        }
    }
    then(succCb, failCb) {
        if (this.status == FULFILLED) {
            succCb(this.value)
        } else if (this.status == REJECTED) {
            failCb(this.reason)
        } else {
            // 如果异步任务没结束就调用了then方法, 需要临时存储一下成功和失败的回掉函数
            this.failCallbackList.push(failCb);
            this.successCallbackList.push(succCb);
        }
    }
}

let promise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        const time = new Date();
        resolve(200 + ' '+ time.toLocaleTimeString() + ' ' + time.toLocaleDateString());
    }, 1000);
})

promise.then(res => {
    console.log('inthen 1',res)
})

promise.then(res => {
    console.log('inthen 2',res)
})

promise.then(res => {
    console.log('inthen 3',res)
})
