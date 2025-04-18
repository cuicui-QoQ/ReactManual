const arr = [1, 2, [3, 4, [5, 6]]]

Array.prototype.flat = function (deep = 1) {
    let res = []
    deep--
    for (let i = 0; i < this.length; i++) {
        if (Array.isArray(this[i]) && deep > 0) {
            res = res.concat(this[i].flat(deep))
        } else {
            res.push(this[i])
        }
    }
    return res
}

console.log(arr.flat(3))
