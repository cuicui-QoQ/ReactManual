function sendSuccApi() {
    return new Promise (res => {
        setTimeout(() => {
            res('成功')
        }, 1000 + 5000 * Math.random())
    })
}

function sendFailApi() {
    return new Promise ((res, rej) => {
        setTimeout(() => {
            rej('失败')
        }, 1000 + 5000 * Math.random())
    })
}

Promise.limitAll = (promiseList, limit) => {
    let ansArr = [];
    let errorCnt = 0;
    let succCnt = 0;
    return new Promise((res, rej) => {
        const endCb = () => {
            if (errorCnt + succCnt == promiseList.length) {
                res(ansArr)
            }
        }
        promiseList.forEach((element, idx) => {
            ansArr.push({
                value: '',
                reason: ''
            })
            Promise.resolve(element).then(value => {
                ansArr[idx].value = value
                succCnt++;
                endCb()
            }, reason => {
                ansArr[idx].reason = reason
                errorCnt++;
                if (errorCnt > limit) {
                    rej(ansArr)
                } else {
                    endCb()
                }
            })
        });
    })
}

const testMock = [
    sendFailApi(),
    sendFailApi(),
    sendFailApi(),
    sendSuccApi(),
    sendSuccApi(),
    sendSuccApi()
]

Promise.limitAll(testMock, 2).then(value => {
    console.log('成功', value);
}, reason => {
    console.log('失败', reason);
})
