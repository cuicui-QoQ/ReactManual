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
