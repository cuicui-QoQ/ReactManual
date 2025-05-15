const promise1 = new Promise((resolve, reject) => {
    setTimeout(resolve, 500, "one");
  });

  const promise2 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, "two");
  });
const myRace = function(arr) {
    return new Promise((res, rej) => {
        for (let i = 0; i < arr.length; i++) {
            Promise.resolve(arr[i]).then(res, rej)
        }
    })
}

  Promise.race([promise1, promise2]).then((value) => {
    console.log(value);
    // Both resolve, but promise2 is faster
  });
  // Expected output: "two"

  myRace([promise1, promise2]).then((value) => {
    console.log(value);
    // Both resolve, but promise2 is faster
  });
