// let age = Number(prompt("Enter your age: "));
// if (age < 18) {
//     alert("You are too young to drive.");
// } else if (age === 18) {
//     alert("Congratulations on your first year of driving. Enjoy the ride!");
// } else {
//     alert("Powering on. Enjoy the ride!");
// }

// switch (age) {
//     case 16:
//         alert("You are not allowed to drive.");
//         break;
//     case 18:
//         alert("Congratulations on your first year of driving. Enjoy the ride!");
//         break;
//     default:
//         alert("Powering on. Enjoy the ride!");
// }

let num1 = 60;
let num2 = 300;
let num3 = 40;

let biggestNum = num1;
if (num2 > biggestNum) {
    biggestNum = num2;
}else if (num3 > biggestNum) {
    biggestNum = num3;
}
console.log(biggestNum);