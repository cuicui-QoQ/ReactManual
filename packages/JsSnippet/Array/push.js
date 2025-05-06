const arr = [1, 2, 3, 4, 5, 6]

Array.prototype.myPush = function (...args) {
    const len = this.length;
    for (let i = 0; i < args.length; i++) {
        this[len + i] = args[i]
    }
    return this;
}
// 0 + 1 + 2 + 3 + 4
arr.myPush({a: 123}, null)

console.log(arr)
