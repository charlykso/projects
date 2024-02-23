const cors = require('cors')

const corsOptions = {
  origin: '*', // Change this to your actual domain in production
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add the HTTP methods you want to allow
  allowedHeaders: ['Content-Type', 'Authorization'], // Add the headers you want to allow
}

module.exports = cors(corsOptions)
