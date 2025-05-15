
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
                cb()
            }
        }
    }

    reject = (reason) => {
        if (this.state == PENDING) {
            this.state = REJECTED
            this.reason = reason
            while(this.failCbList.length) {
                const cb = this.failCbList.shift();
                cb()
            }
        }
    }

    then = (succCb, failCb) => {
        let promise2 = new MyPromise((res, rej) => {
            if (this.state == FULFILLED) {
                setTimeout(() => {
                    handleResolveValue(promise2, succCb, this.value, res, rej);
                }, 0)
            } else if (this.state == REJECTED) {
                setTimeout(() => {
                    handleResolveValue(promise2, failCb, this.reason, res, rej);
                }, 0)
            } else {
                this.succCbList.push(() => {
                    setTimeout(() => {
                        handleResolveValue(promise2, succCb, this.value, res, rej);
                    }, 0);
                })
                this.failCbList.push(() => {
                    setTimeout(() => {
                        handleResolveValue(promise2, failCb, this.reason, res, rej);
                    }, 0);
                })
            }
        })
        return promise2
    }

    static all = (arr) => {
        let ans = [];
        let cnt = 0;
        return new MyPromise((res, rej) => {
            for (let i = 0; i < arr.length; i++) {
                let current = arr[i];
                if (current instanceof MyPromise) {
                    cnt++;
                    try {
                        current.then(value => {
                            cnt--
                            ans[i] = value
                            if (!cnt) {
                                res(ans);
                            }
                        }, reason => {
                            rej(reason)
                        })
                    } catch(e) {
                        rej(e)
                    }
                } else {
                    ans[i] = current
                }
            }
        })
    }

    static resolve = (val) => {
        if (val instanceof MyPromise) {
            return val
        } else {
            return new MyPromise(res => {
                res(val)
            })
        }
    }

}

const handleResolveValue = (promise2, cb, val,  res, rej) => {
    try {
        let x = cb(val)
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
}


function test() {
    const p1 = function() {
        return new MyPromise((res, rej) => {
            res('hello')
        })
    }
    p1().finally(() => {
        console.log('finally')
    }).then(value => {
        console.log('value', value)
    })
}

test()



