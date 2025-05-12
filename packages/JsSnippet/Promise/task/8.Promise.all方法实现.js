
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
    function test() {
        function p1 () {
            return new MyPromise((res, rej) => {
                setTimeout(() => {
                    res('function p1')
                }, 2000)
            })
        }
        function p2 () {
            return new MyPromise((res, rej) => {
                res('function p1')
            })
        }

        MyPromise.all(['a', 'b', p1(), p2(), 'c']).then(res => {
            console.log(res);
        })
    }

    test()
}

test()
