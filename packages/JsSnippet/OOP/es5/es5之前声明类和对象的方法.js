
/**
 * 方法1： Object创建对象
 */
var obj1 = new Object()
obj1.name = 'Jack'
obj1.say = function(word) {
    console.log(this.name + ' say: ' + word)
}
obj1.say('method 1');

/**
 * 方法1： Object创建对象
 */
var obj2 = {
    name: 'Jack',
    say: function(word) {
        console.log(this.name + ' say: ' + word)
    }
}
obj2.say('method 2');


/**
 * 方法3： 工厂模式
 * 问题是 没有具体的对象类型，都是Object的实例
 */
function createPerson(name) {
    const obj = {
        name: name,
        say: function(word) {
            console.log(this.name + ' say: ' + word)
        }
    }
    return obj
}

const obj3 = createPerson('Jack');
obj3.say('method 3')

/**
 * 方法4：自定义构造函数
 * 问题是 很多可以共享的数据都各自创建了一份
 */
function Person1(name) {
    this.name = name
    this.say = function(word) {
        console.log(this.name + ' say: ' + word)
    }
}

const obj4 = new Person1('Jack')
obj4.say('method 4');


/**
 * 方法5: 构造函数 + 原型的组合模式
 */
function Person(name) {
    this.name = name
}

Person.prototype.say = function(word) {
    console.log(this.name + ' say: ' + word)
}

const p1 = new Person('Jack');

p1.say('method 5')
