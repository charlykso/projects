// Code to validate password
const Validate = (password) => {
    const validatePassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
    return validatePassword.test(password)
}

export default Validate