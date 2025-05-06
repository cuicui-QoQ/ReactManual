const arr = [1, 2, 6, 4, 5, 6]

Array.prototype.myForEach = function (callback) {
    if (typeof callback !== 'function') {
        throw new TypeError('callback must be a function')
    } else {
        for (let i = 0; i < this.length; i++) {
            callback(this[i], i)
        }
    }
}

arr.myForEach((item, index) => {
    console.log('index', index, 'item: ', item)
})
