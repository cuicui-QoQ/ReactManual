const arr = [1, 2, 3, 4, 5, 6]

Array.prototype.myReduce = function (func, initialValue) {
    if (typeof func !== 'function') {
        throw new TypeError('callback must be a function')
    }
    let accumulator = initialValue
    for (let i = 0; i < this.length; i++) {
        if (accumulator === undefined) {
            accumulator = this[i]
        } else {
            accumulator = func(accumulator, this[i])
        }
    }
}
// 0 + 1 + 2 + 3 + 4
const initialValue = 0
const sumWithInitial = arr.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue,
)

console.log(sumWithInitial)
