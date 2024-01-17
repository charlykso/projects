console.log("Hello World");

let age = 0;


if (age >= 18 && age <= 25) {
    console.log(`You are a youth`);
}else if(age >= 15 && age < 18 ){
    console.log(`You are a teenager`);
}else if(age < 15){
    console.log("You are a child");
}
else{
    console.log(`You are an adult`);
}

//0 - 34 = F, 35 - 45 = D, 46 - 55 = C, 56 - 69 = B, 70 - 100 = A
let totalScore = Number(prompt("Enter total score: "));

if (totalScore > 0 && totalScore < 35) {
    console.log(`F: Your total score is ${totalScore}`);
}else if(totalScore >= 35 && totalScore <= 45){
    console.log(`D: Your total score is ${totalScore}`)
}else if(totalScore >= 46 && totalScore <= 55){
    console.log(`C: Your total score is ${totalScore}`)
}else if(totalScore >= 56 && totalScore <= 69){
    console.log(`B: Your total score is ${totalScore}`)
}else if(totalScore >= 70 && totalScore <= 100){
    console.log(`A: Your total score is ${totalScore}`)
}else{
    console.log(`Invalid total score: ${totalScore}`)
}