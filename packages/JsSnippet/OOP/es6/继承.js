class Person {
    constructor(name) {
        this.name = name
    }

    say(word) {
        console.log(this.name + ' say: ' + word)
    }
}

const p1 = new Person('Jack')
p1.say('hello');

class Student extends Person {
    constructor(name, age) {
        super(name)
        this.age = age
    }

    getAge() {
        console.log('name: ' + this.name + ' age: ' + this.age)
    }
}

const s1 = new Student('John', 12)
s1.say('hello')
s1.getAge()
