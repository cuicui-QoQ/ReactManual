const arr = [1, 2, 6, 4, 5, 6]
Array.prototype.myFill = function (item, start, end) {
    const len = this.length
    let _start = 0
    let _end = len
    if (start >= 0 && start < len) {
        _start = start
    }
    if (end >= 0 && end <= len) {
        _end = end
    }
    for (let i = _start; i < _end; i++) {
        this[i] = item
    }
    return this
}

arr.myFill(1, 3, 5)

console.log(arr)
