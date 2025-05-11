const MyPromise = require('../myPromise.js');
new MyPromise((res, rej) => {
    setTimeout(() => {
        res('成功')
    }, 2000);
}).then().then().then(res => {
    console.log('这里因为 最前面的一个then中，res了成功，所以: ', res);
})


new MyPromise((res, rej) => {
    setTimeout(() => {
        rej('失败')
    }, 2000);
}).then().then().then(res => {
    console.log(res);
}, rej => {
    console.log('这里因为 前一个then中，rej了失败，所以: ', rej);

})
