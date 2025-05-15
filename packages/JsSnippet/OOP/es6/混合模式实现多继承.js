class Person {
    constructor(name) {
        this.name = name
    }

    say(word) {
        console.log(this.name + ' say: ' + word)
    }
}

class Student extends Person {
    constructor(name, age, sex) {
        super(name)
        this.age = age
        Object.assign(this, new Sex(sex));
    }

    getAge() {
        console.log('name: ' + this.name + ' age: ' + this.age)
    }
}

class Sex {
    constructor(sex) {
        this.sex = sex
        this.getSex = function() {
            console.log('in SexClass, sex is :', this.sex)
        }
    }
}


const s1 = new Student('John', 12, 'male')
s1.say(s1.sex)
s1.getAge()
s1.getSex()
