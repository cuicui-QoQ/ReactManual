const MyPromise = require('../myPromise.js');

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
