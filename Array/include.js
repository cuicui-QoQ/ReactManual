const arr = [1, 2, 6, 4, 5, 6]
Array.prototype.myInclude = function (callback, fromIndex = 0) {
    if (typeof callback !== 'function') {
        throw new TypeError('callback must be a function')
    }
    let res = false
    for (let i = fromIndex; i < this.length; i++) {
        if (callback && callback(this[i])) {
            res = true
        }
    }
    return res
}

const res = arr.myInclude(item => {
    return item % 3 == 0
})

console.log(res)
