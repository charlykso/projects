const express = require('express')
const router = express.Router()
const { getHello } = require('../controllers/helloController')


router.get('/hello', getHello)

module.exports = router