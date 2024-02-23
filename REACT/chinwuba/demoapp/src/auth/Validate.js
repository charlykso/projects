
const Validate = (e, setErrMsg) => {
  if (
    e.target.firstName.value === '' ||
    e.target.lastName.value === '' ||
    e.target.email.value === '' ||
    e.target.phoneNo.value === '' ||
    e.target.password.value === '' ||
    e.target.confirmPass.value === ''
  ) {
    setErrMsg('All fields are required')
    return
  }
  const formData = new FormData(e.target)
  if (formData.get('password') !== formData.get('confirmPass')) {
    setErrMsg('Passwords do not match')
    return
  }
  const data = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    phoneNo: formData.get('phoneNo'),
    password: formData.get('password'),
    confirmPass: formData.get('confirmPass'),
  }
  return data
}

export default Validate