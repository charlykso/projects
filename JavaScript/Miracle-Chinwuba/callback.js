const myNumbers = [1, 2, 3, 4, 5, -6, -7, -8, -9, 10];
const removeNeg = (arr, callback) => {
  const newArr = [];
  for(const x of arr) {
    if(callback(x)) {
      newArr.push(x);
    }
  }
  return newArr;
}
const callback = (n) => n >= 0;
const posNumbers = removeNeg(myNumbers, callback)

const getAnswer = () => {
  console.log(posNumbers);
}

export default getAnswer;