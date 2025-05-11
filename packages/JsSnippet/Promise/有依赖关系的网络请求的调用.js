// 等待 pending
// 成功 fulfilled
// 失败 rejected
const initTest = 'testStr';
function req1 (initTest) {
    return new Promise(res => {
        setTimeout(() => {
            res(initTest + ' req1')
        }, 1000)
    })
}

function req2(res1) {
    return new Promise(res => {
        setTimeout(() => {
            res(res1 + ' req2')
        }, 1000);
    })
}

function req3(res2) {
    return new Promise(res => {
        setTimeout(() => {
            res(res2 + ' req3')
        }, 1000);
    })
}

// 下面这里是嵌套调用
// req1(initTest).then(res1 => {
//     req2(res1).then(res2 => {
//         req3(res2).then(res3 => {
//             console.log('res: ', res3)
//         })
//     })
// })


req1(initTest).then(res1 => {
    console.log('req1', res1);
    return req2(res1)
}).then(res2 => {
    console.log('req2', res2);
    return req3(res2)
}).then(res3 => {
    console.log('req3', res3);
})
