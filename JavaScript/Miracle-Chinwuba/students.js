import User from "./users.js";
import getData from "./getData.js";

class Student extends User {
  constructor(firstname, lastname, email, password, regNo, role = "Student") {
    super(firstname, lastname, email, password);
    this.role = role;
    this.regNo = regNo;
  }
  getStudent() {
    return {
      id: this.id,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      role: this.role,
        regNo: this.regNo,
    };
  }

  getStudentPassword() {
    return this.password
  }

  getPosts() {
    const posts = getData("./data/posts.json");
    let studentPosts = []
    for (let post in posts)
    {
      if(post.author === this.id)
      {
        studentPosts.push(post)
      }
    }
    return studentPosts
  }
}

export default Student;