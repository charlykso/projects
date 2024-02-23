
class Student {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.address = {
        city: "",
        country: "",
        state: "",
        street: "",
        contact: {
            email: "",
            phone: ""
        }
    }
  }

    getStudentName() {
        return this.name;
    }
}

export default Student;