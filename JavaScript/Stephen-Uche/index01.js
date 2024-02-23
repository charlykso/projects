import Student from "./jsObject.js";

const student1 = new Student('Stephen', 25)
student1.address.city = 'Lagos'
student1.address.contact.email = 'stephen@gmail.com'
student1.address.contact.phone = '08012345678'
console.log(JSON.stringify(student1, null, 2))

const getName = (name) => {
    return name
}

// getName(name)
// getName()
// getName(firstName, lastName)