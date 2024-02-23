function myFunction() {
  document.getElementById('demo').innerHTML = Date()
}
function secondFunction() {
  document.getElementById('demo').style.fontSize = '35px'
}
function thirdFunction() {
  document.getElementById('demo').style.color = 'red'
}

const timeFunction = () => {
  const t = new Date()
  document.getElementById('demo1').innerHTML = t.getHours() + ':' + t.getMinutes() + ':' + t.getSeconds()
}
setInterval(timeFunction, 1000)

const myDisplayer = (some) => {
  document.getElementById('demo2').innerHTML = some
}

let myPromise = new Promise((myResolve, myReject) => {
  let req = new XMLHttpRequest();
  req.open('GET', 'https://api.github.com/users/chinwubajeffrey/repos')
  req.onload = () => {
    if (req.status == 200) {
      myResolve(req.response);
    } else {
      myReject('File not Found');
    }
  };
  req.send();
});
myPromise.then(
  (value) => { myDisplayer(value); },
  (error) => { myDisplayer(error); }
);
