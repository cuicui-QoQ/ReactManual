const process = (cnt, total = 0) => {
    if (cnt == 0) {
        return total
    } else {
        return process(cnt - 1, cnt + total)
    }
}


// console.log(process(3))


const fibonacci = (n, a = 0, b = 1) => {
    if (n == 0) {
        return a
    } else {
        return fibonacci(n-1, b, b + a)
    }
}

// 1 1 2 3 5
console.log(fibonacci(0))
