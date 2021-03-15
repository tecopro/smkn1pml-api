const express = require('express')
const router = express.Router()

const { home, school, error } = require('./../controller')
const wish = require('./wish')

router.all('/', home)
router.get('/school', school)

router.use('/wish', wish)

router.all('*', error)

module.exports = router