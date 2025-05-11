
// before函数调用num次以内，调用结果和fn相同，num之后，返回最后一次fn的执行结果
function before(num, fn) {
    let cnt = 0;
    let res = null;
    return function(...args) {
        cnt++;
        if (cnt > num) {
            return res;
        } else {
            res = fn(...args);
            return res;
        }
    }
}

const func = (a, b, c) => {
    return a + b + c
}

const memoFunc = before(3, func);

const getTestNum = () => {
    const a = Math.round(Math.random() * 10)
    const b = Math.round(Math.random() * 10)
    const c = Math.round(Math.random() * 10)
    return {
        a,
        b,
        c
    }
}

for (let i = 0; i < 10; i++) {
    const {a, b, c} = getTestNum();
    const memoRes = memoFunc(a, b, c);
    console.log({a, b, c}, 'memoRes', memoRes, 'funcRes', func(a,b,c))
}
