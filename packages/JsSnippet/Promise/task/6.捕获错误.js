
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
    state = PENDING

    value = undefined
    reason = undefined
    failCbList = []
    succCbList = []

    constructor(exec) {
        exec(this.resolve, this.reject)
    }

    resolve = (value) => {
        if (this.state == PENDING) {
            this.state = FULFILLED
            this.value = value;
            while(this.succCbList.length) {
                const cb = this.succCbList.shift();
                cb(value)
            }
        }
    }

    reject = (reason) => {
        if (this.state == PENDING) {
            this.state = REJECTED
            this.reason = reason
            while(this.failCbList.length) {
                const cb = this.failCbList.shift();
                cb(reason)
            }
        }
    }

    then = (succCb, failCb) => {
        let promise2 = new MyPromise((res, rej) => {
            if (this.state == FULFILLED) {
                setTimeout(() => {
                    let x = succCb(this.value)
                    if (x === promise2) {
                        throw new TypeError('不允许循环调用Promise')
                    } else if (x instanceof MyPromise) {
                        return x.then(res, rej)
                    } else {
                        res(x);
                    }
                }, 0)
            } else if (this.state == REJECTED) {
                failCb(this.reason)
            } else {
                this.succCbList.push(succCb)
                this.failCbList.push(failCb)
            }
        })
        return promise2
    }
}


function test() {

    // 这里是构造函数中的错误需要捕获
    const errorPromise = new MyPromise((res, rej) => {
        throw new Error('exec error')
    })

    errorPromise.then(value => {
        console.log('value: ', value);
    }, reason => {
        console.log('reason: ', reason);
    })

    // 这里是then的回掉函数中的需要捕获
    new MyPromise((res) => {
        res('成功')
    }).then(val => {
        console.log('在Promise中resolve的值', val)
        throw new Error('then error')
    }).then(val => {
        console.log('then的回调函数中的then', val);
    }, reason => {
        console.log('then的回调函数中的error', reason);
    })
    /**
    errorPromise then rej: reason:  Error: exec error
        at ...省略堆栈
    在Promise中resolve的值 成功
    then的回调函数中的error Error: then error
        at ...省略堆栈
     */
}

test()
