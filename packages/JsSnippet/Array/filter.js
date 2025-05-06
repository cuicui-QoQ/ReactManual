const arr = [1, 2, 6, 4, 5, 6]
Array.prototype.myFilter = function (callback) {
    const res = []
    if (typeof callback !== 'function') {
        return []
    }
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            res.push(this[i])
        }
    }
    return res
}

const filterArr = arr.myFilter((item, idx, arr) => {
    return item % 2
})

console.log(filterArr)
