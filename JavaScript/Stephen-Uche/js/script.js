let demo = document.getElementById('demo');
let text = "This is our testing string for the class";
let index = text.indexOf("come");
let srch = text.search("our")
let mtch = text.matchAll(/est/g)
let inc = text.includes("class")
let strtwith = text.startsWith("This")

demo.innerHTML = strtwith;

let myname = "Stephen"
let occupation = "Doctor"
let id = "1234"
let code = "AJKH64K"
let myInfo = `My name is ${myname}  and I'm a ${occupation}`
let verifyEmailMsg = `
Hi
Good morning , Mr/Mrs ${myname}.
Your new Id is ${id}.
Your verification code is ${code}.
Thanks and remain bless.
`
document.getElementById('info-txt').innerHTML = verifyEmailMsg

let x = 0xFF
let y = 20
let z = "30";
let i = new Number(50)
let j = new Number(50)
let l = i === j
document.getElementById("result").innerHTML = l
