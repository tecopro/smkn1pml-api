const express = require('express')
const router = express.Router()

const { retrieve, add, edit, remove, all } = require('./../controller/wish')

router.get('/', retrieve)
router.post('/', add)
router.put('/:id', edit)
router.delete('/:id', remove)

router.get('/all', all)

module.exports = router