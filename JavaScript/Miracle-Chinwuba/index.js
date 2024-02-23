// import myfunc from './example.js'
// import newFunction from './arrowFunc.js';
// import getAnswer from './callback.js';
// import newSetTimeout from './assynchroneous.js'
// import mypromise from './promise.js';
// import myPromise from './newPromise.js';
import todo from './asyncfunction.js';

// console.log(myfunc(2, 2, '+'));
// console.log(newFunction('John', 'Doe'));
// getAnswer()
// newSetTimeout()

// mypromise
const myDisplayer = (some) => {
  console.log(some)
}
// mypromise.then(
//   (value) => {
//     myDisplayer(value)
//   },
//   (error) => {
//     myDisplayer(error)
//   }
// )

// myPromise.then(
//     (value) => {
//         myDisplayer(value)
//     },
//     (error) => {
//         myDisplayer(error)
//     }
// )

const res = await todo().then((value) => {
    return value;
    }).then((error) => {
        return error;
    }).catch((error) => {
        return error;
    })
;
console.log(res);
