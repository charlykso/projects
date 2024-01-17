import * as yup from 'yup'

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
const phoneRules = /^\d+$/
const userPhonRule = /^[+]\d+$/
const FILE_SIZE = 2000000
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png']
// const FILE_SUPPORTED_FORMATS = ['application/pdf']

export const mySchema = yup.object().shape({
  Firstname: yup
    .string()
    .min(2, 'Firstname must be atleast 2 characters long')
    .max(20, 'Firstname must be atmost 20 characters long')
    .required('Required'),
  Lastname: yup
    .string()
    .min(2, 'Lastname must be atleast 2 characters long')
    .max(20, 'Lastname must be atmost 20 characters long')
    .required('Required'),
  Email: yup.string().email('Please enter a valid email').required('Required'),
  Date_of_birth: yup.date().required('Required'),
  Phone_No: yup
    .string()
    .min(9, 'Phone number must be atleast 9 numbers')
    .required('Required')
    .max(15, 'Phone number must not be more than 15')
    .matches(phoneRules, { message: 'Please enter a valid phone number' }),
  Password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: 'Please create a strong password' })
    .required('Required'),
  ConfirmPassword: yup
    .string()
    .oneOf([yup.ref('Password'), null], 'Passwords must match')
    .required('Required'),
  Gender: yup
    .string()
    .oneOf(['Male', 'Female'], 'Please select a valid option')
    .required('Required'),
  AuthorPic: yup
    .mixed()
    .nullable()
    .required('Required')
    .test(
      'filesize',
      'File size should be less than 2MB',
      (value, context) => !value || (value && value.size <= FILE_SIZE)
    )

    .test(
      'type',
      'Uploaded file has unsupported format.',
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
    )
})

export const UpdateAuthorSchema = yup.object().shape({
  Firstname: yup
    .string()
    .min(2, 'Firstname must be atleast 2 characters long')
    .max(20, 'Firstname must be atmost 20 characters long')
    .required('Required'),
  Lastname: yup
    .string()
    .min(2, 'Lastname must be atleast 2 characters long')
    .max(20, 'Lastname must be atmost 20 characters long')
    .required('Required'),
  Email: yup.string().email('Please enter a valid email').required('Required'),
  Date_of_birth: yup.date().required('Required'),
  Phone_No: yup
    .string()
    .min(9, 'Phone number must be atleast 9 numbers')
    .required('Required')
    .max(15, 'Phone number must not be more than 15'),
  Gender: yup
    .string()
    .oneOf(['Male', 'Female'], 'Please select a valid option')
    .required('Required'),
  AuthorPic: yup
    .mixed()
    .nullable()
    .required('Required')
    .test(
      'filesize',
      'File size should be less than 2MB',
      (value, context) => !value || (value && value.size <= FILE_SIZE)
    )
    .test(
      'type',
      'Uploaded file has unsupported format.',
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
    )
   
})

export const CreateUserSchema = yup.object().shape({
  Firstname: yup
    .string()
    .min(2, 'Firstname must be atleast 2 characters long')
    .max(20, 'Firstname must be atmost 20 characters long')
    .required('Required'),
  Lastname: yup
    .string()
    .min(2, 'Lastname must be atleast 2 characters long')
    .max(20, 'Lastname must be atmost 20 characters long')
    .required('Required'),
  Email: yup.string().email('Please enter a valid email').required('Required'),
  Role: yup
    .string()
    .oneOf(['User', 'Admin'], 'Please select a valid option')
    .required('Required'),
  Phone_No: yup
    .string()
    .min(9, 'Phone number must be atleast 9 numbers')
    .required('Required')
    .max(15, 'Phone number must not be more than 15')
    .matches(phoneRules, { message: 'Please enter a valid phone number' }),
  Password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: 'Please create a strong password' })
    .required('Required'),
  ConfirmPassword: yup
    .string()
    .oneOf([yup.ref('Password'), null], 'Passwords must match')
    .required('Required'),
})

export const UserSchema = yup.object().shape({
  Firstname: yup
    .string()
    .min(2, 'Firstname must be atleast 2 characters long')
    .max(20, 'Firstname must be atmost 20 characters long'),
  Lastname: yup
    .string()
    .min(2, 'Lastname must be atleast 2 characters long')
    .max(20, 'Lastname must be atmost 20 characters long'),
  Email: yup.string().email('Please enter a valid email').required('Required'),
  Phone_No: yup
    .string()
    .min(9, 'Phone number must be atleast 9 numbers')
    .max(15, 'Phone number must not be more than 15')
    .matches(userPhonRule, { message: 'Please enter a valid phone number' }),
  Password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: 'Please create a strong password' }),
  ConfirmPassword: yup
    .string()
    .oneOf([yup.ref('Password'), null], 'Passwords must match'),
  Role: yup
    .string()
    .oneOf(['User', 'Admin'], 'Please select a valid option')
    .required('Required'),
})

export const createBookSchema = yup.object().shape({
  Title: yup
    .string()
    .min(2, 'Title must be atleast 2 characters long')
    .max(50, 'Title must be atmost 50 characters long')
    .required('Required'),
  Sub_Title: yup
    .string()
    .min(2, 'Sub_Title must be atleast 2 characters long')
    .max(50, 'Sub_Title must be atmost 50 characters long')
    .required('Required'),
  Publisher: yup
    .string()
    .min(2, 'Publisher must be atleast 2 characters long')
    .max(40, 'Publisher must be atmost 40 characters long')
    .required('Required'),
  YearOf_Publication: yup.date().required('Required'),
  ISBN_Number: yup
    .string()
    .min(9, 'ISBN_Number must be atleast 9 numbers')
    .required('Required')
    .max(20, 'ISBN must not be more than 20'),
  Price: yup.number().required('Required'),
  AuthorId: yup.number().required('Required'),
  // Front_Cover_Img: yup
  //   .mixed()
  //   .required('Required')
  //   .test(
  //     'filesize',
  //     'File size should be less than 2MB',
  //     (value, context) => !value || (value && value.size <= FILE_SIZE)
  //   )
  //   .test(
  //     'type',
  //     'Uploaded file has unsupported format.',
  //     (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
  //   )
  //   .test(
  //     'imageDimensions',
  //     'Image dimensions should be 254x400',
  //     function checkAspectRatio(value) {
  //       const blob = new Blob([value])
  //       return new Promise((resolve) => {
  //         const reader = new FileReader()
  //         reader.readAsDataURL(blob)
  //         reader.onload = function (blob) {
  //           const img = new Image()
  //           img.src = blob.target.result
  //           img.onload = function () {
  //             const aspectRatio = this.width === 254 && this.height === 400
  //             resolve(aspectRatio)
  //           }
  //         }
  //       })
  //     }
  //   ),
  // Back_Cover_Img: yup
  //   .mixed()
  //   .nullable()
  //   .required('Required')
  //   .test(
  //     'filesize',
  //     'File size should be less than 2MB',
  //     (value, context) => !value || (value && value.size <= FILE_SIZE)
  //   )
  //   .test(
  //     'type',
  //     'Uploaded file has unsupported format.',
  //     (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
  //   )
  //   .test(
  //     'imageDimensions',
  //     'Image dimensions should be 254x400',
  //     function checkAspectRatio(value) {
  //       const blob = new Blob([value])
  //       return new Promise((resolve) => {
  //         const reader = new FileReader()
  //         reader.readAsDataURL(blob)
  //         reader.onload = function (blob) {
  //           const img = new Image()
  //           img.src = blob.target.result
  //           img.onload = function () {
  //             const aspectRatio = this.width === 254 && this.height === 400
  //             resolve(aspectRatio)
  //           }
  //         }
  //       })
  //     }
  //   ),
  // Small_front_cover_img: yup
  //   .mixed()
  //   .nullable()
  //   .required('Required')
  //   .test(
  //     'filesize',
  //     'File size should be less than 2MB',
  //     (value, context) => !value || (value && value.size <= FILE_SIZE)
  //   )
  //   .test(
  //     'type',
  //     'Uploaded file has unsupported format.',
  //     (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
  //   )
  //   .test(
  //     'imageDimensions',
  //     'Image dimensions should be at least 126x200',
  //     function checkAspectRatio(value) {
  //       const blob = new Blob([value])
  //       return new Promise((resolve) => {
  //         const reader = new FileReader()
  //         reader.readAsDataURL(blob)
  //         reader.onload = function (blob) {
  //           const img = new Image()
  //           img.src = blob.target.result
  //           img.onload = function () {
  //             const aspectRatio = this.width === 126 && this.height === 200
  //             resolve(aspectRatio)
  //           }
  //         }
  //       })
  //     }
  //   ),
})

export const UpdateBookSchema = yup.object().shape({
  Title: yup
    .string()
    .min(2, 'Title must be atleast 2 characters long')
    .max(50, 'Title must be atmost 50 characters long')
    .required('Required'),
  Sub_Title: yup
    .string()
    .min(2, 'Sub_Title must be atleast 2 characters long')
    .max(30, 'Sub_Title must be atmost 30 characters long')
    .required('Required'),
  Publisher: yup
    .string()
    .min(2, 'Publisher must be atleast 2 characters long')
    .max(40, 'Publisher must be atmost 40 characters long')
    .required('Required'),
  YearOf_Publication: yup.date().required('Required'),
  ISBN_Number: yup
    .string()
    .min(9, 'ISBN_Number must be atleast 9 numbers')
    .required('Required')
    .max(20, 'ISBN must not be more than 20'),
  Price: yup.number().required('Required'),
  AuthorId: yup.number().required('Required'),
  // Front_Cover_Img: yup
  //   .mixed()
  //   .required('Required')
  //   .test(
  //     'filesize',
  //     'File size should be less than 2MB',
  //     (value, context) => !value || (value && value.size <= FILE_SIZE)
  //   )
  //   .test(
  //     'type',
  //     'Uploaded file has unsupported format.',
  //     (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
  //   )
  //   .test(
  //     'imageDimensions',
  //     'Image dimensions should be at least 254x400',
  //     function checkAspectRatio(value) {
  //       const blob = new Blob([value])
  //       return new Promise((resolve) => {
  //         const reader = new FileReader()
  //         reader.readAsDataURL(blob)
  //         reader.onload = function (blob) {
  //           const img = new Image()
  //           img.src = blob.target.result
  //           img.onload = function () {
  //             const aspectRatio = this.width === 254 && this.height === 400
  //             resolve(aspectRatio)
  //           }
  //         }
  //       })
  //     }
  //   ),
  // Back_Cover_Img: yup
  //   .mixed()
  //   .required('Required')
  //   .test(
  //     'filesize',
  //     'File size should be less than 2MB',
  //     (value, context) => !value || (value && value.size <= FILE_SIZE)
  //   )
  //   .test(
  //     'type',
  //     'Uploaded file has unsupported format.',
  //     (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
  //   )
  //   .test(
  //     'imageDimensions',
  //     'Image dimensions should be at least 254x400',
  //     function checkAspectRatio(value) {
  //       const blob = new Blob([value])
  //       return new Promise((resolve) => {
  //         const reader = new FileReader()
  //         reader.readAsDataURL(blob)
  //         reader.onload = function (blob) {
  //           const img = new Image()
  //           img.src = blob.target.result
  //           img.onload = function () {
  //             const aspectRatio = this.width === 254 && this.height === 400
  //             resolve(aspectRatio)
  //           }
  //         }
  //       })
  //     }
  //   ),
  // Small_front_cover_img: yup
  //   .mixed()
  //   .required('Required')
  //   .test(
  //     'filesize',
  //     'File size should be less than 2MB',
  //     (value, context) => !value || (value && value.size <= FILE_SIZE)
  //   )
  //   .test(
  //     'type',
  //     'Uploaded file has unsupported format.',
  //     (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
  //   )
  //   .test(
  //     'imageDimensions',
  //     'Image dimensions should be at least 126x200',
  //     function checkAspectRatio(value) {
  //       const blob = new Blob([value])
  //       return new Promise((resolve) => {
  //         const reader = new FileReader()
  //         reader.readAsDataURL(blob)
  //         reader.onload = function (blob) {
  //           const img = new Image()
  //           img.src = blob.target.result
  //           img.onload = function () {
  //             const aspectRatio = this.width === 126 && this.height === 200
  //             resolve(aspectRatio)
  //           }
  //         }
  //       })
  //     }
  //   ),
})
