import { baseURL } from '../../api/baseURL'
// author
export const addAuthorUrl = baseURL + '/author/createauthor'
export const getAllAuthorUrl = baseURL + '/author/getallauthors'
export const getAuthorUrl = baseURL + '/author/getauthor/'
export const updateAuthorUrl = baseURL + '/author/updateauthor/'
export const deleteAuthorUrl = baseURL + '/author/deleteauthor/'

// user
export const getUserUrl = baseURL + '/user/getuser/'
export const getAllUserUrl = baseURL + '/user/getallusers'
export const addUserUrl = baseURL + '/user/createuser'
export const updateUserUrl = baseURL + '/user/updateuser/'
export const deleteUserUrl = baseURL + '/user/deleteuser/'

// books
// export const getAllBooksUrl =
// 'https://localhost:7144/api/Book/GetAllBooks?sort=desc&by=Title&pageNumber=1&pageSize=5'
export const getAllBooksUrl =
  baseURL + '/Book/GetAllBooks'
export const getBookUrl = baseURL + '/Book/GetBook/'
export const getSingleBookUrl = baseURL + '/Book/GetSingleBook/'
export const addBookUrl = baseURL + '/Book/CreateBook'
export const updateBookUrl = baseURL + '/Book/UpdateBook/'
export const deleteBookUrl = baseURL + '/Book/DeleteBook/'

// payments
export const getAllPaymentUrl = baseURL + '/Payment/GetAllPayments'
export const getPaymentUrl = baseURL + '/Payment/GetPayment/'
export const makePaymentUrl = baseURL + '/Payment/MakePayment'
export const updatePaymentUrl = baseURL + '/Payment/UpdatePayment/'
export const deletePaymentUrl = baseURL + '/Payment/deletePayment/'
export const initiatePaymentUrl = baseURL + '/Payment/initiate/'
