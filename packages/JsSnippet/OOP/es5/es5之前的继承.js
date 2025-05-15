function Person(name) {
    this.name = name
}

Person.prototype.say = function(word) {
    console.log(this.name + ' say: ' + word)
}

function Student(name, age) {
    // 这里设置父类的属性
    Person.call(this, name);
    this.age = age
}

Student.prototype = new Person()
Student.prototype.getAge = function() {
    console.log('name: ' + this.name + ' age: ' + this.age)
}

const student = new Student('jack', 12);
student.getAge();
