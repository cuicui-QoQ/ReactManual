
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
    state = PENDING

    value = undefined
    reason = undefined

    constructor(exec) {
        exec(this.resolve, this.reject)
    }

    resolve = (value) => {
        if (this.state == PENDING) {
            this.state = FULFILLED
            this.value = value;
        }
    }

    reject = (reason) => {
        if (this.state == PENDING) {
            this.state = REJECTED
            this.reason = reason
        }
    }

    then = (succCb, failCb) => {
        if (this.state == FULFILLED) {
            succCb(this.value)
        } else if (this.state == REJECTED) {
            failCb(this.reason)
        }
    }
}

let deferPromise = new MyPromise((res, rej) => {
    setTimeout(() => {
        res('异步res的str')
    }, 2000)
})

let deferRejPromise = new MyPromise((res, rej) => {
    setTimeout(() => {
        rej('异步rej的str')
    }, 2000)
})


deferPromise.then(res => {
    console.log('res: ', res);
}, rej => {
    console.log('rej: ', rej);
})

deferRejPromise.then(res => {
    console.log('res: ', res);
}, rej => {
    console.log('rej: ', rej);
})
