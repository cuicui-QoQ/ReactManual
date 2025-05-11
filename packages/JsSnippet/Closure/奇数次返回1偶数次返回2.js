const a = (() => {
    let isOdd = true;
    return function () {
        if (isOdd) {
            isOdd = false;
            return 1;
        } else {
            isOdd = true;
            return 2;
        }
    }
})()

for (let i = 1; i < 10; i++) {
    console.log(a());
}
