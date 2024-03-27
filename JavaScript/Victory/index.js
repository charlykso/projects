import Student from "./Student.js";
import Lecturer from "./Lecturer.js";

const student1 = new Student(1, "John", "Doe", "john@gmail.com", "lis/001");
console.log(student1.getStudentInfo());

const lecturer1 = new Lecturer(2, "Jane", "Doe", "jame@gmail.com", "Computer Science");
console.log(lecturer1.getLecturerInfo());
