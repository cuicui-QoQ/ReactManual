

function isArrayIdx(path) {
    const left = path.lastIndexOf('[');
    const right = path.lastIndexOf(']');
    if (left >= right) {
        // 说明序号有问题
    } else {
        const idx = path.substring(left + 1, right);
        if (/^[0-9]$/.test(idx)) {
            return {
                ans: true,
                key: path.substring(0, left),
                idx: idx
            };
        }
    }
    return {
        ans: false,
        key: path,
        idx: null
    };
}


function getKey(obj, path) {
    const pathArr = path.split('.');
    let targetObj = obj
    for (let i = 0; i < pathArr.length; i++) {
        const it = pathArr[i];
        const {key, ans, idx} = isArrayIdx(it);
        if (ans) {
            if (targetObj[key] && targetObj[key][idx]) {
                targetObj = targetObj[key][idx]
            }
        } else if (targetObj[key]) {
            targetObj = targetObj[key]
        }
    }
    return targetObj;
}

const obj = {
    a: {
        b: 123
    },
    arr: [
        {
            demo: 'demo'
        },
        {
            demo: 'demo2'
        }
    ]
}

const testPath1 = 'a.b'
const testPath2 = 'arr[1].demo'

console.log(getKey(obj, testPath1));
console.log(getKey(obj, testPath2));

// isArrayIdx()
