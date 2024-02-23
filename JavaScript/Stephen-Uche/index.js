
class Human {
  constructor(fname, gender, occupation) {
    this.fname = fname
    this.gender = gender
    this.occupation = occupation
  }
  getDetails() {
    return `My name is ${this.fname}`
  }
  static greet() {
    return "Hello!"
  }
}

class Person extends Human{
  constructor(fname, gender, occupation, yearOfBirth) {
    super(fname, gender, occupation)
    this.yearOfBirth = yearOfBirth
  }

  age() {
    const date = new Date()
    const year = date.getFullYear()
    const age = year - this.yearOfBirth
    console.log(`I am ${age} years old`)
  }
}

const Stephen = new Person("Stephen", "Male", "Engineer", 1995)
console.log(Stephen.getDetails()) // Hello!
Stephen.age()
const Faith = new Person("Faith", "Female", "Doctor", 1990)
console.log(Faith.getDetails()) // Hello!
Faith.age()
console.log(Person.greet());

