const myFunction = () => {
    console.log('Set Timeout function');
}
const newSetTimeout = () => {
    setTimeout(myFunction, 3000);
    console.log('After setTimeout function 1');
    console.log('After setTimeout function 2')
    console.log('After setTimeout function 3')
    console.log('After setTimeout function 4')
}

export default newSetTimeout;