const arr = [1, 2, [3, 4, [5, 6]]]

Array.prototype.myGetLevel = function () {
    let max = 1;
    for (let i = 0; i < this.length; i++) {
        const it = this[i];
        if (Array.isArray(it)) {
            const depth = it.myGetLevel() + 1;
            max = depth > max ? depth : max
        }
    }
    return max;
}
console.log(arr.myGetLevel())
