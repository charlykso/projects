import User from './users.js'

class Admin extends User{
    constructor(firstname, lastname, email, password, role="Admin") {
        super(firstname, lastname, email, password)
        this.role = role
    }
    getAdmin() {
        return {
            id: this.id,
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            role: this.role
        }
    }
}

export default Admin;