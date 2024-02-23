let myPromise = new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open('GET', 'https://api.github.com/users/rajeevprasanna');
    req.onload = () => {
        if (req.status === 200) {
            resolve(req.response);
        } else {
            reject(Error(req.statusText));
        }
    };
    req.onerror = () => {
        reject(Error('Network Error'));
    };
    req.send();
});

export default myPromise;