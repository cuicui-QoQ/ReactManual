
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
        try {
            exec(this.resolve, this.reject)
        } catch(e) {
            this.reject(e)
        }
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
                    try {
                        let x = succCb(this.value)
                        if (x === promise2) {
                            throw new TypeError('不允许循环调用Promise')
                        } else if (x instanceof MyPromise) {
                            return x.then(res, rej)
                        } else {
                            res(x);
                        }
                    } catch(e) {
                        rej(e)
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
    new MyPromise((res, rej) => {
        setTimeout(() => {
            rej('失败')
        }, 2000);
    }).then(res => {}, rej => {
        console.log('错误异常应该到这里', rej)
        return 10000
    }).then(res => {
        console.log('这里因为 前一个then中，rej了10000，所以: ', res);
    })
    // 期望输出
    // 错误异常应该到这里 失败
    // 这里因为 前一个then中，rej了10000，所以:  10000
}

test()
