import { v4 as uuidv4 } from 'uuid'

class User {
  constructor(firstname, lastname, email, password) {
    this.id = uuidv4()
    this.firstname = firstname
    this.lastname = lastname
    this.email = email
    this.password = password
    this.created_at = new Date()
    this.updated_at = new Date()
  }

  getUser() {
    return {
      id: this.id,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
    }
  }

  set setFirstname(firstname) {
    this.firstname = firstname
  }

  get getFirstname() {
    return this.firstname
  }

  checkPassword(password) {
    return password === this.password
  }

    changePassword(oldPassword, newPassword) {
        if (this.checkPassword(oldPassword)) {
        this.password = newPassword
        return true
        }
        return false
    }

    login(email, password) {
        return this.email === email && this.password === password
    }
    getUserWithId(id) {
        return this.id === id
    }
}

export default User
