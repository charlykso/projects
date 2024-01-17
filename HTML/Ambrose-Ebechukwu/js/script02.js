const day = new Date().getDay();
console.log(day);
const x = 1
let lamp = ""
switch (x) {
  case 0:
    lamp = "Off"
    break
  case 1:
    lamp = "On"
    break
  default:
    lamp = "No value found"
    break
}
console.log(`The lamp is: ${lamp}`);

// let text = "Hello World";
// for(let i = 0; i < text.length; i++){
//     console.log(text[i]);
// }

let num = 20;
for (let i = 1; i <= num; i++) {
    if (i % 2 === 0) {
        console.log(i);
    }
}