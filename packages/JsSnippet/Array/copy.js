const arr = [1, 2, 3, 4, 5, 6]

// 这里注意，因为不是特别要求深拷贝，所以这里写一个简易版本的
const deepCopy = (item) => {
    return JSON.parse(JSON.stringify(item))
}

Array.prototype.myCopy = function () {
    const res = [];
    for (let i = 0; i < this.length; i++) {
        res.push(deepCopy(this[i]))
    }
    return res;
}

console.log(arr.myCopy() === arr)

