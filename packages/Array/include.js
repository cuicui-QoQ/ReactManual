const arr = [1, 2, 6, 4, 5, 6]
Array.prototype.myInclude = function (item, fromIndex = 0) {
    if (typeof callback !== 'function') {
        throw new TypeError('callback must be a function')
    }
    let res = false
    let startIdx = 0;
    if (fromIndex > 0) {
        startIdx = fromIndex;
    }
    for (let i = startIdx; i < this.length; i++) {
        if (Number.isNaN(item) && Number.isNaN(this[i])) {
            res = true
        }
        else if (item == this[i]) {
            res = true
        }
    }
    return res
}

const res = arr.myInclude(item => {
    return item % 3 == 0
})

console.log(res)
