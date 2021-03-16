const express = require('express')
const router = express.Router()

const { retrieve, add, remove } = require('./../controller/contact')

router.get('/', retrieve)
router.post('/', add)
router.delete('/:id', remove)

module.exports = router