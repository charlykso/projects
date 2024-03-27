// const baseurl = 'https://blogapp-api-nlq0.onrender.com/api'
const baseurl = 'http://localhost:8000/api'

export const createUserUrl = baseurl + '/user/create'
export const loginUserUrl = baseurl + '/user/signin/'
export const getUsers = baseurl + '/user/all'
export const userProfileUrl = baseurl + '/user/:id/profile'
export const updateProfileUrl = baseurl + '/user/update_profile/:id'