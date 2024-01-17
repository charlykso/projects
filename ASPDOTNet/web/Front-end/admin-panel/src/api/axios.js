import axios from 'axios'

export default axios.create({
  baseURL: 'http://easyreadlib.com/api/api',
  // baseURL: 'https://localhost:7144/api',
})
