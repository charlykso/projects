let mypromise = new Promise((resolve, reject) => {
    let x = 0;
    if (x === 0) {
        resolve('OK');
    } else {
        reject('Error');
    }
});

export default mypromise;