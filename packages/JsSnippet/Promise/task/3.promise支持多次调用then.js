
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
    state = PENDING

    value = undefined
    reason = undefined
    failCb = undefined
    succCb = undefined

    constructor(exec) {
        exec(this.resolve, this.reject)
    }

    resolve = (value) => {
        if (this.state == PENDING) {
            this.state = FULFILLED
            this.value = value;
            this.succCb && this.succCb(value)
        }
    }

    reject = (reason) => {
        if (this.state == PENDING) {
            this.state = REJECTED
            this.reason = reason
            this.failCb && this.failCb(reason)
        }
    }

    then = (succCb, failCb) => {
        if (this.state == FULFILLED) {
            succCb(this.value)
        } else if (this.state == REJECTED) {
            failCb(this.reason)
        } else {
            this.succCb = succCb
            this.failCb = failCb
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


