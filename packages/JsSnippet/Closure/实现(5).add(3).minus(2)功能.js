// 实现(5).add(3).minus(2)功能
// 这个实际上是往 Number的原型对象上挂函数

Number.prototype.add = function(a) {
    return this + a
}

Number.prototype.minus = function(a) {
    return this - a
}

console.log((5).add(12).minus(1))
