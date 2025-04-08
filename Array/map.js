const arr = [1, 2, 6, 4, 5, 6]
Array.prototype.myMap = function (callback) {
    if (typeof callback !== 'function') {
        throw new TypeError('callback must be a function')
    } else {
        const res = []
        for (let i = 0; i < this.length; i++) {
            res.push(callback(this[i], i, this))
        }
        return res
    }
}

const mapArr = arr.myMap((item, idx, arr) => {
    return item * 2
})

console.log(mapArr)
