
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
    let p1 = new MyPromise((res, rej) => {
        res();
    }).then(val => {
        return p1
    })

    p1.then(val => {}, reason => {
        console.log('reason: ', reason);
    })
    /**
     期望输出：
     reason:  TypeError: 不允许循环调用Promise
        at xxxx
        ... 此处省略堆栈信息
        at xxxx
     */
}

test()
