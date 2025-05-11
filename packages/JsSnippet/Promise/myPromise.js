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
    constructor(executor) {
        executor(this.resolve, this.reject)
    }

    resolve = (value) => {
        console.log('line 21', value)
        if (this.status == PENDING) {
            // 将状态更改为成功
            this.status = FULFILLED
            this.value = value
        }
    }

    reject = (reason) => {
        if (this.status == PENDING) {
            this.status = REJECTED
            this.reason = reason
        }
    }
    then(succCb, failCb) {
        console.log('执行了then');
        console.log('this.status', this.status);
        if (this.status == FULFILLED) {
            succCb(this.value)
        } else if (this.status == REJECTED) {
            failCb(this.reason)
        }
    }
}

let promise = new MyPromise((resolve, reject) => {
    // setTimeout(() => {
    //     const time = new Date();
    //     console.log('line 46 执行了');
    //     resolve(200 + ' '+ time.toLocaleTimeString() + ' ' + time.toLocaleDateString());
    // }, 1000);

    const time = new Date();
    resolve(200 + ' '+ time.toLocaleTimeString() + ' ' + time.toLocaleDateString());
})

promise.then(res => {
    console.log('inthen',res)
}, reason => {

})
