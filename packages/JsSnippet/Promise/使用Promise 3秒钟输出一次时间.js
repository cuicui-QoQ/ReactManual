const task = () => {
    return new Promise((res) => {
        setTimeout(() => {
            const time = new Date().toLocaleTimeString();
            console.log('time:', time)
            res(task())
        }, 3000)
    })
}
const time = new Date().toLocaleTimeString();
console.log('time:', time)

task()
