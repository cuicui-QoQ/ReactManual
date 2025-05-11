
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
        if (this.state == FULFILLED) {
            succCb(this.value)
        } else if (this.state == REJECTED) {
            failCb(this.reason)
        } else {
            this.succCbList.push(succCb)
            this.failCbList.push(failCb)
        }
    }
}
function test() {
    let syncPromise = new MyPromise((res, rej) => {
        res('syncPromise')
    })
    syncPromise.then(res=> {
        console.log('inthen 1',res)
        return 100
    }).then(res => {
        console.log(res);
    })

    new MyPromise((res, rej) => {
        res('syncPromise')
    }).then(res => {
        console.log('inthen 1: ',res)
        return new MyPromise((res, rej) => {
            res('other');
        })
    }).then(res => {
        console.log('link 1: ', res);
    })
    /**
     * 期望输出

    inthen 1 syncPromise
    100
    inthen 1:  syncPromise
    link 1:  other
    */
}

test()
