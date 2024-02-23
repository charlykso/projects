const demo = document.getElementById('demo')
demo.innerHTML = 'Hello World'

demo.style.backgroundColor = 'lightblue'
demo.style.fontSize = '30px'
demo.style.color = 'white'
demo.style.padding = '10px'

const myTwit = document.getElementById('myTwit')
myTwit.href = 'https://twitter.com/ikennaRemigius'

const mydiv = document.createElement('div')
console.log(mydiv);
const para = document.createElement('p')
para.innerHTML = 'This is a paragraph'
mydiv.innerHTML = 'This is a new div'
mydiv.classList.add('newDiv')
mydiv.appendChild(para)
const seconddiv = document.createElement('div')
seconddiv.innerHTML = 'This is a second div'
mydiv.appendChild(seconddiv)
const myNav = document.getElementById('nav')
console.log(myNav)
myNav.appendChild(mydiv)
