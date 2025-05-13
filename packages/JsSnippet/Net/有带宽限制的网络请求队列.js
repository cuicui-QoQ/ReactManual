const createNet = (api, data, cb) => {
    const netWorkData = {
        api,
        data
    }
    return {
        netWorkData,
        cb
    }
}

const sendApi = (netWorkData) => {
    return new Promise((res, rej) => {
        console.log('发包', netWorkData)
        const sendTime = new Date();
        setTimeout(() => {
            const nowTime = new Date()
            const timeStr = 'nowTime: ' + nowTime.toLocaleTimeString() + ' sendTime: ' + sendTime.toLocaleTimeString();
            if (nowTime.getTime() - sendTime.getTime() > 5000) {
                console.log(netWorkData, '超时了。。。。。')
                rej('超时' + timeStr)
            } else {
                console.log(netWorkData, '收到回包了。。。。。')
                res('成功' + timeStr)
            }
        }, 1000 + 6000 * Math.random())
    })
}

const mockData = [];
const testLen = 10;
for (let i = 0; i < testLen; i++) {
    mockData.push(createNet('api' + i, 'data' + i, (res) => {
        console.log('第'+ i + '网络请求的回掉函数, 结果是', res)
    }))
}

class NetTask {

    // 带宽
    width = 3
    // 当前等待中的网络请求
    cnt = 0
    waitList = []

    constructor(width = 3) {
        this.width = width
        this.cnt = 0
    }

    addNet(net) {
        // console.log('addNet', net);
        if (this.cnt < this.width) {
            this.cnt++;
            const { netWorkData, cb } = net;
            sendApi(netWorkData).then(res => {
                cb(res)
            }, rej => {
                cb(rej)
            }).finally(() => {
                this.cnt--;
                const newWait = this.waitList.shift();
                newWait && this.addNet(newWait)
            })
        } else {
            this.waitList.push(net);
        }
    }

}

const netTaskInstance = new NetTask();

mockData.forEach(net => {
    netTaskInstance.addNet(net)
})
