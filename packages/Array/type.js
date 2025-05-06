
function getType(value) {
    // 先处理 undefined
    if (value === undefined) {
      return 'undefined';
    }

    // 处理 null
    if (value === null) {
      return 'null';
    }

    // 处理基本类型
    const type = typeof value;
    if (type !== 'object' && type !== 'function') {
      return type; // 'number', 'boolean', 'string', 'symbol', 'bigint'
    }

    // 使用 Object.prototype.toString 获取更精确的类型
    const toString = Object.prototype.toString.call(value);

    switch (toString) {
      case '[object Object]':
        return 'object';
      case '[object Array]':
        return 'array';
      case '[object Function]':
        return 'function';
      case '[object RegExp]':
        return 'regexp';
      case '[object Date]':
        return 'date';
      case '[object Map]':
        return 'map';
      case '[object Set]':
        return 'set';
      case '[object WeakMap]':
        return 'weakmap';
      case '[object WeakSet]':
        return 'weakset';
      case '[object Error]':
        return 'error';
      case '[object Promise]':
        return 'promise';
      // 可以继续添加更多类型...
      default:
        return 'object'; // 其他未处理的 object 类型
    }
  }


function isFunc(value) {
    return typeof value === 'function' ||
    Object.prototype.toString.call(value) === '[object Function]';
}

function isArray(value) {
    return Array.isArray(value);
}

// NaN是number，同时需要额外的判断
// 两个对象同时都是NaN，但是他们不一定相等
// console.log(NaN === NaN); // false（NaN 是唯一不等于自身的值）
function isNaN(value) {
    return Number.isNaN(value);
}


