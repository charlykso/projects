class User {
  constructor(id, firstname, lastname, email) {
    this.id = id
    this.firstname = firstname
    this.lastname = lastname
    this.email = email
  }

  greet() {
    console.log(`Hello, my name is ${this.firstname}`)
  }
  getEmail() {
    return this.email
  }
}

export default User
