import User from "./User.js"

class Student extends User{
    constructor(id, firstname, lastname, email, regNo) {
        super(id, firstname, lastname, email)
        this.regNo = regNo
    }
    
    getRegNo() {
        return this.regNo
    }
    getStudentInfo(){
        return {
            id: this.id,
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            regNo: this.regNo
        }
    } 
}

// module.exports = Student
export default Student
