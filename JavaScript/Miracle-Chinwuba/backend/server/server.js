const express = require('express')
const routes = require('../routes/index')
const cors = require('cors')


const app = express()
app.use(cors())

app.get('/api', (req, res) => {
  res.send('Api is running')
})
app.use('/api', routes)

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
