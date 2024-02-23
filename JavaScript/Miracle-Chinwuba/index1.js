import Car from './class.js'
import Rectangle from './rectangle.js';
import Admin from './admin.js';
import Student from './students.js';

let myCar1 = new Car("Ford", 2014);
let myCar2 = new Car("Audi", 2019);
console.log(myCar1.name);
console.log(myCar1.age());

let myRectangle = new Rectangle(5, 5);
console.log(myRectangle.area());

console.log("----------------------------------");
let admin1 = new Admin("Ikenna", "Remigius", "ikenna@gmail.com", "123456");
let stu1 = new Student("Faith", "Okafor", "faith@gmail.com", "12345", "2022-BSc-EB")
console.log(admin1.getAdmin());
// console.log(admin1.);
console.log(stu1.getStudent());
console.log(stu1.checkPassword(stu1.getStudentPassword()))
stu1.setFirstname = 'Chidimma';
console.log(stu1.getFirstname);
console.log(stu1.getStudent());