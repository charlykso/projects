
let data = document.getElementById('demo').innerHTML = "Hello World";
console.log(data);
const imgs = ['OIG1.jpg', 'OIG2.jpg', 'OIG.jpg']
const uppercase = /([A-Z])/g;
const lowercase = /([a-z])/g;
const numbers = /(\d)/g;
const special = /([!@#$%^&*])/g;


setInterval(() => {
    document.getElementById('banner').style.backgroundImage = `url(images/${imgs[Math.floor(Math.random() * imgs.length)]})`;
}, 2000);

setInterval(() => {
    document.getElementById('time').innerHTML = new Date().toLocaleTimeString();
}, 1000);

const validatePassword = () => {
    const password = document.forms['signupForm']['password'].value;
    if (password.length >= 6 && uppercase.test(password) && lowercase.test(password) && numbers.test(password) && special.test(password)) {
        document.getElementById('length').style.color = 'green';
        document.getElementById('lowercase').style.color = 'green';
        document.getElementById('uppercase').style.color = 'green';
        document.getElementById('number').style.color = 'green';
        document.getElementById('special').style.color = 'green';
    }else if (uppercase.test(password)) {
        document.getElementById('uppercase').style.color = 'green';
    }else if (lowercase.test(password)) {
        document.getElementById('lowercase').style.color = 'green';
    }else if (numbers.test(password)) {
        document.getElementById('number').style.color = 'green';
    }else if (special.test(password)) {
        document.getElementById('special').style.color = 'green';
    }else if (password.length >= 6) {
        document.getElementById('length').style.color = 'green';
    }
}

const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.fname.value);
    const fname = document.forms['signupForm']['fname'].value;
    const lname = document.forms['signupForm']['lname'].value;
    if (fname === '' || lname === '') {
        alert('Please fill the first name and last name field');
        document.getElementById('fnameError').innerHTML = 'First name is required';
        document.getElementById('lnameError').innerHTML = 'Last name is required';
        return false;
    }else if (fname === '') {
        alert('Please fill the first name field');
        document.getElementById('fnameError').innerHTML = 'First name is required';
        return false;
    }
    else if (lname === '') {
        alert('Please fill the last name field');
        document.getElementById('lnameError').innerHTML = 'Last name is required';
        return false;
    }else if (fname.length < 3 || lname.length < 3) {
        alert('First name or Last name must be at least 3 characters');
        return false;
    }
    else{
        alert(`Welcome ${fname} ${lname}`);
    }
}

const calculateAge = () => {
    const dob = document.getElementById('dob').value;
    const dobDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - dobDate.getFullYear();
    document.getElementById('displayAge').innerHTML = `You are ${age} years old`
}