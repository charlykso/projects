function add(a, b) {
  return a + b
}
function sub(a, b) {
  return a - b
}
function mul(a, b) {
  return a * b
}
function div(a, b) {
  return a / b
}
function mod(a, b) {
  return a % b
}

const myfunc = function calc(a, b, op) {
  switch (op) {
    case '+':
      return add(a, b)
    case '-':
      return sub(a, b)
    case '*':
      return mul(a, b)
    case '/':
      return div(a, b)
    case '%':
      return mod(a, b)
    default:
      return NaN
  }
}

export default myfunc