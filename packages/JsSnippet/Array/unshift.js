const arr = [1, 2, 3, 4, 5, 6]

Array.prototype.myUnshift = function (...args) {
    const moveLen = args.length;
    const len = this.length;
    for (let i = len - 1; i >= 0; i--) {
        this[moveLen + i] = this[i];
    }
    for (let i = 0; i < moveLen; i++) {
        this[i] = args[i]
    }
    return this;
}
// 注意 unshift 不需要模拟一项一项加入的情况
// 0 + 1 + 2 + 3 + 4
arr.myUnshift({a: 123}, null)

console.log(arr)
