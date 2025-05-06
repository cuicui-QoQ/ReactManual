const arr = [1, 2, 3, 4, 5, 6]

Array.prototype.myReduce = function (func, initialValue) {
    if (typeof func !== 'function') {
        throw new TypeError('callback must be a function')
    }
    let ans = initialValue;
    for (let i = 0; i < this.length; i++) {
        if (ans === undefined) {
            ans = this[i]
        } else {
            ans = func(ans, this[i])
        }
    }
    return ans;
}
// 0 + 1 + 2 + 3 + 4
const initialValue = 0
const sumWithInitial = arr.myReduce(
    (accumulator, currentValue) => accumulator + currentValue,
)

console.log(sumWithInitial)
