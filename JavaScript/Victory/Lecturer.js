import User from "./User.js";

class Lecturer extends User {
    constructor(id, firstname, lastname, email, subject) {
        super(id, firstname, lastname, email)
        this.subject = subject
    }
    
    getSubject() {
        return this.subject
    }
    getLecturerInfo(){
        return {
            id: this.id,
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            subject: this.subject
        }
    }
}

export default Lecturer